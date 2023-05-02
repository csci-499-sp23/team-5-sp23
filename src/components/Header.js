import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import "./css/Header.css";
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Header = () => {
  // const navigate = useNavigate();
  return (
    //BEM
    <div className="header">
      {/* IMPLEMENTATION OF BACK BUTTON WHICH CHANGES FUNCTIONALITY DEPENDING ON WHAT PAGE YOU ARE ON (EX: BACK BUTTON IF YOU GO INTO THE CHAT PAGE / PROFILE BUTTON IF YOU ARE ON THE MATCHING PAGE */}
      {/* {backButton ? (
        <IconButton onClick={() => navigate(backButton, {replace: true})}>
          <ArrowBackIosIcon className="header_icon" fontSize="large" />
        </IconButton>
      ) : (
        <IconButton>
          <PersonIcon className="header_icon" fontSize="large" />
        </IconButton>

      )} */}

      <Link to="/Profile-Page">
        <IconButton>
          <PersonIcon className="header_icon" fontSize="large" />
        </IconButton>
      </Link>

      <Link to="/Matching-Page">
        <img
          className="header_logo"
          src="https://1000logos.net/wp-content/uploads/2018/07/Tinder-icon.png" // CHANGE SOON
          alt="tinder logo"/>
      </Link>

      <Link to="/Chat-Page">
        <IconButton>
          <ForumIcon className="header_icon" fontSize="large"/>
        </IconButton>
      </Link>
    </div>
  );
};

export default Header;