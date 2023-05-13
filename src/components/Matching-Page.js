import "./css/matchupStyles.css";
import TinderCard from "react-tinder-card";
import React, {useEffect, useState, useRef} from "react";
import "./css/Cards.css";
import { db, storage } from "../firebase-config"; 
import {onSnapshot, collection, doc, getDoc, getDocs, where, query} from "firebase/firestore";
import { UserAuth } from "../context/UserAuthContext";//may have this wrong
import { functions } from "../firebase-config"; 
import { httpsCallable } from "firebase/functions";
import { ref, getDownloadURL, listAll, list } from "firebase/storage"; //def need to organize pictures at this rate

function Card() {
  const batchSize = 3;
  const [people, setPeople] = useState([]);
  const { user } = UserAuth();
  const [currentIndex, setCurrentIndex] = useState(batchSize);
  const [lastDoc, setLastDoc] = useState(null);
  const canSwipe = currentIndex >= 0;
  const childRefs = useRef([]);
  const [currentPersonId, setCurrentPersonId] = useState(null);

  const swipeLeft = httpsCallable(functions, 'swipeLeft');
  const swipeRight = httpsCallable(functions, 'swipeRight');

  async function getUnswipedProfiles(uid, lastDoc = null) {
    const lastVisible = lastDoc;
    const getProfiles = httpsCallable(functions, "getUnswipedProfiles");
    const result = await getProfiles({ uid, lastVisible, batchSize });
    const profiles = JSON.parse(result.data).profiles;

    // Get download URLs for images in Storage and add to profiles
    const updatedProfiles = await Promise.all(profiles.map(async (profile) => {
      const storageRef = ref(storage, `${profile.id}/`);
      const res = await listAll(storageRef);
      const imageUrl = await getDownloadURL(res.items[0]);
      return { ...profile, imageUrl };
    }));

    return updatedProfiles;
  }

  let isSwiping = false;

async function swipeAndChangeId(dir, swipeeemail) {
  // If the function is already running, don't do anything
  if (isSwiping || !canSwipe) {
    return;
  }

  isSwiping = true;

  try {
    const swipeFn = dir === "left" ? swipeLeft : swipeRight;
    const currentIndexRef = { current: currentIndex };
    const currentRef = childRefs.current[currentIndexRef.current];
    if (currentRef) {
      await currentRef.swipe(dir);
      swipeFn({ uid: user.uid, swipeeemail });
      setCurrentIndex(currentIndex => currentIndex - 1);
      if (people[currentIndex]) {
        setCurrentPersonId(people[currentIndex].id);
      }
    }
  
    if (!canSwipe) {
      const newProfiles = await getUnswipedProfiles(user.uid, lastDoc);
      if (newProfiles.length > 0) {
        const newRefs = Array(newProfiles.length).fill(0).map(i => React.createRef());
        setPeople(newProfiles);
        setCurrentIndex(newProfiles.length - 1);
        setLastDoc(newProfiles[0].doc);
        childRefs.current = newRefs;
        setCurrentPersonId(newProfiles[newProfiles.length - 1].id);
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    isSwiping = false;
  }
}

  
  // function handleSwipe(ind, dir) {
  //   const childRef = childRefs.current[ind];
  //   if (childRef) {
  //     childRef.swipe(dir).then(() => {
  //       swipeAndChangeId(dir, swipeeemail);
  //     });
  //   }
  // }
  
  
  useEffect(() => {
    async function loadInitialProfiles() {
      const newProfiles = await getUnswipedProfiles(user.uid);
      if (newProfiles.length > 0) {
        setPeople(newProfiles);
        setCurrentIndex(() => newProfiles.length - 1);
        setLastDoc(newProfiles[0].doc);
        childRefs.current = Array(batchSize).fill(0).map(i => React.createRef());
        setCurrentPersonId(newProfiles[newProfiles.length - 1].id);
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
            preventSwipe={["up", "down"]}
            ref={el => (childRefs.current[index] = el)}
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
      <div className="newbuttons">
        <button style={{ backgroundColor: !canSwipe && "#c3c4d3" }} onClick={() => swipeAndChangeId("left", currentPersonId)}>
          Swipe left!
        </button>
        <button style={{ backgroundColor: !canSwipe && "#c3c4d3" }} onClick={() => swipeAndChangeId("right", currentPersonId)}>
          Swipe right!
        </button>
      </div>
    </div>
  );
}

export default Card;
