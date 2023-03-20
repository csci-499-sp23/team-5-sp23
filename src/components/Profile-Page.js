<<<<<<< HEAD
import './css/profileStyles.css'
import profilePicture from './img/profile_pic_guy.jpeg'

const Profile = () =>{
    return(
        <div className="main_card">
            <div className="left_card" >
                <h1>Left Hand side</h1>
                <div>
                    <img src={profilePicture} />
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
        </div>
    );
}


export default Profile;
