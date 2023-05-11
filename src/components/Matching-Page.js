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
    const uid = user.uid;
    const userid = { uid };
    const swipeeeuid = "JvuEQ0fE0IUiVoWgSq9jfVwq3yE3";
    const inputforswipeleft = {uid, swipeeeuid}

    const getUnswipedProfiles = httpsCallable(functions, 'getUnswipedProfiles');
    getUnswipedProfiles(userid)
    .then((result) => {
      const jsonString = result.data;
      const profiles = JSON.parse(jsonString).profiles;

      console.log("it worked!!!" + JSON.stringify(profiles));
      // Display the profiles to the user
    })
    .catch((error) => {
      console.error(error);
    });

    // const swipeLeft = httpsCallable(functions, 'swipeLeft');
    // swipeLeft(inputforswipeleft)
    // .then((result) => {
    //   const jsonString = result;
    //   console.log("swipedLeft worked!!!" + result);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    
    const swipeRight = httpsCallable(functions, 'swipeRight');
    swipeRight(inputforswipeleft)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
    
  }, [user.uid]); //perhaps use a bool attached to the last card to determine
  

  useEffect(() => {
  //   const storageRef = ref(storage, `${user.email}/`);
  //   list(storageRef, { maxResults: 1 }).then((res) => {
  //     const image = res.items[0];
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
