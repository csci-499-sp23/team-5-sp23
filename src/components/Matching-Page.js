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

function Card() {
  const [people, setPeople] = useState([]);
  const { user } = UserAuth();
  const [profiles, setProfiles] = useState([]);
  const uid = user.uid;
  const [currentIndex, setCurrentIndex] = useState(2)
  
  const getCurrentUserProfile = async () => {
    const docRef = doc(db, "profiles", user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data(); // print the data to the console
    } else {
      console.log("No such document!");
    }
  };
  
  const swipeLeft = httpsCallable(functions, 'swipeLeft');
  const swipeRight = httpsCallable(functions, 'swipeRight');
  const getMatches = httpsCallable(functions, 'getMatches');
  
  const onSwipe = (direction, swipeeemail, index) => {
    if (currentIndex === 1) {getUnswipedProfiles(uid);}
    if (direction === "left") {
      swipeLeft({uid, swipeeemail});
      setCurrentIndex(index - 1);
    }
    else {
      swipeRight({uid, swipeeemail});
      setCurrentIndex(index - 1);
    }
  }

  async function getUnswipedProfiles(uid) {
    const getProfiles = httpsCallable(functions, "getUnswipedProfiles");
    const result = await getProfiles({ uid });
    const profiles = JSON.parse(result.data).profiles;
    
    // Get download URLs for images in Storage and add to profiles
    const promises = profiles.map(async (profile) => {
      const storageRef = ref(storage, `${profile.id}/`);
      const res = await listAll(storageRef);
      const imageUrl = await getDownloadURL(res.items[0]);
      return { ...profile, imageUrl };
    });
    
    const updatedProfiles = await Promise.all(promises);
    
    // Merge the new profiles state with the previous one using the spread operator
    setProfiles((prevProfiles) => [...prevProfiles, ...updatedProfiles]);
  }

  getUnswipedProfiles(uid);
  
  useEffect(() => {
    setPeople(profiles);
  }, [profiles]);

  return (
    <div>
      <div className="tinderCards_cardContainer">
        {people.map((person, index) => (
          <TinderCard
            className="swipe"
            key={person.name}
            onSwipe={(dir) => onSwipe(dir, person.id, index)}
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