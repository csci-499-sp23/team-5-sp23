import TinderCard from "react-tinder-card";
import React, { useEffect, useState, useRef } from "react";
import "./css/Cards.css";
import { storage } from "../firebase-config";
import { UserAuth } from "../context/UserAuthContext"; //may have this wrong
import { functions } from "../firebase-config";
import { httpsCallable } from "firebase/functions";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { useNavigate } from "react-router-dom";

// tinder card, includes functions for repopulation
//TODO: create delay function that's based on promises
function Card() {
  const batchSize = 15;
  const [people, setPeople] = useState([]);
  const { user } = UserAuth();
  const [currentIndex, setCurrentIndex] = useState(batchSize);
  const [isFinished, setIsFinished] = useState(false);
  const canSwipe = currentIndex >= 0;
  const childRefs = useRef([]);
  const [currentPersonId, setCurrentPersonId] = useState(null);
  const navigate = useNavigate();

  const swipeLeft = httpsCallable(functions, "swipeLeft");
  const swipeRight = httpsCallable(functions, "swipeRight");
  const getMatches = httpsCallable(functions, "getMatches");
  const [matches, setMatches] = useState([]);

  async function getUnswipedProfiles(uid) {
    const getProfiles = httpsCallable(functions, "getUnswipedProfiles");
    const result = await getProfiles({ uid, batchSize });
    const profiles = JSON.parse(result.data).profiles;

    const updatedProfiles = await Promise.all(
      profiles.map(async (profile) => {
        const storageRef = ref(storage, `${profile.id}/`);
        const res = await listAll(storageRef);
        const imageUrl = await getDownloadURL(res.items[0]);
        return { ...profile, imageUrl };
      })
    );

    return updatedProfiles;
  }

  let isSwiping = false;

  function navToProfile() {
    if (!isSwiping && canSwipe) {
      navigate("/Partner-Profile");
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
        await currentRef.swipe(dir);
        swipeFn({ uid: user.uid, swipeeemail });
        setCurrentIndex((currentIndex) => currentIndex - 1);
        if (people[tempindex]) {
          setCurrentPersonId(people[currentIndex - 1].id);
          localStorage.setItem("currentIndex", currentIndex - 1);
          localStorage.setItem(
            "pEmail",
            JSON.stringify(people[currentIndex - 1].id)
          );
        }
      }
      const checkForNewMatches = async (uid) => {
        // const matches = await getMatches() 
        const matchAmount = matches.length;
        
        const result = await getMatches({ uid, batchSize });
        const matchData = result.data;
        // debugger;
        setMatches(matchData);
        if(matchData.length > matchAmount){
          //Put pop up alert for match here
          window.alert("You have a new Match!");
        }
      }
      checkForNewMatches(user.uid);

      if (tempindex < 0) {
        // if we ran out of cards
        setTimeout(async () => {
          const newProfiles = await getUnswipedProfiles(user.uid);
          if (newProfiles.length > 0) {
            const newRefs = Array(newProfiles.length)
              .fill(0)
              .map((i) => React.createRef());
            setPeople(newProfiles);
            localStorage.setItem("currentIndex", newProfiles.length - 1);
            setCurrentIndex(newProfiles.length - 1);
            childRefs.current = newRefs;
            setCurrentPersonId(newProfiles[newProfiles.length - 1].id);
            localStorage.setItem(
              "pEmail",
              JSON.stringify(newProfiles[newProfiles.length - 1].id)
            );
          } else {
            setIsFinished(true);
          }
        }, 1000);
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
      var gottenIndex = parseInt(localStorage.getItem("currentIndex"));
      let tempnewprof = Array.from(newProfiles).slice(0, gottenIndex + 1);

      if (null === gottenIndex) {
        // needs to differentiate between final card index and default orientation
        gottenIndex = -1;
      }

      if (newProfiles.length > 0) {
        if (gottenIndex >= 0) {
          // if the batch was not completely swiped through
          setPeople(tempnewprof); //.reverse()
          setCurrentIndex(gottenIndex);
          // setLastDoc(newProfiles[newProfiles.length - 1].doc);
          childRefs.current = Array(batchSize)
            .fill(0)
            .map((i) => React.createRef());
          setCurrentPersonId(newProfiles[gottenIndex].id);
          localStorage.setItem(
            "pEmail",
            JSON.stringify(newProfiles[gottenIndex].id)
          );
        } else {
          setPeople(newProfiles);
          setCurrentIndex(() => newProfiles.length - 1);
          // setLastDoc(newProfiles[0].doc);
          childRefs.current = Array(batchSize)
            .fill(0)
            .map((i) => React.createRef());
          setCurrentPersonId(newProfiles[newProfiles.length - 1].id);
          localStorage.setItem(
            "pEmail",
            JSON.stringify(newProfiles[newProfiles.length - 1].id)
          );
        }
      }
    }
    loadInitialProfiles();

    const loadInitialMatches = async (uid) => {
      // const matches = await getMatches() 
      const result = await getMatches({ uid, batchSize });
      const matchData = result.data;
      debugger;
      setMatches(matchData);
    }
    loadInitialMatches(user.uid);
  }, [user.uid, getMatches]);

  return (
    <div>
      <div className="tinderCards_cardContainer">
        <div className="matchingBack">
          <div>
            
          {people.map((person, index) => (
            <TinderCard
              className="swipe"
              key={person.name}
              preventSwipe={["up", "down", "left", "right"]}
              ref={(el) => (childRefs.current[index] = el)}
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
        <div className="banner">
          Matching
        </div>
        <div className="newbuttons">
          <button
            style={{
              backgroundColor: isFinished && currentIndex < 0 && "#c3c4d3",
            }}
            onClick={() => swipeAndChangeId("left", currentPersonId)}
          >
            Swipe left!
          </button>
          <button
            style={{
              backgroundColor: isFinished && currentIndex < 0 && "#c3c4d3",
            }}
            onClick={() => navToProfile()}
          >
            Check out this user's profile!
            {/* Ideally adjust name */}
          </button>
          <button
            style={{
              backgroundColor: isFinished && currentIndex < 0 && "#c3c4d3",
            }}
            onClick={() => swipeAndChangeId("right", currentPersonId)}
          >
            Swipe right!
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
