import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { UserAuth } from "../context/UserAuthContext";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import ImageSlider from "./modules/ImageSlider";
import "./css/Profile-Page.css";
import logo from "./img/logo.png";
import { Link, useNavigate } from "react-router-dom";

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
  const [mbtiType, setMbtiType] = useState(
    "No MBTI type set! Please take the test!"
  );

  const [hasImages, setHasImages] = useState(false);
  const [NoData, setData] = useState(true);
  const [paths, setPaths] = useState([]);
  const [pathsUpdated, setUpdated] = useState(false);
  const navigate = useNavigate();
  const { user } = UserAuth();
  const setInformation = (data) => {
    // Set information into useStates:
    data.name !== "" ? setName(data.name) : console.log("There is no name");
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
    data.mbtiType !== ""
      ? setMbtiType(data.mbtiType)
      : console.log("There is no MBTI type");
    setData(true);
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
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="persona logo" className="logo" />
        </Link>
      </div>

      {NoData ? (
        <h1> Hi! One moment as we prepare your information...</h1>
      ) : (
        <>
          <div className="displayProfile">
            <h1>Your Profile</h1>

            <h2>Photos:</h2>
            {hasImages ? (
              <div className="image_section">
                <ImageSlider slides={paths} />
              </div>
            ) : (
              <h1>
                You dont have any images! Please edit and upload some images!
              </h1>
            )}

            <h2>Name:</h2>
            <p>{name}</p>

            <h2>Birthdate:</h2>
            <p>{birthdate}</p>

            <h2>Location:</h2>
            <p>{location}</p>

            <h2>Bio:</h2>
            <p>{bio}</p>

            <h2>Interests:</h2>
            <p>{interests}</p>

            <h2>MBTI Type:</h2>
            <p>{mbtiType}</p>

            <button onClick={handleEditProfile}>EDIT PROFILE</button>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
