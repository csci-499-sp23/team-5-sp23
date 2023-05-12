import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { UserAuth } from "../../context/UserAuthContext";
const NavBarChat = (props) => {
  const { user } = UserAuth();
  const styles = {
    appBar: {
      backgroundColor: "#000",
      height: "5vh",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    title: {
      color: "#fff",
      fontWeight: "bold",
    },
    icons: {
      color: "#fff",
    },
  };
  const unmatchHandler = () => {
    console.log("unMatched");
  };
  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Typography variant="h6" component="div" sx={styles.title}>
          {props.name}
        </Typography>
        <div>
          <IconButton sx={styles.icons} onClick={unmatchHandler}>
            <p>UnMatch</p>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarChat;
