import React, { useState } from "react";

const questions = [
  "I prefer spending time alone to being with a group of people.",
"I am very organized and like to plan everything in advance.",
"I find it easy to express my emotions to others.",
"I am a very logical person and rely on facts rather than feelings.",
"I am often the life of the party and enjoy being the center of attention.",
"I am very detail-oriented and notice small things that others might miss.",
"I enjoy trying new things and taking risks.",
"I am a very empathetic person and am able to understand how others are feeling.",
"I prefer to have a few close friends rather than a large group of acquaintances.",
"I am very competitive and like to win.",
"I often daydream and enjoy using my imagination.",
"I am very decisive and make decisions quickly.",
"I prefer to stick to a routine and don't like surprises.",
"I am very sensitive to criticism and take it to heart.",
"I am a very outgoing person and enjoy meeting new people.",
"I am a very analytical person and enjoy solving complex problems.",
"I am very spontaneous and enjoy going with the flow.",
"I am very goal-oriented and always have a clear idea of what I want to achieve.",
"I am very patient and able to stay calm under pressure.",
"I prefer to spend my free time alone rather than with others.",
];

const options = ["True", "False"];

const mbtiTypes = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];

const MBTITest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswerSelection = (answerValue) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = answerValue;
    setUserAnswers(updatedAnswers);
    setCurrentQuestion(currentQuestion + 1);
  };

  const calculateMBTI = () => {
    const result = new Array(8).fill(0); // Array to store the counts of E, I, S, N, T, F, J, P

    for (let i = 0; i < questions.length; i++) {
      const userAnswer = userAnswers[i];
      const typeIndex = i % 8; // The index for each pair of questions

      if (userAnswer === "True") {
        result[typeIndex] += 1;
      } else {
        result[typeIndex + 1] += 1;
      }
    }

    let mbtiResult = "";
    for (let i = 0; i < result.length; i += 2) {
      if (result[i] > result[i + 1]) {
        mbtiResult += mbtiTypes[i / 2].charAt(0);
      } else {
        mbtiResult += mbtiTypes[i / 2].charAt(1);
      }
    }

    return mbtiResult;
  };

  return (
    <div>
      {currentQuestion < questions.length ? (
        <div>
          <h2>{questions[currentQuestion]}</h2>
          {options.map((option) => (
            <button key={option} onClick={() => handleAnswerSelection(option)}>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2>Your MBTI result is:</h2>
          <p>{calculateMBTI()}</p>
        </div>
      )}
    </div>
  );
};

export default MBTITest;
