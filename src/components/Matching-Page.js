import './css/matchupStyles.css'

import React, { useState } from 'react';

const Match = ({ match }) => {
  return (
    <div>
      <h3>{match.name}</h3>
      <p>{match.age} years old</p>
      <p>Location: {match.location}</p>
      <p>Interests: {match.interests.join(', ')}</p>
    </div>
  );
};

const MatchList = ({ matches }) => {
  return (
    <div>
      {matches.map((match) => (
        <Match key={match.id} match={match} />
      ))}
    </div>
  );
};

const MatchingFunction = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [matches, setMatches] = useState([]);

  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const findMatches = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();
      const matchedUsers = data.filter((user) => {
        const userInterests = user.interests;
        return selectedInterests.every((interest) =>
          userInterests.includes(interest)
        );
      });
      setMatches(matchedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Find your match</h2>
      <div>
        <h4>Select your interests:</h4>
        <button onClick={() => handleInterestClick('music')}>
          Music
        </button>
        <button onClick={() => handleInterestClick('sports')}>
          Sports
        </button>
        <button onClick={() => handleInterestClick('travel')}>
          Travel
        </button>
        <button onClick={() => handleInterestClick('hiking')}>
          Hiking
        </button>
        <button onClick={() => handleInterestClick('reading')}>
          Reading
        </button>
        <button onClick={() => handleInterestClick('cooking')}>
          Cooking
        </button>
        <button onClick={() => handleInterestClick('art')}>
          Art
        </button>
        <button onClick={() => handleInterestClick('movies')}>
          Movies
        </button>
        <button onClick={() => handleInterestClick('yoga')}>
          Yoga
        </button>
      </div>
      <button onClick={findMatches}>Find Matches</button>
      {matches.length > 0 && <MatchList matches={matches} />}
    </div>
  );
};

export default MatchingFunction;
