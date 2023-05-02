import "./css/matchupStyles.css";
import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import "./css/Cards.css";
import { db } from "../firebase-config";
import { onSnapshot, collection } from "firebase/firestore";
//may have this wrong

function Card() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "exampleprofiles"),
      (snapshot) => setPeople(snapshot.docs.map((doc) => doc.data()))
    );

    return () => {
      //cleanup
      unsubscribe();
    };
  }, []);

  return (
    //BEM
    <div>
      <div className="tinderCards_cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default Card;

// import TinderCard from "react-tinder-card";
// import {useEffect, useState} from "react";
// import './TinderCards.css';

// function TinderCards() {

// export default Card;

// const [clickDirection, setClickDirection] = useState('');

// const handleCardClick = (direction) => {
//   setClickDirection(direction);
// }

// const handleClick = (e, direction) => {
//   e.preventDefault();
//   handleCardClick(direction);
//   e.target.classList.add(`click-${direction}`);
//   setTimeout(() => {
//     e.target.classList.remove(`click-${direction}`);
//   }, 500);
//   console.log(clickDirection); // use clickDirection here
// }

// return (
//   <div className="card">
//     <h1>Card Content Here</h1>
//     <div className="buttons">
//       <button onClick={(e) => handleClick(e, 'left')}>Left</button>
//       <button onClick={(e) => handleClick(e, 'right')}>Right</button>
//     </div>
//   </div>
// );
