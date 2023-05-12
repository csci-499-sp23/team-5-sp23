import React, { useState } from "react";

const questions = [
  "I enjoy spending time with people.",
  "I prefer to work independently.",
  "I prefer to focus on the present moment.",
  "I often consider the consequences of my actions before making a decision.",
  "I value logic over emotions.",
  "I often daydream about the future.",
  "I am more of a big picture person than a details person.",
  "I am quick to adapt to new situations.",
  "I am more of an optimist than a pessimist.",
  "I enjoy trying new things.",
  "I am more interested in the theory behind things than the practical application.",
  "I enjoy spending time outdoors.",
  "I am a good listener.",
  "I am comfortable with change.",
  "I often take charge in group situations.",
  "I tend to stick to a routine.",
  "I am more of a go with the flow person than a planner.",
  "I prefer to express myself through writing rather than speaking.",
  "I value tradition and stability.",
  "I often reflect on my own thoughts and feelings.",
];

const options = [
  "Strongly disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly agree",
];

// const mbtiTypes = [
//   "ISTJ",
//   "ISFJ",
//   "INFJ",
//   "INTJ",
//   "ISTP",
//   "ISFP",
//   "INFP",
//   "INTP",
//   "ESTP",
//   "ESFP",
//   "ENFP",
//   "ENTP",
//   "ESTJ",
//   "ESFJ",
//   "ENFJ",
//   "ENTJ",
// ];

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
    const counts = new Map([
      ["E", 0],
      ["I", 0],
      ["S", 0],
      ["N", 0],
      ["T", 0],
      ["F", 0],
      ["J", 0],
      ["P", 0],
    ]);

    for (let i = 0; i < questions.length; i++) {
      const userAnswer = userAnswers[i];
      const typeIndex = Math.floor(i / 2);

      switch (typeIndex) {
        case 0: // E vs I
          counts.set(
            userAnswer === "Strongly agree" || userAnswer === "Agree"
              ? "E"
              : "I",
            counts.get(
              userAnswer === "Strongly agree" || userAnswer === "Agree"
                ? "E"
                : "I"
            ) + 1
          );
          break;
        case 1: // S vs N
          counts.set(
            userAnswer === "Strongly agree" || userAnswer === "Agree"
              ? "S"
              : "N",
            counts.get(
              userAnswer === "Strongly agree" || userAnswer === "Agree"
                ? "S"
                : "N"
            ) + 1
          );
          break;
        case 2: // T vs F
          counts.set(
            userAnswer === "Strongly agree" || userAnswer === "Agree"
              ? "T"
              : "F",
            counts.get(
              userAnswer === "Strongly agree" || userAnswer === "Agree"
                ? "T"
                : "F"
            ) + 1
          );
          break;
        case 3: // J vs P
          counts.set(
            userAnswer === "Strongly agree" || userAnswer === "Agree"
              ? "J"
              : "P",
            counts.get(
              userAnswer === "Strongly agree" || userAnswer === "Agree"
                ? "J"
                : "P"
            ) + 1
          );
          break;
        default:
          break;
      }
    }

    let mbtiResult = "";
    mbtiResult += counts.get("E") > counts.get("I") ? "E" : "I";
    mbtiResult += counts.get("S") > counts.get("N") ? "S" : "N";
    mbtiResult += counts.get("T") > counts.get("F") ? "T" : "F";
    mbtiResult += counts.get("J") > counts.get("P") ? "J" : "P";

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
