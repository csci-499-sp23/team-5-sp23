import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./css/PersonalityPage.css";
import math from "math";

const questions = [
  {
    questionText:
      "Do you enjoy spending time with a large group of people or prefer one-on-one interactions?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "When presented with a new project, do you tend to focus on the big picture or the details?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "Do you prefer to make decisions based on logic or your personal values and beliefs?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "Would you rather spend a quiet evening at home or go out and explore new places?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "Are you more likely to trust your instincts or rely on the advice of others?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "Do you prefer a strict routine or a more flexible approach to your daily life?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText: "Are you naturally more introverted or extroverted?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "When faced with a difficult problem, do you prefer to brainstorm solutions alone or with a group?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "Do you prefer to plan everything in advance or take things as they come?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText: "Are you more likely to follow your heart or your head?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText: "Do you tend to see the big picture or focus on the details?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "Do you prefer a career that involves working with people or working with things?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText: "Do you enjoy spending time alone or with others?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText: "Do you prefer to take risks or play it safe?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "When faced with a difficult decision, do you rely more on your intuition or analysis?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "Do you prefer to focus on the present or plan for the future?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "Do you enjoy exploring new ideas or sticking with tried-and-true methods?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText: "Are you naturally more spontaneous or methodical?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "Do you prefer to work on one task at a time or multiple tasks simultaneously?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
  {
    questionText:
      "Are you more likely to make decisions based on emotion or reason?",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
];

const mbtiTypes = {
  "ISTJ": 
  {
    description: "Practical and logical, with a focus on order and structure.",
    weights: {'I': 2, 'S': 2, 'T': 2, 'J': 2}
  },
  "ISFJ":
  {
    description:
    "Warm and responsible, with a focus on tradition and stability.",
    weights: {'I': 2, 'S': 2, 'F': 2, 'J': 2} 
  },
  "INFJ":
  {
    description:
    "Insightful and compassionate, with a focus on understanding and harmony.",
    weights: {'I': 2, 'N': 2, 'F': 2, 'J': 2} 
  },
  "INTJ":
  {
    description:
    "Strategic and analytical, with a focus on long-term vision and planning.",
    weights: {'I': 2, 'N': 2, 'T': 2, 'J': 2} 
  },
  "ISTP":
  {
    description: "Bold and practical, with a focus on action and results.",
    weights: {'I': 2, 'S': 2, 'T': 2, 'P': 2} 
  },
  "ISFP":
  {
    description:
    "Creative and sensitive, with a focus on aesthetics and values.",
    weights: {'I': 2, 'S': 2, 'F': 2, 'P': 2} 
  },
  "INFP":
  {
    description:
    "Idealistic and empathetic, with a focus on personal growth and meaning.",
    weights: {'I': 2, 'N': 2, 'F': 2, 'P': 2} 
  },
  "INTP":
  {
    description:
    "Inventive and curious, with a focus on analysis and innovation.",
    weights: {'I': 2, 'N': 2, 'T': 2, 'P': 2} 
  },
  "ESTP":
  {
    description:
    "Energetic and adaptable, with a focus on seizing opportunities.",
    weights: {'E': 2, 'S': 2, 'T': 2, 'P': 2} 
  },
  "ESFP":
  {
    description:
    "Spontaneous and enthusiastic, with a focus on fun and excitement.",
    weights: {'E': 2, 'S': 2, 'F': 2, 'P': 2} 
  },
  "ENFP":
  {
    description:
    "Creative and enthusiastic, with a focus on possibilities and connections.",
    weights: {'E': 2, 'N': 2, 'F': 2, 'P': 2} 
  },
  "ENTP":
  {
    description:
    "Innovative and adaptable, with a focus on new ideas and challenges.",
    weights: {'E': 2, 'N': 2, 'T': 2, 'P': 2} 
  },
  "ESTJ":
  {
    description:
    "Efficient and practical, with a focus on organization and control.",
    weights: {'E': 2, 'S': 2, 'T': 2, 'J': 2} 
  },
  "ESFJ":
  {
    description:
    "Friendly and conscientious, with a focus on harmony and social connections.",
    weights: {'E': 2, 'S': 2, 'F': 2, 'J': 2} 
  },
  "ENFJ":
  {
    description:
    "Charismatic and empathetic, with a focus on inspiring and leading others.",
    weights: {'E': 2, 'N': 2, 'F': 2, 'J': 2} 
  },
  "ENTJ":
  {
    description:
    "Assertive and visionary, with a focus on strategic planning and leadership.",
    weights: {'E': 2, 'N': 2, 'T': 2, 'J': 2} 
  },
};

const dateOptions = {
  'amusement_park': {'E': 2, 'N': 1, 'F': 1, 'P': 0},
  'aquarium': {'E': 1, 'S': 1, 'T': 1, 'P': 1},
  'art_gallery': {'E': 2, 'N': 2, 'F': 2, 'P': 1},
  'bakery': {'E': 1, 'S': 1, 'F': 1, 'P': 0},
  'bar': {'E': 2, 'N': 1, 'F': 1, 'P': 2},
  'bicycle_store': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'book_store': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'bowling_alley': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'cafe': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'campground': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'casino': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'church': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'clothing_store': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'department_store': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'florist': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'gym': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'hair_care': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'library': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'meal_delivery': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'meal_takeaway': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'mosque': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'movie_rental': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'movie_theater': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'museum': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'park': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'pet_store': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'restaurant': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'shoe_store': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'shopping_mall': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'spa': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'stadium': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'synagogue': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'tourist_attraction': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'university': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
  'zoo': {'E': 1, 'S': 1, 'F': 1, 'P': 2},
}

function similarity(personality, dateOption) {
  const pChars = mbtiTypes[personality].weights;
  // const dChars = dateOption;
  const { date, ...rest } = dateOption;
  const dChars = rest;

  const dotProduct = Object.keys(pChars)
    .filter((k) => dChars[k])
    .reduce((acc, k) => acc + pChars[k] * dChars[k], 0);
  const pMagnitude = math.sqrt(Object.values(pChars).reduce((acc, v) => acc + v ** 2, 0));
  const dMagnitude = math.sqrt(Object.values(dChars).reduce((acc, v) => acc + v ** 2, 0));
  return dotProduct / (pMagnitude * dMagnitude);
}

function BestDateOption({ personality, dateOptions }) {
  if (!dateOptions) {
    return <div>No date options available.</div>;
  }
  const bestOption = dateOptions.reduce((best, option) => {
    const optionSimilarity = similarity(personality, option);
    if (optionSimilarity > best.similarity) {
      return { option, similarity: optionSimilarity };
    }
    return best;
  }, { option: null, similarity: -1 });

  return (
    <div>
      <h2>Best date option for {personality}:</h2>
      {bestOption.option && (
        <div>
          <h3>{bestOption.option.date}</h3>
          <p>Similarity score: {bestOption.similarity.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

BestDateOption.propTypes = {
  personality: PropTypes.string.isRequired,
  dateOptions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      E: PropTypes.number,
      S: PropTypes.number,
      T: PropTypes.number,
      P: PropTypes.number,
      I: PropTypes.number,
      N: PropTypes.number,
      F: PropTypes.number,
      J: PropTypes.number,
    }).isRequired,
  ).isRequired,
};


function Quiz() {
  // Define date options as an array
  const dateOptionsArray = Object.entries(dateOptions).map(([date, option]) => ({ date, ...option }));
  console.log(dateOptionsArray);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswerOptionClick = (value) => {
    setAnswers([...answers, value]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      displayResults();
    }
  };

  const displayResults = () => {
    // Calculate the total score
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);

    // Determine the dominant preference based on total score
    const dominantPreference = totalScore >= 8 ? mbtiTypes[1] : mbtiTypes[0];

    // Display the result to the user
    const result = `Your dominant preference is ${dominantPreference.type} - ${dominantPreference.description}.`;
    alert(result);
  };

  return (
    <div>
      <h1>{questions[currentQuestion].questionText}</h1>
      <div>
        {questions[currentQuestion].answerOptions.map((answerOption) => (
          <button
            key={answerOption.answerText}
            onClick={() => handleAnswerOptionClick(answerOption.value)}
          >
            {answerOption.answerText}
          </button>
        ))}
        <BestDateOption personality="ESFP" dateOptions={dateOptionsArray} />
      </div>
    </div>
  );
}

export default Quiz;
