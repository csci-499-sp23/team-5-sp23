import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import ImageSlider from "./modules/ImageSlider";
import { useNavigate } from "react-router-dom";
import "./css/Profile-Page.css";
// import logo from "./img/logo.png";
// import { Link } from "react-router-dom";

const PartnerProfile = () => { 
  const [partnerEmail, setPartnerEmail] = useState(undefined);
  const [hasImages, setHasImages] = useState(false);
  const [NoData, setData] = useState(true);
  const [paths, setPaths] = useState([]);
  const [pathsUpdated, setUpdated] = useState(false);
  const [information, setInformation] = useState([]);
  const navigate = useNavigate();

    //SET UP STATE HOOKS FOR PARTNER INFORMATION

  useEffect(() => {
    // retrieve data from local storage
    const storedPEmail = localStorage.getItem('pEmail');
    if (storedPEmail) {
      // parse the JSON string to get the data
      const pEmailData = JSON.parse(storedPEmail);
      // set the state variable with the retrieved data
      setPartnerEmail(pEmailData);
    }
  }, [partnerEmail]);

  useEffect(() => {
    const getFirestoreInformation = async () => {
      //get Firestore document
      const docRef = doc(db, "profiles", partnerEmail);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setInformation(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    const getStorageImages = async () => {
      // get images from storage
      const pathReferences = ref(storage, `${partnerEmail}/`);
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
  }, [pathsUpdated, partnerEmail]);

  const handleBack = () => {
    navigate("/Matching-Page");
  };

  return (
    <>
    
      {/* <div className="logo-container">
        <Link to="/">
            <img src={logo} alt="persona logo" className="logo" />
        </Link>
      </div>   */}

      
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
            <p>{information.name}</p>
              
            <h2>Birthdate:</h2>
            <p>{information.birthdate}</p>
          
            <h2>Location:</h2>
            <p>{information.location}</p>
                
            <h2>Bio:</h2>
            <p>{information.bio}</p>
          
            <h2>Interests:</h2>
            <p>{information.interests}</p>

            <h2>MBTI Type:</h2>
            <p>{information.mbtiType}</p>

            <button onClick={handleBack}>GO BACK TO MATCHING!</button>
          </div>
        </>
      )}

    </>
  );
};

export default PartnerProfile;