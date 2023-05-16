import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { UserAuth } from "../context/UserAuthContext";
import { storage, db } from "../firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
// import logo from "./img/logo.png";
import "./css/Profile-Page-Creation.css";

const Profile_Creation = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [photos, setPhotos] = useState([]);
  const [genderPref, setGenderPref] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleBirthdateChange = (event) => setBirthdate(event.target.value);
  const handleBioChange = (event) => setBio(event.target.value);
  const handleInterestsChange = (event) => {
    setInterests(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGenderPref(event.target.value);
  };

  const { user } = UserAuth();
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

  // Submit information functions:
  const sumbitPhotos = () => {
    const email = user.email;
    for (let i = 0; i < photos.length; i++) {
      const imageRef = ref(storage, `${email}/${photos[i].name + v4()}`);
      uploadBytes(imageRef, photos[i]).then(() => {
        console.log("Photo has been uploaded: ", photos[i].name);
      });
    }
  };
  const submitProfileInformation = async () => {
    const docRef = doc(db, "profiles", user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        name: `${name}`,
        location: `${location}`,
        birthdate: `${birthdate}`,
        bio: `${bio}`,
        interests: `${interests}`,
        genderPref: `${genderPref}`,
      });
    } else {
      await setDoc(docRef, {
        name: `${name}`,
        location: `${location}`,
        birthdate: `${birthdate}`,
        bio: `${bio}`,
        interests: `${interests}`,
        genderPref: `${genderPref}`,
      });
    }
    
  
  };
  const submitProfile = (event) => {
    event.preventDefault();
    if(name === "" || location === "" || birthdate === "" || bio === "" || interests === "" || genderPref === "" || photos.empty){
      console.log("Fill everything up!");
      return;
    }
    sumbitPhotos();
    submitProfileInformation();
    navigate("/Profile-Page");
  };

  return (
    <div className="profileContent">
      

      <h1>Edit Your Profile</h1>

      <div className="profileBody">
        <div className="upload">
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
          />

          <button id="browse-button">CLICK TO UPLOAD PHOTOS...</button>
        </div>

        <br />
        <br />

        {photos.map((photo, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(photo)}
              style={{
                maxHeight: 500,
                maxWidth: 800,
                color: "transparent",
                backgroundColor: "transparent",
              }}
              alt={""}
            />

            <br />
            <br />

            <button onClick={() => handleRemovePhoto(index)}>
              REMOVE CURRENT PHOTO
            </button>
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
            required
            variant="filled"
            label="Name"
            color="secondary"
            height="2.4em"
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
            label="Gender Preference"
            required
            value={genderPref}
            placeholder="Male, Female, Other"
            variant="filled"
            onChange={handleGenderChange}
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
            label="Location"
            required
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
            required
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
            required
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
            required
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
            onClick={()=>{navigate("/PersonalityPage")}}
            style={{ color: "#efefef", backgroundColor: "#312E29" }}
          >
            Retake MBTI Test!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile_Creation;
