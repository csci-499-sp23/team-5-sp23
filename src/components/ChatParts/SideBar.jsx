import { UserAuth } from "../../context/UserAuthContext";
import SelectUser from "./SelectUser";
//import Search from "./Search";
import { Box, Container, Avatar } from "@mui/material";

const SideBar = (props) => {
  const { user } = UserAuth();
  const styles = {
    mainContainer: {
      height: "90vh",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    containerA: {
      height: "10%",
      backgroundColor: "#ccc",
      overflow: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      
    },
    containerB: {
      height: "90%",
      backgroundColor: "#eee",
      overflow: "auto",
    },
    avatarBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
  const dealwiththis = (val) => {
    props.SelectedUser(val);

  }
  return (
    <Container sx={styles.mainContainer}>
      {/* <Box sx={styles.containerA}><Search /></Box> */}
      <Box sx={styles.containerA}>
        <Box sx={styles.avatarBox}>
          <Avatar>H</Avatar>
        </Box>
      </Box>
      <Box sx={styles.containerB}>
        <SelectUser handleCallBack={dealwiththis}/>
      </Box>
    </Container>
  );
};

export default SideBar;
