import { useEffect, useState } from "react";
import { Box, TextField, Container } from "@mui/material";
import NavBarChat from "./navBarChat";
import Messages from "./Messages";
import { UserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase-config";
import { HandleClicks } from "../modules/DateComputation";
import GoogleAPI from "../GoogleAPI";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";

const styles = {
  inputContainer: {
    height: "10.5vh",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: "8px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      backgroundColor: "#fff",
    },
    "& .MuiOutlinedInputNotchedOutline": {
      border: "none",
    },
    "&:focus .MuiOutlinedInputNotchedOutline": {
      border: "none",
    },
  },
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  message: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#666",
  },
};

const MessagesLog = (props) => {
  const [dataExist, setDataExist] = useState(false);
  const [data, setData] = useState([]);
  const [userInfo, setInfo] = useState(props.userInfo);
  const [value, setValue] = useState("");
  const { user } = UserAuth();
  const [session, setSession] = useState([]);
  const [types, setTypes] = useState([]);

  /* Fetch chats and set to Data */
  useEffect(() => {
    if (session.length > 1) {
      onSnapshot(session[0], (snapshot) => {
        let mes = Object.values(snapshot.data().messages);
        setData(mes);
      });
    }
    //session != undefined && session.length > 1  && unsub;
  }, [session]);

  /* Get UserInfo + Make conversation + Input process */
  useEffect(() => {
    setInfo(props.userInfo);
  }, [props.userInfo]);

  /* Get places information */

  useEffect(() => {
    HandleClicks(user.email)
      .then((value) => {
        setTypes(value);
        console.log(value);
      })
      .catch((error) => {
        console.error(error);
      });
    HandleClicks(user.email);
    console.log(user.email);
    if (userInfo.name) {
      const GetMetaData = async () => {
        const DocumentID =
          user.email.localeCompare(userInfo.email) === 1
            ? user.email + userInfo.email
            : userInfo.email + user.email;

        //Check if chat document exists
        const docRef = doc(db, "messages", DocumentID);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(docRef, { messages: [] });
        }
        setSession([docRef, DocumentID]);
      };
      GetMetaData();
      setDataExist(true);
    }
  }, [userInfo, user.email]);

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      var date = new Date();
      var minutes = date.getMinutes();
      var hour = date.getHours() % 12 || 12;
      var ampm = date.getHours() >= 12 ? "pm" : "am";
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      const newMessage = {
        userEmail: user.email,
        text: value,
        sender: userInfo,
        date: [month + 1 + "/" + day + "/" + year],
        time: [hour + ":" + minutes + " " + ampm],
      };
      await updateDoc(session[0], {
        messages: arrayUnion(newMessage),
      });
      setValue("");
    }
  };

  return (
    <>
      {dataExist ? (
        <>
          <NavBarChat name={userInfo.name} />
          <Box sx={{ overflowY: "auto", height: "79vh" }}>
            <Container sx={{ height: "15vh" }}>
              <>
                <GoogleAPI data={types} />
              </>
            </Container>
            <Container sx={{ height: "64vh" }}>
              {data.map((val) => {
                return <Messages data={val} />;
              })}
            </Container>
          </Box>
          <div style={styles.inputContainer}>
            <TextField
              variant="outlined"
              placeholder="Aa"
              fullWidth
              value={value}
              style={styles.input}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
        </>
      ) : (
        <Container sx={styles.container}>
          <h1 style={styles.message}>Please Pick a Person to Chat With</h1>
        </Container>
      )}
    </>
  );
};

export default MessagesLog;
