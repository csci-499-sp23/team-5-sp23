import './css/profileStyles.css';
import React, { useEffect, useState } from 'react';
//import profilePicture from './img/profile_pic_guy.jpeg';
import {  doc, getDoc } from 'firebase/firestore'; //getDocs,  collection,
import { db } from '../firebase-config';
//import { getStorage, ref, getDownloadURL } from 'firebase/storage';
//import { UserAuth } from '../context/UserAuthContext';

const Profile = () =>{

    
    //const [profile, setProfile] = useState([])
    //const {user, logout} = UserAuth();
   //const [profile_id, setID ] = useState("Add id")
   //const [single_profile, setSingleProfile] = useState("")
    //const profileCollectionRef = collection(db, 'profiles');
    //const {logoutAccount} = UserAuth();
    /*useEffect(() => {
        getProfiles();
    }, [])*/

    /*useEffect(() => {
        console.log(profile)
    }, [profile])*/

    //useEffect(() => {
    //    console.log(single_profile)
    //}, [single_profile])
//
    //const handleSubmit = (e) =>{
    //    e.preventDefault();
    //    getProfile();
    //};
//
//
    //const handleLogout = () => {
//
    //};
//
    //async function getProfile(){
    //    console.log(profile_id)
    //    const docRef = doc(db, "profiles", profile_id);
    //    const docSnap = await getDoc(docRef);
//
    //    if (docSnap.exists()) {
    //        console.log("Document data:", docSnap.data());
    //      } else {
    //        // doc.data() will be undefined in this case
    //        console.log("No such document!");
    //    }
    //};
    /*function getProfiles(){
        
        getDocs(profileCollectionRef)
            .then(response => {
                const prof = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id,

                }))
                setProfile(prof);
            })
            .catch(error => console.log(error.message))

            /*
            <div className="left_card" >
                <h1>Left Hand side</h1>
                <div>
                    <img src={profilePicture} alt='Profile'/>
                    <div className="bottom_div">
                        This is where names and additional information goes
                    </div>
                </div>
            </div>
            <div className="right_card">
                <h1>Right Side</h1>
                <h1>Get Name</h1>
                
                <div>
                    <p>Blur about user</p>
                </div>
                
            </div>
        }*/
//<p>{profile_id}</p>
//<button onClick={handleLogout}>Logout</button>
        
    return(
        <div>
            <h1>Hello</h1>
            </div>
    );
}


export default Profile;
