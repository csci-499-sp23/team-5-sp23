import { AppBar, Toolbar, Typography } from "@mui/material";

const NavBarChat = (props) => {
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

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Typography variant="h6" component="div" sx={styles.title}>
          {props.name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarChat;
