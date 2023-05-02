import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { UserAuth } from "../context/UserAuthContext";
import { storage, db } from "../firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import Header from './Header';

// const styles = {
//     container: {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         background: "pink",
//     },
//     textField: {
//         color: "white",
//         "& .MuiInputBase-input": {
//             textAlign: "center",
//         },
//     },
//     input: {
//         color: "white",
//         "& label": {
//             color: "white"
//         },
//         "& input": {
//             textAlign: "center"
//         }
//     },
//     color: "white"
// };

const Profile = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [photos, setPhotos] = useState([]);
//   const [url, setURL] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };
  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleBirthdateChange = (event) => setBirthdate(event.target.value);
  const handleBioChange = (event) => setBio(event.target.value);
  const handleInterestsChange = (event) => setInterests(event.target.value);

  const { user } = UserAuth();

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
    const email = user.email;
    for (let i = 0; i < photos.length; i++) {
      const imageRef = ref(storage, `${email}/${photos[i].name + v4()}`);
      uploadBytes(imageRef, photos[i]).then(() => {
        console.log("Item has been uploaded: ", photos[i].name);
      });
    }
  };
  const submitProfileInformation = async () => {
    const docRef = doc(db, "profiles", user.email);
    await setDoc(docRef, {
      name: `${name}`,
      location: `${location}`,
      birthdate: `${birthdate}`,
      bio: `${bio}`,
      interests: `${interests}`,
    });
  };
  const submitProfile = (event) => {
    event.preventDefault();
    sumbitPhotos();
    submitProfileInformation();
  };

  return (
    <div style={{ background: "white" }}>
      <Header />
      <div>
        <h1>Profile</h1>
        <div>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          {photos.map((photo, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(photo)}
                style={{ width: 500, height: 600 }}
                alt=""
              />
              <button onClick={() => handleRemovePhoto(index)}>Remove</button>
            </div>
          ))}
        </div>
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
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            InputProps={{
              style: {
                color: "white",
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
                color: "white",
              },
            }}
            InputProps={{
              style: {
                color: "white",
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
                color: "white",
              },
            }}
            InputProps={{
              style: {
                color: "white",
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
                color: "white",
              },
            }}
            InputProps={{
              style: {
                color: "white",
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
                color: "white",
              },
            }}
            InputProps={{
              style: {
                color: "white",
              },
            }}
          />
          <button type="submit" onClick={submitProfile}>
            Submit Profile
          </button>
        </Box>

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ color: "white" }}
          >
            Save
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            style={{ color: "white" }}
          >
            Dislike
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
          >
            Like
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// button text is not coming out white...
