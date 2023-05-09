const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fetch = require('node-fetch');
const { Octokit } = require('@octokit/rest');


// exports.createUserSwipeDoc = functions.auth.user().onCreate(async (user) => { // NEED TO IMPLEMENT ON EACH SWIPE!!!
//   const swipeRef = admin.firestore().collection('swipes').doc();
//   await swipeRef.set({ direction: "", swipee: "", swiper: "", timerstamp: ""});
// });


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

function iterateQuery(querySnapshot, swipedIds){
  const profiles = []
  querySnapshot.forEach((doc) => {
    const profile = doc.data();
    profile.id = doc.id;
    if (!swipedIds || !swipedIds.includes(profile.id)) {
      console.log('pushing profile:', profile);
      profiles.push(profile);
  }});
  return { profiles };
}

exports.getUnswipedProfiles = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to call this function');
  }

  const useremail = await getEmailFromUid(data.uid);
  const profileRef = firestore.collection("profiles");
  const swipeRef = firestore.collection("swipes");
  
// Retrieve the swiped IDs of the user
try {
  // Retrieve the swiped IDs of the user
  const swipedSnapshot = await swipeRef.where("swiper", "==", useremail).get();
  const swipedIds = swipedSnapshot.docs.map((doc) => doc.data().swipee);

  // Query the profiles collection for all profiles not in the swiped IDs array
  const querySnapshot = await profileRef.where(admin.firestore.FieldPath.documentId(), "not-in", swipedIds || []).get();

  return iterateQuery(querySnapshot, swipedIds);
  // process the query results
} catch (error) {
  console.error("Error getting swipe data:", error);

  // handle the error here, for example:
  if (error.code === "not-found") {
    // handle "document not found" error
    console.log("have not made any swipes yet error");

    return iterateQuery(profileRef, null);
  } else {
    // handle other errors
    console.log("UNRESOLVED ERROR HAPPENING! AHHHHH!");
  }
}
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