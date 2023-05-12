import "./css/matchupStyles.css";
import TinderCard from "react-tinder-card";
import {useEffect, useState} from "react";
import "./css/Cards.css";
import { db, storage } from "../firebase-config"; 
import {onSnapshot, collection, doc, getDoc, getDocs, where, query} from "firebase/firestore";
import { UserAuth } from "../context/UserAuthContext";//may have this wrong
import { functions } from "../firebase-config"; 
import { httpsCallable } from "firebase/functions";
import { ref, getDownloadURL, listAll, list } from "firebase/storage"; //def need to organize pictures at this rate

// useEffect(() => {
//   const getCurrentUserProfile = async () => {
//     const docRef = doc(db, "profiles", user.email);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       return docSnap.data(); // print the data to the console
//     } else {
//       console.log("No such document!");
//     }
//   };
  
//   console.log(getCurrentUserProfile()); // call the function directly
// }, [user.email]);

// useEffect(() => {
  // const uid = user.uid;
  // const userid = { uid };
  // const swipeeeuid = "JvuEQ0fE0IUiVoWgSq9jfVwq3yE3";
  // const inputforswipeleft = {uid, swipeeeuid}

  // const getUnswipedProfiles = httpsCallable(functions, 'getUnswipedProfiles');
  // getUnswipedProfiles(userid)
  // .then((result) => {
  //   const jsonString = result.data;
  //   const profiles = JSON.parse(jsonString).profiles;

  //   console.log("it worked!!!" + JSON.stringify(profiles));
  //   // Display the profiles to the user
  // })
  // .catch((error) => {
  //   console.error(error);
  // });

  // const swipeLeft = httpsCallable(functions, 'swipeLeft');
  // swipeLeft(inputforswipeleft)
  // .then((result) => {
  //   const jsonString = result;
  //   console.log("swipedLeft worked!!!" + result);
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
  
  // const swipeRight = httpsCallable(functions, 'swipeRight');
  // swipeRight(inputforswipeleft)
  // .then((result) => {
  //   console.log(result);
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
  
  // const getMatches = httpsCallable(functions, 'getMatches');
  // getMatches(userid)
  // .then((result) => {
  //   console.log(result);
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
// }, [user.uid]); //perhaps use a bool attached to the last card to determine

function Card() {
  const [people, setPeople] = useState([]);
  const { user } = UserAuth();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function getUnswipedProfiles(uid) {
      const getProfiles = httpsCallable(functions, "getUnswipedProfiles");
      const result = await getProfiles({ uid });
      const profiles = JSON.parse(result.data).profiles;
      console.log(profiles);
      console.log(JSON.stringify(profiles));

      // Get download URLs for images in Storage and add to profiles
      const promises = profiles.map(async (profile) => {
        const storageRef = ref(storage, `${profile.id}/`);
        console.log("storagereference = " + storageRef);
        console.log("profile = " + profile);
        const res = await listAll(storageRef);
        console.log(res);
        const imageUrl = await getDownloadURL(res.items[0]);
        console.log("image url = " + imageUrl);
        return { ...profile, imageUrl };
      });

      const updatedProfiles = await Promise.all(promises);
      setProfiles(updatedProfiles);
    }

    getUnswipedProfiles(user.uid);
  }, []);

  useEffect(() => {
    setPeople(profiles);
  }, [profiles]);

  return (
    <div>
      <div className="tinderCards_cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${person.imageUrl})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default Card;