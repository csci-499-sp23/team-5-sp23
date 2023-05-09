import "./css/matchupStyles.css";
import TinderCard from "react-tinder-card";
import {useEffect, useState} from "react";
import "./css/Cards.css";
import { db } from "../firebase-config"; 
import {onSnapshot, collection, doc, getDoc, getDocs, where, query} from "firebase/firestore";
import { UserAuth } from "../context/UserAuthContext";//may have this wrong
import axios from "axios";


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
    
    const promise = axios
          .get(
            `http://localhost:5001/csci499/us-central1/getUnswipedProfiles`
            // `https://us-central1-csci499.cloudfunctions.net/getUnswipedProfiles`
          )
          .then((result) => {
            const profiles = result.data.profiles;
          })
          .catch((error) => console.error(error));
    console.log(promise);
    // // Get a list of potential matches for the current user
    // const getPotentialMatches = async () => {
    //   const currentUserID = user.uid;
    //   const colRef = collection(db, "profiles");
    //   const q = query(colRef, where("swipedOn", "array-contains", [currentUserID]));

    //   const querySnapshot = await getDocs(q);
    //   const matches = [];
    //   querySnapshot.forEach((doc) => {
    //     const match = doc.data();
    //       match.id = doc.id;
    //       matches.push(match);
    //   });
    //   console.log(matches);
    //   return matches;
    // }   

    // getPotentialMatches();
  }, [user.uid]);
  

  useEffect(() => {
  

      const unsubscribe = onSnapshot(collection(db, 'exampleprofiles'), snapshot => (
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
