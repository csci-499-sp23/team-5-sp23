import React, { useState } from "react";
import { TextField, Button,  Box } from "@mui/material";
import { UserAuth } from "../context/UserAuthContext";
import { storage, db } from "../firebase-config";
import { ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import { useNavigate, Link } from 'react-router-dom';
import logo from "./img/logo.png";
import "./css/Profile-Page-Creation.css";


const Profile_Creation = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [bio, setBio] = useState("");
    const [interests, setInterests] = useState("");
    const [photos, setPhotos] = useState([]);
    

    const handleNameChange = (event) => setName(event.target.value);
    const handleLocationChange = (event) => setLocation(event.target.value);
    const handleBirthdateChange = (event) => setBirthdate(event.target.value);
    const handleBioChange = (event) => setBio(event.target.value);
    const handleInterestsChange = (event) => {setInterests(event.target.value); console.log(interests);};

    const {user} = UserAuth();
    const navigate = useNavigate();

  const handlePhotoUpload = (event) => {
    console.log(event);
    const file = event.target.files[0];
    if (file && photos.length < 6) {
      setPhotos((prevPhotos) => [...prevPhotos, file]);
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => [
      ...prevPhotos.slice(0, index),
      ...prevPhotos.slice(index + 1),
    ]);
  };

  const handleSave = () => {
    // enter database code here to save profile information
    console.log({
      name,
      location,
      birthdate,
      bio,
      interests,
      photos,
    });
  };

    // Submit information functions:
    const sumbitPhotos = () => {
        const email = user.email
        for(let i = 0; i< photos.length; i++){
            const imageRef = ref(storage, `${email}/${photos[i].name + v4()}`)
            uploadBytes(imageRef, photos[i])
                .then(()=>{
                    console.log("Photo has been uploaded: ", photos[i].name)
                })
        };
    };
    const submitProfileInformation = async () =>{
        const docRef = doc(db, 'profiles' , user.email);
        await setDoc(docRef, {
            name: `${name}`,
            location: `${location}`,
            birthdate: `${birthdate}`,
            bio: `${bio}`,
            interests: `${interests}`
        })
    };
    const submitProfile = (event) => {
        event.preventDefault();
        sumbitPhotos();
        submitProfileInformation();
        navigate(('/Profile-Page'))
    };

  return (
  <div className="profileContent">
    
    <div className="logo-container">
      <Link to="/">
          <img src={logo} alt="persona logo" className="logo" />
      </Link>
    </div>  

    <h1>Edit Your Profile</h1>
    
    <div className="profileBody">

    <div className="upload">
      <input id="file-input" type="file" accept="image/*" onChange={handlePhotoUpload} />
      <button id="browse-button">CLICK TO UPLOAD PHOTOS...</button>
    </div>
      {photos.map((photo, index) => (
      <div key={index}>
      <img
        src={URL.createObjectURL(photo)}
        style={{ maxHeight: 500, color: "transparent", padding: 15, backgroundColor: "transparent"}}
        alt={""}
      />
      <br />
      <Button onClick={() => handleRemovePhoto(index)}>Remove Current Photo</Button>
      </div>
      ))}
    
    <br />

    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-basic"
        variant="filled"
        label="Name"
        color="secondary"
        height= "2.4em"
        InputLabelProps={{
          style: {
            color: "#efefef",
          },
        }}
        InputProps={{
          style: {
            color: "#312E29",
            height: "4.6em",
          },
        }}
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        label="Location"
        value={location}
        variant="filled"
        onChange={handleLocationChange}
        InputLabelProps={{
          style: {
            color: "#efefef",
          },
        }}
        InputProps={{
          style: {
            color: "#312E29",
            height: "4.6em",
          },
        }}
      />
      <TextField
        label="Birthdate"
        type="date"
        variant="filled"
        value={birthdate}
        onChange={handleBirthdateChange}
        InputLabelProps={{
          style: {
            color: "#efefef",
          },
        }}
        InputProps={{
          style: {
            color: "#312E29",
            height: "4.6em",
          },
        }}
      />
      <TextField
        label="Bio"
        multiline
        variant="filled"
        rows={4}
        value={bio}
        onChange={handleBioChange}
        InputLabelProps={{
          style: {
            color: "#efefef",
          },
        }}
        InputProps={{
          style: {
            color: "#312E29",
          },
        }}
      />
      <TextField
        label="Interests"
        multiline
        variant="filled"
        rows={4}
        value={interests}
        onChange={handleInterestsChange}
        InputLabelProps={{
          style: {
            color: "#efefef",
          },
        }}
        InputProps={{
          style: {
            textAlign: "left",
            color: "#312E29",
          },
        }}
      />
      <br />
      <Button type="submit" onClick={submitProfile}>
        Submit Entries
      </Button>
    </Box>
    
    <div>
      <Button
        onClick={handleSave}
        style={{ color: "#efefef", backgroundColor: "#312E29" }}
      >
        Save to Profile
      </Button>
    </div>
    </div>

  </div>

  );
};

export default Profile_Creation;
