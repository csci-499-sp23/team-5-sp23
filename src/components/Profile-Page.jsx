import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { UserAuth } from "../context/UserAuthContext";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import ImageSlider from "./modules/ImageSlider";
import "./css/Profile-Page.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("No Name set! Please edit your Profile!");
  const [location, setLocation] = useState(
    "No location set! Please edit your Profile!"
  );
  const [birthdate, setBirthdate] = useState(
    "No birthdate set! Please edit your Profile!"
  );
  const [bio, setBio] = useState("No bio set! Please edit your Profile!");
  const [interests, setInterests] = useState(
    "No interests set! Please edit your Profile!"
  );
  const [hasImages, setHasImages] = useState(false);
  const [NoData, setData] = useState(true);
  const [paths, setPaths] = useState([]);
  const [pathsUpdated, setUpdated] = useState(false);
  const navigate = useNavigate();
  const { user } = UserAuth();
  const setInformation = (data) => {
    // Set information into useStates:
    data.name !== "" ? setName(UpperCase(data.name)) : console.log("There is no name");
    data.location !== ""
      ? setLocation(data.location)
      : console.log("There is no location");
    data.bio !== "" ? setBio(data.bio) : console.log("There is no bio");
    data.birthdate !== ""
      ? setBirthdate(data.birthdate)
      : console.log("There is no birthdate");
    data.interests !== ""
      ? setInterests(data.interests)
      : console.log("There is no interests");
    setData(true);
  };

  //Changes lowerCase lettering of Name to Uppercase (name is stored as lowerCase)
  const UpperCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  useEffect(() => {
    
    const getFirestoreInformation = async () => {
      //get Firestore document
      const docRef = doc(db, "profiles", user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setInformation(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    const getStorageImages = async () => {
      // get images from storage
      const pathReferences = ref(storage, `${user.email}/`);
      await listAll(pathReferences)
        .then((res) => {
          res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then((url) => {
              setPaths((prevPath) => [
                ...prevPath,
                {
                  image: url,
                },
              ]);
            });
          });
          setUpdated(true);
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log("An error has occured getting storage stuff ;(");
          console.log(error.message);
        });
    };
    const GetInformation = async () => {
      if (!pathsUpdated) {
        //get Firestore document
        await getFirestoreInformation();

        //get Storage Images
        await getStorageImages();

        //Dont render untill page elements ready
        return;
      }

      //Render site with data and pictures
      // If it has gotten here, both images and data have been received from Firebase
      setHasImages(true);
      setData(false);
    };

    GetInformation();
  }, [pathsUpdated, user]);

  const handleEditProfile = () => {
    navigate("/Profile-Page-Creation");
  };

  return (
    <>
      <button onClick={handleEditProfile}>Edit Profile</button>
      {NoData ? (
        <h1> Hi, we are getting your information.</h1>
      ) : (
        <>
          <div>
            <h2>Images:</h2>
            {hasImages ? (
              <div className="image_section">
                <ImageSlider slides={paths} />
              </div>
            ) : (
              <h1>
                You dont have any images! Please edit and upload some images!
              </h1>
            )}
          </div>
          <div>
            <h2>Name:</h2>
            <p>{name}</p>
          </div>
          <div>
            <h2>Birthdate:</h2>
            <p>{birthdate}</p>
          </div>
          <div>
            <h2>Location:</h2>
            <p>{location}</p>
          </div>
          <div>
            <h2>Bio:</h2>
            <p>{bio}</p>
          </div>
          <div>
            <h2>Interests:</h2>
            <p>{interests}</p>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
