import "./css/matchupStyles.css";
import TinderCard from "react-tinder-card";
import {useEffect, useState} from "react";
import "./css/Cards.css";
import { db } from "../firebase-config"; 
import {onSnapshot, collection, doc, getDoc, getDocs, where, query} from "firebase/firestore";
import { UserAuth } from "../context/UserAuthContext";//may have this wrong
import { functions } from "../firebase-config"; 
import { httpsCallable } from "firebase/functions";
import { storage, ref, getDownloadURL, listAll, list } from "firebase/storage"; //def need to organize pictures at this rate



function Card() {
  const [people, setPeople] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const getCurrentUserProfile = async () => {
      const docRef = doc(db, "profiles", user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data(); // print the data to the console
      } else {
        console.log("No such document!");
      }
    };
    
    console.log(getCurrentUserProfile()); // call the function directly
  }, [user.email]);

  useEffect(() => {
    // firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    const uid = user.uid;
    const data = { uid };
    // Assume `uid` is the UID of the authenticated user

    const getUnswipedProfiles = httpsCallable(functions, 'getUnswipedProfiles');
    getUnswipedProfiles(data) // pass empty object as data argument
    .then((result) => {
      const profiles = result.data.profiles;
      console.log(profiles);
      // Display the profiles to the user
    })
    .catch((error) => {
      console.error(error);
    });
  }, [user.uid]); //perhaps use a bool attached to the last card to determine
  

  useEffect(() => {
  //   const storageRef = ref(storage, `${user.email}/`);
  //   // Get the first image in the user's directory
  //   list(storageRef, { maxResults: 1 }).then((res) => {
  //     const image = res.items[0];
  //     // Get the download URL for the image
  //     return getDownloadURL(image).then((imageUrl) => {
  //       const style = { backgroundImage: `url(${imageUrl})` };
  //       return <div style={style}>First image</div>;
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //   }).catch((error) => {
  //     console.log(error);
  // });
  

      const unsubscribe = onSnapshot(collection(db, 'profiles'), snapshot => (
        setPeople(snapshot.docs.map(doc => doc.data()))
        ));
        
        return () => {
          //cleanup
          unsubscribe();
        }
      }, []);
      
    return (
      //BEM
      <div>
        <div className="tinderCards_cardContainer">
          {people.map(person => (
              <TinderCard
                className="swipe"
                key={person.name}
                preventSwipe={['up','down']}
              >
                <div
                  style={{ backgroundImage: `url(${person.url})`}}
                className="card">
                <h3>{person.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
      </div>
    );
  }

export default Card;




// // Swipe left on a potential match
// function swipeLeft(matchID) {
//   const currentUserID = firebase.auth().currentUser.uid;
//   return firebase.database().ref(`users/${matchID}/swipedOn`).update({
//     [currentUserID]: false
//   });
// }

// // Swipe right on a potential match
// function swipeRight(matchID) {
//   const currentUserID = firebase.auth().currentUser.uid;
//   return firebase.database().ref(`users/${matchID}/swipedOn`).update({
//     [currentUserID]: true
//   }).then(() => {
//     return firebase.database().ref(`users/${currentUserID}/swipedOn/${matchID}`).once('value').then(snapshot => {
//       if (snapshot.val() === true) {
//         // Match found!
//         return firebase.database().ref('matches').push({
//           user1: currentUserID,
//           user2: matchID
//         });
//       }
//     });
//   });
// }

// // Get a list of the current user's matches
// function getMatches() {
//   const currentUserID = firebase.auth().currentUser.uid;
//   return firebase.database().ref('matches').orderByChild('user1').equalTo(currentUserID).once('value').then(snapshot => {
//     const matches = [];
//     snapshot.forEach(childSnapshot => {
//       const match = childSnapshot.val();
//       match.id = childSnapshot.key;
//       matches.push(match);
//     });
//     return matches;
//   });
// }
