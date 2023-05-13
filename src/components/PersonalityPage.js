import React, { useState } from "react";

const questions = [
  {
    category: "romantic",
    text: "Do you believe in love at first sight?",
  },
  {
    category: "romantic",
    text: "Would you rather receive a gift or a love letter?",
  },
  {
    category: "romantic",
    text: "Do you prefer grand romantic gestures or small meaningful ones?",
  },
  {
    category: "romantic",
    text: "Do you think physical touch is important in a romantic relationship?",
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
    text: "Do you enjoy visiting museums or art galleries?",
  },
  {
    category: "cultural",
    text: "Do you enjoy learning about history and different cultures?",
  },
  {
    category: "cultural",
    text: "Do you enjoy attending cultural events or festivals?",
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
    text: "Do you enjoy spending time outdoors?",
  },
  {
    category: "outdoor",
    text: "Do you enjoy hiking or camping?",
  },
  {
    category: "outdoor",
    text: "Do you enjoy playing outdoor sports?",
  },
  {
    category: "outdoor",
    text: "Do you enjoy gardening or farming?",
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
  const [randomized, setRandomized] = useState(false);

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
    }
  };

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * 4);
    setPersonalityType(
      ["Romantic", "Adventurous", "Cultural", "Outdoor"][randomIndex]
    );
    setRandomized(true);
  };

  const renderQuiz = () => {
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <>
        <h2>Personality Survey</h2>
        <p>{currentQuestion.text}</p>
        <div>
          <button onClick={() => handleAnswer(true)}>Yes</button>
          <button onClick={() => handleAnswer(false)}>No</button>
        </div>
        <button onClick={handleRandomize}>Randomize Result</button>
      </>
    );
  };

  const renderResult = () => {
    return (
      <>
        <h2>Personality Survey Result</h2>
        <p>Your personality type is: {personalityType}</p>
        <button onClick={handleRandomize}>Randomize Again</button>
      </>
    );
  };

  // Render survey questions and handle answers
  if (randomized) {
    return renderResult();
  } else if (personalityType) {
    return renderResult();
  } else if (currentQuestionIndex < questions.length) {
    return renderQuiz();
  } else {
    return (
      <div>
        <h2>Personality Survey</h2>
        <p>No questions found.</p>
      </div>
    );
  }
}

export default PersonalitySurvey;
