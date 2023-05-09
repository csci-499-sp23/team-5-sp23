import React, { useState } from "react";
import "./css/PersonalityPage.css";

const questions = [
  {
    questionText: "You enjoy spending time alone.",
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
      "You prefer to follow a planned and organized approach in your daily life.",
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
      "You often rely on your intuition or gut feeling when making decisions.",
    answerOptions: [
      { answerText: "Strongly Disagree", value: 1 },
      { answerText: "Disagree", value: 2 },
      { answerText: "Neutral", value: 3 },
      { answerText: "Agree", value: 4 },
      { answerText: "Strongly Agree", value: 5 },
    ],
  },
];

const mbtiTypes = [
  {
    type: "ISTJ",
    description: "Practical and logical, with a focus on order and structure.",
  },
  {
    type: "ENFP",
    description:
      "Creative and enthusiastic, with a focus on possibilities and connections.",
  },
  {
    type: "ISFJ",
    description:
      "Warm and responsible, with a focus on tradition and stability.",
  },
  {
    type: "ENTP",
    description:
      "Innovative and adaptable, with a focus on new ideas and challenges.",
  },
];

function Quiz() {
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
      </div>
    </div>
  );
}

export default Quiz;
