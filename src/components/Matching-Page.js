import './css/matchupStyles.css'
import profilePicture from './img/profile_pic_guy.jpeg'
import dating_potential from './img/woman_dating.jpeg'

const Match = () => {
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
                <img src={dating_potential} />
            </div>
            
        </div>
    );
};

export default Match;