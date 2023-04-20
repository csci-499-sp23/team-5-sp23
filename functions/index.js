const functions = require("firebase-functions");
// const cors = require('cors')({ origin: true });

// exports.firebaseGoogleAPI = functions.https.onRequest((req, res) => {
//   cors(req, res, () => {
//     res.set('Access-Control-Allow-Origin', '*');

//     const latitude = req.query.location.split(",")[0];
//     const longitude = req.query.location.split(",")[1];
//     const type = req.query.type;
//     const API_KEY = req.query.key;

//     fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${type}&key=${API_KEY}`)
//       .then((response) => response.json())
//       .then((data) => res.send(data.results))
//       .catch((error) => console.error(error));
//   });
// });
