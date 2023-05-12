import "./css/matchupStyles.css";
import TinderCard from "react-tinder-card";
import React, {useEffect, useState} from "react";
import "./css/Cards.css";
import { db, storage } from "../firebase-config"; 
import {onSnapshot, collection, doc, getDoc, getDocs, where, query} from "firebase/firestore";
import { UserAuth } from "../context/UserAuthContext";//may have this wrong
import { functions } from "../firebase-config"; 
import { httpsCallable } from "firebase/functions";
import { ref, getDownloadURL, listAll, list } from "firebase/storage"; //def need to organize pictures at this rate

function Card() {
  const batchSize = 10;
  const [people, setPeople] = useState([]);
  const { user } = UserAuth();
  const [currentIndex, setCurrentIndex] = useState(batchSize);
  const [lastDoc, setLastDoc] = useState(null);
  const canSwipe = currentIndex >= 0;
  const [childRefs, setChildRefs] = useState([]);
  const [currentPersonId, setCurrentPersonId] = useState(null);
  const [buttonActive, setButtonActive] = useState(true);

  const swipeLeft = httpsCallable(functions, 'swipeLeft');
  const swipeRight = httpsCallable(functions, 'swipeRight');

  async function getUnswipedProfiles(uid, lastDoc = null) {
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

  async function onSwipeButtonClick(dir, swipeeemail, btnActive) {
    if (!canSwipe) {
      setButtonActive(false);
    }
    if (dir === "left" && btnActive) {
      if (childRefs[currentIndex]) {
        await childRefs[currentIndex].current.swipe("left");
        swipeLeft({ uid: user.uid, swipeeemail });
        setCurrentIndex(currentIndex => currentIndex - 1);
      }
    } 
    else if (dir === "right" && btnActive){
      if (childRefs[currentIndex]) {
        await childRefs[currentIndex].current.swipe("right");
        swipeRight({ uid: user.uid, swipeeemail });
        setCurrentIndex(currentIndex => currentIndex - 1);
      }
    }
    else {
      console.log("please wait until the card loads...");
      return;
    }
    if (!canSwipe) {
      const newProfiles = await getUnswipedProfiles(user.uid, lastDoc);
      if (newProfiles.length > 0) {
        const newRefs = Array(newProfiles.length).fill(0).map(i => React.createRef());
        setPeople([...newProfiles]);
        setCurrentIndex(newProfiles.length - 1);
        setLastDoc(newProfiles[0].doc);
        setChildRefs([...newRefs]);
        setCurrentPersonId(newProfiles[newProfiles.length - 1].id);
        setButtonActive(true);
      }
    } 
  } 

  useEffect(() => {
    async function loadInitialProfiles() {
      const newProfiles = await getUnswipedProfiles(user.uid);
      if (newProfiles.length > 0) {
        setPeople(newProfiles);
        setCurrentIndex(() => newProfiles.length - 1);
        setLastDoc(newProfiles[0].doc);
        setChildRefs(Array(batchSize).fill(0).map(i => React.createRef()));
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
            onCardLeftScreen={() => setCurrentPersonId(person.id)}
            preventSwipe={["up", "down", "left", "right"]}
            ref={childRefs[index]}
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
      <div className='newbuttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => onSwipeButtonClick('left', currentPersonId, buttonActive)}>Swipe left!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => onSwipeButtonClick('right', currentPersonId, buttonActive)}>Swipe right!</button>
      </div>
    </div>
  );
}

export default Card;