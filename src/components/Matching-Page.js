import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { onSnapshot, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import logo from "./img/logo.png";
import "./css/Matching-Page.css";

function Card() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
  
      const unsubscribe = onSnapshot(collection(db, 'exampleprofiles'), snapshot => (
          setPeople(snapshot.docs.map(doc => doc.data()))
        ));

    return () => {
      //cleanup
      unsubscribe();
    };
  }, []);

  return (
    //BEM
    <div className="container">
      <div className="boxMatch">
          <h1>Find Your Match</h1>
          <h2>Swipe right, if interested. Swipe left, if not.</h2>
      </div>

      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="persona logo" className="logo" />
        </Link>
      </div>

      <div className="tinderCards_cardContainer">
          {people.map(person => (
              <TinderCard
                className="swipe"
                key={person.name}
                preventSwipe={['up','down']}
              >
                <div
                  style={{ backgroundImage: `url(${person.url})`}}
                className="card">
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default Card;
