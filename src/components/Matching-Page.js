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
    
    // const uid = user.uid;
    // const userid = { uid };
    // Define a state variable to hold the profiles
    
    async function getUnswipedProfiles(uid) {
      const getProfiles = httpsCallable(functions, "getUnswipedProfiles");
      const result = await getProfiles({ uid });
      const profiles = JSON.parse(result.data).profiles;
      console.log(profiles);
      console.log(JSON.stringify(profiles));
    
      // Get download URLs for images in Storage and add to profiles
      for (let i = 0; i < profiles.length; i++) {
        
        const storageRef = ref(storage, `${profiles[i].id}/`);
        console.log("storagereference = " + storageRef);
        console.log("profile i = " + profiles[i]);
        await listAll(storageRef)
        .then((res) => {
          console.log(res);
          const imageurl = await getDownloadURL(res.items[0]);
          profiles[i].imageUrl = imageurl;
          // res.items.forEach((itemRef) => {
          //   console.log("itemref = " + itemRef);
          //   profiles[i].imageUrl = getDownloadURL(itemRef);
          //   console.log("profile i's image url = " + profiles[i].imageUrl);
          // });
        // TRY THIS
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log("An error has occured getting images for swiping");
          console.log(error.message);
        });
    };

      setPeople(profiles);
    }
    
    getUnswipedProfiles(user.uid);
    
  }, []);
  return (
    <div>
            <div className="tinderCards_cardContainer">
              {people.map(person => (
                <TinderCard
                  className="swipe"
                  key={person.name}
                  preventSwipe={['up','down']}
                  >
                  <div style={{ backgroundImage: `url(${person.imageUrl})`}} className="card">
                    <h3>{person.name}</h3>
                  </div>
                </TinderCard>
              ))}
            </div>
          </div>
        );        
      }
      
      export default Card;
      
      // const getUnswipedProfiles = httpsCallable(functions, 'getUnswipedProfiles');
      // const unsubscribe = getUnswipedProfiles(userid)
      // .then((result) => {
      //   const jsonString = result.data;
      //         const profiles = JSON.parse(jsonString).profiles;
      //         setPeople(profiles);
      //         // Set up the onSnapshot listener inside the promise block
      //         return onSnapshot({ 
      //           // Replace collection with array of profiles
      //           docs: profiles.map(profile => ({data: () => profile}))
      //         }, snapshot => {
      //           setPeople(snapshot.docs.map(doc => doc.data()))
      //         });
      //       })
      //       .catch((error) => {
      //         console.error(error);
      //       });
            
      //       return () => {
      //         //cleanup
      //         unsubscribe();
      //       }
            
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
      
      // // Call the cloud function to get the unswiped profiles
      //   const getUnswipedProfiles = httpsCallable(functions, 'getUnswipedProfiles');
      //   getUnswipedProfiles(userid)
      //     .then((result) => {
        //       const jsonString = result.data;
        //       const profiles = JSON.parse(jsonString).profiles;
        
        //       // Update the state variable with the profiles
        //       setProfiles(profiles);
        //     })
        //     .catch((error) => {
          //       console.error(error);
          //     });
          
          //   // Replace the collection query with the profiles state variable
          //   const unsubscribe = onSnapshot({ 
            //     // Replace collection with array of profiles
            //     docs: profiles.map(profile => ({data: () => profile}))
            //   }, snapshot => {
              //     setPeople(snapshot.docs.map(doc => doc.data()))
              // //   });
              
      //     return () => {
      //       //cleanup
      //       unsubscribe();
      //     }