const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fetch = require('node-fetch');
const { Octokit } = require('@octokit/rest');

const admin = require("firebase-admin");

admin.initializeApp(); //may be redundant because of config

const firestore = admin.firestore();

exports.getUnswipedProfiles = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  const profileRef = firestore.collection("profiles");
  const swipeRef = firestore.collection("swipes").doc(uid);

  const swipeDoc = await swipeRef.get();
  const swipedIds = swipeDoc.exists ? swipeDoc.data().swipedOn : [];

  const querySnapshot = await profileRef.get();
  const profiles = [];
  querySnapshot.forEach((doc) => {
    const profile = doc.data();
    profile.id = doc.id;
    if (!swipedIds.includes(profile.id)) {
      profiles.push(profile);
    }
  });

  return { profiles };
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