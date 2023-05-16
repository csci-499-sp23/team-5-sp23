import React, { useState } from "react";
import "./css/PersonalityPage.css";
import { handleClick, mbtiTypes } from './modules/DateComputation.js';
import { UserAuth } from "../context/UserAuthContext";

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

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { user } = UserAuth();
  const [myValue, setMyValue] = useState('');


  const handleAnswerOptionClick = (value) => {
    
    handleClick(user.email).then((value) => {
      setMyValue(value);
    });

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
      </div>
      {/* Render the HTML returned by handleClick */}
      {myValue}
    </div>
  );
}

export default Quiz;
