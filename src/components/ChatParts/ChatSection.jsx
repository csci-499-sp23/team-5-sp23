import * as React from "react";
import { Container, Box, Grid } from "@mui/material";
import Messages from "./Messages";
import SideBar from "./SideBar";
import SelectUser from "./SelectUser";
import MessagesLog from "./MessageLog";
import { useState, useEffect } from "react";

const ChatSection = () => {
  const [userSelection, setUser] = useState([]);
  const [userChange, setChange] = useState(false);
  const styles = {
    containerA: {
      height: "90vh",
      backgroundColor: "#ccc",
    },
    containerB: {
      height: "90vh",
      backgroundColor: "#eee",
    },
  };

  useEffect(() => {
    setChange(true);
    
  }, [userSelection]);

  const userDeal = (userInfo) => {
    setUser(userInfo);
    setChange(true);
  };

  return (
    <Container maxWidth="xl" sx={{ height: "90vh", backgroundColor: "orange" }}>
      <Grid container spacing={0}>
        <Grid item xs={3} sx={styles.containerA}>
          <SideBar SelectedUser={userDeal} />
        </Grid>
        <Grid item xs={9} sx={styles.containerB}>
          {userChange ? (
            <MessagesLog userInfo={userSelection} />
          ) : (
            
            <MessagesLog userInfo={"Nothing"} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatSection;
