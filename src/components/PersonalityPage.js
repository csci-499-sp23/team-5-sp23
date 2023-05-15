import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Personality-Page.css";

const questions = [
  {
    category: "romantic",
    text: "Do you believe in love at first sight?",
  },
  {
    category: "romantic",
    text: "Do you like receiving gifts and messages from a person that you like",
  },
  {
    category: "romantic",
    text: "Do you like grand romantic gestures?",
  },
  {
    category: "romantic",
    text: "Do you romanticize being in a relationship with someone that you like?",
  },
  {
    category: "romantic",
    text: "Do you believe in soulmates?",
  },
  {
    category: "adventurous",
    text: "Do you enjoy traveling to new places?",
  },
  {
    category: "adventurous",
    text: "Do you enjoy trying new things?",
  },
  {
    category: "adventurous",
    text: "Are you comfortable with taking risks?",
  },
  {
    category: "adventurous",
    text: "Do you enjoy extreme sports?",
  },
  {
    category: "adventurous",
    text: "Do you enjoy being in nature?",
  },
  {
    category: "cultural",
    text: "Do you enjoy visiting museums and art galleries?",
  },
  {
    category: "cultural",
    text: "Do you enjoy learning about history and different cultures?",
  },
  {
    category: "cultural",
    text: "Do you enjoy attending cultural events and festivals?",
  },
  {
    category: "cultural",
    text: "Do you enjoy trying different types of cuisine?",
  },
  {
    category: "cultural",
    text: "Do you enjoy learning new languages?",
  },
  {
    category: "outdoor",
    text: "Do you enjoy going on walks?",
  },
  {
    category: "outdoor",
    text: "Do you enjoy hiking and camping?",
  },
  {
    category: "outdoor",
    text: "Do you enjoy playing outdoor sports?",
  },
  {
    category: "outdoor",
    text: "Do you enjoy gardening?",
  },
  {
    category: "outdoor",
    text: "Do you enjoy outdoor adventures such as zip lining or rock climbing?",
  },
];

function PersonalitySurvey() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [romantic, setRomantic] = useState(0);
  const [adventurous, setAdventurous] = useState(0);
  const [cultural, setCultural] = useState(0);
  const [outdoor, setOutdoor] = useState(0);
  const [personalityType, setPersonalityType] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const resetSurvey = () => {
    setCurrentQuestionIndex(0);
    setRomantic(0);
    setAdventurous(0);
    setCultural(0);
    setOutdoor(0);
    setPersonalityType("");
    setIsCompleted(false);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Profile-Page");
  };

  const handleAnswer = (answer) => {
    const currentCategory = questions[currentQuestionIndex].category;

    if (answer) {
      switch (currentCategory) {
        case "romantic":
          setRomantic(romantic + 1);
          break;
        case "adventurous":
          setAdventurous(adventurous + 1);
          break;
        case "cultural":
          setCultural(cultural + 1);
          break;
        case "outdoor":
          setOutdoor(outdoor + 1);
          break;
        default:
          break;
      }
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // Survey is complete, determine personality type
      let highestScore = Math.max(romantic, adventurous, cultural, outdoor);

      if (highestScore === romantic) {
        setPersonalityType("Romantic");
      } else if (highestScore === adventurous) {
        setPersonalityType("Adventurous");
      } else if (highestScore === cultural) {
        setPersonalityType("Cultural");
      } else {
        setPersonalityType("Outdoor");
      }

      setIsCompleted(true);
    }
  };

  const handleRandomize = () => {
    const personalityTypes = ["Romantic", "Adventurous", "Cultural", "Outdoor"];
    const randomIndex = Math.floor(Math.random() * personalityTypes.length);
    setPersonalityType(personalityTypes[randomIndex]);
    setIsCompleted(true);
  };

  // Render survey questions and handle answers
  if (!isCompleted) {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div className="quizBody">

        <h1>Personality Survey</h1>

        <p>{currentQuestion.text}</p>
        
        <div class="button-container">
          <button onClick={() => handleAnswer(true)}>
            Yes
          </button>
          <button onClick={() => handleAnswer(false)}>
            No
          </button>
        </div>


        <button onClick={handleRandomize}>Randomize Result</button>


      </div>
    );
  } else {
    return (
      <div className="quizBody">

        <h1>Your Result!</h1>
        <p>Your personality type is:
          <br />
          {personalityType}</p>
        <button onClick={handleClick}>Save Your Result!</button>
        <button onClick={resetSurvey} 
        style={{
          backgroundColor: '#efefef',
          color: '#312E29',
        }}>
        Restart Survey</button>

      </div>
    );
  }
}

export default PersonalitySurvey;
