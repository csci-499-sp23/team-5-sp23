import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "black",
    },
    textField: {
        color: "white",
        "& .MuiInputBase-input": {
            textAlign: "center",
        },
    },
    input: {
        color: "white",
        "& label": {
            color: "white"
        },
        "& input": {
            textAlign: "center"
        }
    },
    color: "white"
};

const Profile = () => {
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
    const handleInterestsChange = (event) => setInterests(event.target.value);

    const handlePhotoUpload = (event) => {
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

    return (
        <div style={styles.container}>
        <div>
            <h1>Profile</h1>
            <div>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                {photos.map((photo, index) => (
                    <div key={index}>
                        <img src={URL.createObjectURL(photo)} alt="" />
                        <button onClick={() => handleRemovePhoto(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <div>
                    <TextField
                        label="Name"
                        InputLabelProps={{
                            style: {
                                color: "white"
                            }
                        }}
                        InputProps={{
                            style: {
                                color: "white"
                            }
                        }}
                        value={name}
                        onChange={handleNameChange}
                    />
            </div>
            <div>
                <TextField
                    label="Location"
                    value={location}
                    onChange={handleLocationChange}
                    InputLabelProps={{
                        style: {
                            color: "white"
                        }
                    }}
                    InputProps={{
                        style: {
                            color: "white"
                        }
                    }}
                />
            </div>
            <div>
                <TextField
                    label="Birthdate"
                    type="date"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                    InputLabelProps={{
                        style: {
                            color: "white"
                        }
                    }}
                    InputProps={{
                        style: {
                            color: "white"
                        }
                    }}
                />
            </div>
            <div>
                <TextField
                    label="Bio"
                    multiline
                    rows={4}
                    value={bio}
                    onChange={handleBioChange}
                    InputLabelProps={{
                        style: {
                            color: "white"
                        }
                    }}
                    InputProps={{
                        style: {
                            color: "white"
                        }
                    }}
                />
            </div>
            <div>
                <TextField
                    label="Interests"
                    multiline
                    rows={4}
                    value={interests}
                    onChange={handleInterestsChange}
                    InputLabelProps={{
                        style: {
                            color: "white"
                        }
                    }}
                    InputProps={{
                        style: {
                            color: "white"
                        }
                    }}
                />
            </div>
                <div>
                    <Button variant="contained" color="primary" onClick={handleSave} style={{ color: 'white' }}>
                        Save
                    </Button>
                </div>
                <div>
                    <Button variant="contained" color="secondary" style={{ color: 'white' }}>
                        Dislike
                    </Button>
                    <Button variant="contained" color="primary" style={{ color: 'white' }}>
                        Like
                    </Button>
                </div>

        </div>
        </div>
    );
};

export default Profile;

// button text is not coming out white...
