import SelectUser from "./SelectUser";
//import Search from "./Search";
import { Box, Container,  } from "@mui/material";

const SideBar = (props) => {
  const styles = {
    mainContainer: {
      height: "90vh",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    containerB: {
      height: "100%",
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
  };
  return (
    <Container sx={styles.mainContainer}>
      <Box sx={styles.containerB}>
        <SelectUser handleCallBack={dealwiththis} />
      </Box>
    </Container>
  );
};

export default SideBar;
