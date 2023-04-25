import "./css/matchupStyles.css";
import React, { useState } from 'react';

function Card() {
  const [clickDirection, setClickDirection] = useState('');
  
  const handleCardClick = (direction) => {
    setClickDirection(direction);
  }

  const handleClick = (e, direction) => {
    e.preventDefault();
    handleCardClick(direction);
    e.target.classList.add(`click-${direction}`);
    setTimeout(() => {
      e.target.classList.remove(`click-${direction}`);
    }, 500);
    console.log(clickDirection); // use clickDirection here
  }

  return (
    <div className="card">
      <h1>Card Content Here</h1>
      <div className="buttons">
        <button onClick={(e) => handleClick(e, 'left')}>Left</button>
        <button onClick={(e) => handleClick(e, 'right')}>Right</button>
      </div>
    </div>
  );
}

export default Card;



