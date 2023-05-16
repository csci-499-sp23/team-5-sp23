import {
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  
} from "@mui/material";
import { doc, getDoc} from "firebase/firestore"
import { UserAuth } from "../../context/UserAuthContext";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";

// example user data
const users = [
  { name: "John Doe", avatar: "https://i.pravatar.cc/40?img=1" },
  { name: "Jane Doe", avatar: "https://i.pravatar.cc/40?img=2" },
  { name: "Bob Smith", avatar: "https://i.pravatar.cc/40?img=3" },
];

const SelectUser = (props) => {
  const { user } = UserAuth();
  const [newmatches, setMatches] = useState([]);
  const [userDisplay, setUserDisplay] = useState([]);
  const [wentOnce, setWentOnce] = useState(false);
  const [userName, setName] = useState("");
  //const [userAvatar, setAvatar] = ("");

  useEffect(( ) => {
    const  getAdditionalInfo = async() => {
      //do profile lookup and get name and avatar of user:
      let tempMatches = []; 
      for(const email of newmatches) {
       const emailTrimmed = email.trim();
         const docRef2 = doc(db, "profiles", emailTrimmed);
         const docSnap = await getDoc(docRef2);
         if (docSnap.exists()) {
           const data = docSnap.data();
           if(data.avatar != null){
             tempMatches.push({name: data.name, avatar: data.avatar, email: email, userName :userName, userAvatar: "/broken-image.jpg"});
           }else{/* Assumes no avatar photo exists */
             tempMatches.push({name: data.name, avatar: "/broken-image.jpg", email: email, userName : userName, userAvatar: "/broken-image.jpg"});
           }
         } else {
           // docSnap.data() will be undefined in this case
           console.log("No such document!");
         }
   
         
       };
       setUserDisplay(tempMatches);
     };
     if(newmatches !== []){
      getAdditionalInfo();
    }
    console.log(newmatches);
  }, [newmatches, userName]);


  const getUserInformation = async() =>{
    //get matches from users profile in firestore:
    if (!user.email){
      /* This needs to be solved, first time it runs, their is no user which should not be posssible*/
      return;
    }
    
    const docRef1 = doc(db, "profiles", user.email);
    const docSnap = await getDoc(docRef1);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if(data.matches != null){
        if(!wentOnce){
          console.log(data.matches);
          setMatches(Object.keys(data.matches).map((key) => data.matches[key]));
          setWentOnce(true);
          setName(data.name);
          //setAvatar(data.avatar);
        }
      }else{
        console.log("No matches, giving you some dummy data!");
        setUserDisplay(users);
        return;
      } 
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }   



    // See if user has photos uploaded and grab first image:


  };

  useEffect(()=>{
    console.log(userDisplay);
  }, [userDisplay])

  
       
  
  
  getUserInformation();


  return (
    <>
      <h1>ChatSelection</h1>

      <List>
        {userDisplay.map((user, index) => (
          <ListItem key={index}>
            <Button
              variant="contained"
              onClick={() => props.handleCallBack(user)}
              sx={{
                width: "100%",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                backgroundColor: "transparent",
                color: "#000",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.avatar} />
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SelectUser;

