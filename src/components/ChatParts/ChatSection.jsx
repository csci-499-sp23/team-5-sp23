import * as React from "react";
import { Container, Grid } from "@mui/material";
import SideBar from "./SideBar";
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
    <div style={{
      fontFamily: 'Verdana',
      color: '#312E29',
      fontWeight: 'bolder',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#C3AFA5',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    <Container maxWidth="xl" sx={{ height: "90vh", }}>
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
    </div>
  );
};

export default ChatSection;
