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
import PartnerProfile from "./Partner-Profile-Page";
import { PinDropSharp } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";


function Card() {
  const batchSize = 5;
  const [people, setPeople] = useState([]);
  const { user } = UserAuth();
  const [currentIndex, setCurrentIndex] = useState(batchSize);
  const [lastDoc, setLastDoc] = useState(null); 
  // would need something like this and would snipe it and take it to the 
  const canSwipe = currentIndex >= 0;
  const childRefs = useRef([]);
  const [currentPersonId, setCurrentPersonId] = useState(null);
  const navigate = useNavigate();

  const swipeLeft = httpsCallable(functions, 'swipeLeft');
  const swipeRight = httpsCallable(functions, 'swipeRight');

  async function getUnswipedProfiles(uid, lastDoc = null) {
    const lastVisible = lastDoc;
    const getProfiles = httpsCallable(functions, "getUnswipedProfiles");
    const result = await getProfiles({ uid, lastVisible, batchSize });
    const profiles = JSON.parse(result.data).profiles;
    console.log("getProfiles result = ",profiles);

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

  function navToProfile() {
    if (!isSwiping && canSwipe) {
      navigate('/Partner-Profile');
    }
  }
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
    const tempindex = currentIndex - 1;
    if (currentRef) {
      console.log("CURRENT REFERENCE IMMEDIATELY BEFORFE SWIPE: ",currentRef);
      await currentRef.swipe(dir);
      swipeFn({ uid: user.uid, swipeeemail });
      setCurrentIndex(currentIndex => currentIndex - 1);
      if (people[tempindex]) {
        console.log("THERE WERE PEOPLE AT THE DESIRED INDEX!!!");
        setCurrentPersonId(people[currentIndex - 1].id);
        localStorage.setItem('currentIndex', currentIndex - 1);
        localStorage.setItem('pEmail', JSON.stringify(people[currentIndex-1].id));
      }
    }
    if (tempindex < 0) { // if we ran out of cards
      console.log("RAN OUT OF CARDS TO SWIPE THROUGH");
      const newProfiles = await getUnswipedProfiles(user.uid, lastDoc);
      if (newProfiles.length > 0) {
        console.log("THERE ARE MORE PROFILES TO LOAD IN");
        const newRefs = Array(newProfiles.length).fill(0).map(i => React.createRef());
        setPeople(newProfiles);
        setCurrentIndex(newProfiles.length - 1);
        localStorage.setItem('currentIndex', newProfiles.length - 1);
        console.log("CURRENT INDEX IMMEDIATELY AFTER BEING SET: ",newProfiles.length - 1);
        setLastDoc(newProfiles[0].doc);
        childRefs.current = newRefs;
        setCurrentPersonId(newProfiles[newProfiles.length - 1].id);
        localStorage.setItem('pEmail', JSON.stringify(newProfiles[newProfiles.length - 1].id));
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    isSwiping = false;
  }
}

  useEffect(() => {
    async function loadInitialProfiles() {
      const newProfiles = await getUnswipedProfiles(user.uid); // returns empty array when no more profiles
      var gottenIndex = localStorage.getItem('currentIndex');

      if(null === gottenIndex) // needs to differentiate between final card index and default orientation
      {
        gottenIndex = -1;
      }

      if (newProfiles.length > 0) {
        if (gottenIndex >= 0) { // if the batch was not completely swiped through
          console.log("USING LOCALLY STORED INDEX");
          setPeople(newProfiles.slice(0, gottenIndex+1));//.reverse()

          console.log("UPDATED / SLICED ARRAY = ",newProfiles.slice(0, gottenIndex+1)); //.reverse()
          console.log("GOTTEN INDEX = ",gottenIndex);

          setCurrentIndex(gottenIndex);
          setLastDoc(newProfiles[newProfiles.length - 1].doc);
          childRefs.current = Array(batchSize).fill(0).map(i => React.createRef());
          setCurrentPersonId(newProfiles[gottenIndex].id);
          console.log("PERSON ID = ", currentPersonId);
          localStorage.setItem('pEmail', JSON.stringify(newProfiles[gottenIndex].id));
        }
        else {
          console.log("NOT USING LOCALLY STORED INDEX");
          setPeople(newProfiles);
          setCurrentIndex(() => newProfiles.length - 1);
          setLastDoc(newProfiles[0].doc); 
          childRefs.current = Array(batchSize).fill(0).map(i => React.createRef());
          setCurrentPersonId(newProfiles[newProfiles.length - 1].id);
          localStorage.setItem('pEmail', JSON.stringify(newProfiles[newProfiles.length - 1].id));
        }
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
        <button style={{ backgroundColor: isSwiping && (currentIndex < 0) && "#c3c4d3" }} onClick={() => swipeAndChangeId("left", currentPersonId)}>
          Swipe left!
        </button>
        <button style={{ backgroundColor: isSwiping && (currentIndex < 0) && "#c3c4d3" }} onClick={() => navToProfile()}>
          Check out this user's profile!
          {/* Ideally adjust name */}
        </button>
        <button style={{ backgroundColor: isSwiping && (currentIndex < 0) && "#c3c4d3" }} onClick={() => swipeAndChangeId("right", currentPersonId)}>
          Swipe right!
        </button>
      </div>
    </div>
  );
}

export default Card;
