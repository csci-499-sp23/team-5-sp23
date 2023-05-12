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
  const [currentIndex, setCurrentIndex] = useState(2);
  const [lastDoc, setLastDoc] = useState(null);
  
  const swipeLeft = httpsCallable(functions, 'swipeLeft');
  const swipeRight = httpsCallable(functions, 'swipeRight');

  async function getUnswipedProfiles(uid, lastDoc = null) {
    const batchSize = 3;
    const lastVisible = lastDoc;
    const getProfiles = httpsCallable(functions, "getUnswipedProfiles");
    const result = await getProfiles({ uid, lastVisible, batchSize });
    const profiles = JSON.parse(result.data).profiles;
    
    // Get download URLs for images in Storage and add to profiles
    const promises = profiles.map(async (profile) => {
      const storageRef = ref(storage, `${profile.id}/`);
      const res = await listAll(storageRef);
      const imageUrl = await getDownloadURL(res.items[0]);
      return { ...profile, imageUrl };
    });
    
    const updatedProfiles = await Promise.all(promises);
    
    return updatedProfiles;
  }
  
  const onSwipe = async (direction, swipeeemail, index) => {
    console.log("current index = " + currentIndex);
    if (currentIndex === 0) { // not sure if it counts forwards or backwards
      const newProfiles = await getUnswipedProfiles(user.uid, lastDoc);
      if (newProfiles.length > 0) {
        setPeople(() => [...newProfiles]);
        // setPeople((prevPeople) => [...newProfiles, ...prevPeople]);
        setCurrentIndex(newProfiles.length - 1);
        setLastDoc(newProfiles[0].doc);
        // setLastDoc(newProfiles[newProfiles.length - 1].doc);
      }
    } else {
      if (direction === "left") {
        swipeLeft({uid: user.uid, swipeeemail});
        setCurrentIndex(currentIndex => currentIndex - 1);
      } else {
        swipeRight({uid: user.uid, swipeeemail});
        setCurrentIndex(currentIndex => currentIndex - 1);
      }
    }
  };
  
  useEffect(() => {
    async function loadInitialProfiles() {
      const newProfiles = await getUnswipedProfiles(user.uid);
      if (newProfiles.length > 0) {
        setPeople(newProfiles);
        setLastDoc(newProfiles[0].doc);
      }
    }
    loadInitialProfiles();
  }, [user.uid]);

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