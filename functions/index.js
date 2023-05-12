const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fetch = require('node-fetch');
const { Octokit } = require('@octokit/rest');

const admin = require("firebase-admin");

const serviceAccount = require("./csci499-firebase-adminsdk-x8g37-28651561e5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://csci499-default-rtdb.firebaseio.com"
});

const firestore = admin.firestore();
const { FieldPath } = firestore;
firestore.settings({
  ignoreUndefinedProperties: true
});

async function getEmailFromUid(uid) {
  const userRecord = await admin.auth().getUser(uid);
  const email = userRecord.email;
  return email;
}

async function getProfiles(querySnapshot, batchSize, lastVisible) {
  const profiles = [];
  let newLastVisible;

  querySnapshot.forEach((doc) => {
    const profile = doc.data();
    profile.id = doc.id;
    profiles.push(profile);
    newLastVisible = doc;
  });
  
  return {
    profiles: profiles.slice(0, batchSize),
    lastVisible: newLastVisible || lastVisible,
  };
}

exports.createUserSwipeDoc = functions.auth.user().onCreate(async (user) => {
  const useremail = await getEmailFromUid(user.uid);
  const swipeRef = admin.firestore().collection('swipes').doc();
  await swipeRef.set({ direction: "left", swipee: useremail, swiper: useremail, timestamp: "N/A"});
});

exports.swipeRight = functions.https.onCall(async (data) => {
  const useremail = await getEmailFromUid(data.uid);
  const userDocRef = firestore.collection("profiles").doc(useremail);
  const userDoc = await userDocRef.get();

  const swipeeemail = data.swipeeemail; 
  const swipeeDocRef = firestore.collection("profiles").doc(swipeeemail);
  const swipeeDoc = await swipeeDocRef.get();
  const swipeeMatches = swipeeDoc.data().matches || [];

  const swipeRef = firestore.collection("swipes").doc();
  const swipeData = { direction: "right", swipee: swipeeemail, swiper: useremail, timestamp: "N/A" };
  await swipeRef.set(swipeData);

  // Check if the swipee has already swiped right on the user
  const swipeeSwipes = await firestore.collection("swipes")
    .where("swiper", "==", swipeeemail)
    .where("swipee", "==", useremail)
    .where("direction", "==", "right")
    .get();
  const hasSwipedRight = !swipeeSwipes.empty;

  // Update matches only if the swipee has swiped right on the user
  if (hasSwipedRight) {
    const swipeeMatchesUpdate = {matches: [...swipeeMatches, useremail.trim()]};
    await swipeeDocRef.update(swipeeMatchesUpdate);

    const userMatchesUpdate = {matches: [...userDoc.data().matches || [], swipeeemail.trim()]};
    await userDocRef.update(userMatchesUpdate);
  }
});


exports.swipeLeft = functions.https.onCall(async (data) => {
  const useremail = await getEmailFromUid(data.uid);
  const swipeRef = firestore.collection("swipes").doc();
  return await swipeRef.set({ direction: "left", swipee: data.swipeeemail, swiper: useremail, timestamp: "N/A"}); // DO TIMESTAMP
});

exports.getUnswipedProfiles = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be authenticated to call this function"
    );
  }

  const useremail = await getEmailFromUid(data.uid);
  const profileRef = firestore.collection("profiles");
  const swipeRef = firestore.collection("swipes");
  const batchSize = 2;
  let lastVisible = data.lastVisible;

  try {
    const swipedSnapshot = await swipeRef
      .where("swiper", "==", useremail)
      .get();
    const swipedIds = swipedSnapshot.docs.map((doc) => doc.data().swipee);
    swipedIds.push(useremail);

    let query = profileRef.where(
      admin.firestore.FieldPath.documentId(),
      "not-in",
      swipedIds || []
    );

    if (lastVisible) {
      query = query.startAfter(lastVisible);
    }

    const querySnapshot = await query.limit(batchSize).get();
    const result = await getProfiles(querySnapshot, batchSize, lastVisible);
    lastVisible = result.lastVisible;
    
    const response = {
      profiles: result.profiles,
      lastVisible,
    };
    
    const returntouser = JSON.stringify(response);
    return returntouser;
  } catch (error) {
    console.error("Error getting swipe data:", error);
    
    if (error.code === "not-found") {
      
      const querySnapshot = await profileRef.limit(batchSize).get();
      const result = await getProfiles(querySnapshot, batchSize, null);
      lastVisible = result.lastVisible;

      const response = {
        profiles: result.profiles,
        lastVisible,
      };
      const returntouser = JSON.stringify(response);
      return returntouser;
    } else {
      throw new functions.https.HttpsError(
        "internal",
        "An internal error occurred."
      );
    }
  }
});

exports.getMatches = functions.https.onCall(async (data) => {
  const useremail = await getEmailFromUid(data.uid);
  const userDocRef = firestore.collection("profiles").doc(useremail);
  const userDoc = await userDocRef.get();
  return userDoc.data().matches;
});

exports.githubRepoAPI = functions.runWith({secrets: ["AUTH_KEY"]}).https.onRequest((req, res) => {
  // const authkey = functions.config().authstorage.key;
  const octokit = new Octokit({ auth: process.env.AUTH_KEY });

  cors(req, res, () => {
    res.set('Access-Control-Allow-Origin', '*');

    const org = 'csci-499-sp23';
    const repo = 'team-5-sp23';

    octokit.repos.get({ owner: org, repo: repo })
      .then((response) => res.send(response.data))
      .catch((error) => console.error(error));
  });
});

exports.firebaseGoogleAPI = functions.runWith({secrets: ["GOOGLE_API_KEY"]}).https.onRequest((req, res) => {
  cors(req, res, () => {
    res.set('Access-Control-Allow-Origin', '*');

    const latitude = req.query.location.split(",")[0];
    const longitude = req.query.location.split(",")[1];
    const type = req.query.type;
    const apiKey = process.env.GOOGLE_API_KEY;
   

    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${type}&key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => res.send(data.results))
      .catch((error) => console.error(error));
  });
});