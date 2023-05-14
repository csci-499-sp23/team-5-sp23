import React, { useState } from "react";

const questions = [
  { question: "I enjoy spending time with others", type: "E" },
  { question: "Do you enjoy being the center of attention?", type: "E" },
  {
    question: "Do you like to meet new people and make new friends?",
    type: "E",
  },
  { question: "I prefer to spend time alone", type: "I" },
  {
    question:
      "Do you feel more energized when you spend time alone, rather than with other people?",
    type: "I",
  },
  {
    question:
      "Do you prefer to have a small group of close friends, rather than a large group of acquaintances?",
    type: "I",
  },
  { question: "I focus on the present rather than the future", type: "S" },
  {
    question:
      "Do you rely more on your senses or your intuition when making decisions?",
    type: "S",
  },
  {
    question:
      "Are you comfortable with routine and familiar surroundings, or do you prefer novelty and change?",
    type: "S",
  },
  {
    question: "I am often guided by my intuition and gut feelings.",
    type: "N",
  },
  { question: "I focus on the future rather than the present", type: "N" },
  {
    question:
      "I like to explore new and untested ideas even if they are not yet proven.",
    type: "N",
  },
  { question: "I make decisions based on logic and reason", type: "T" },
  {
    question:
      "When making a decision, do you prioritize what makes the most logical sense over what feels right?",
    type: "T",
  },
  {
    question:
      "Do you often find yourself analyzing and dissecting situations or problems in order to better understand them?",
    type: "T",
  },
  {
    question:
      "When making decisions, do you consider how it will impact others and their feelings?",
    type: "F",
  },
  {
    question:
      "Do you often put the needs and feelings of others before your own when making decisions?",
    type: "F",
  },
  { question: "I make decisions based on feelings and emotions", type: "F" },
  {
    question:
      "I like to make plans and stick to them, rather than changing them on a whim.",
    type: "J",
  },
  {
    question:
      "I feel more comfortable when things are settled and decided, rather than left open-ended.",
    type: "J",
  },
  { question: "I like to plan and organize my life", type: "J" },
  {
    question: "Do you find it difficult to stick to a schedule or routine?",
    type: "P",
  },
  { question: "I prefer to be spontaneous and adaptable", type: "P" },
  {
    question:
      "Do you enjoy exploring new places and trying new experiences on a whim, without much planning or preparation?",
    type: "P",
  },
];

const options = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

const MBTITest = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const getScore = (type) => {
    return answers.reduce((score, answer, index) => {
      const question = questions[index];
      if (question.type === type) {
        return score + (answer - 2);
      }
      return score;
    }, 0);
  };

  const getMBTI = () => {
    const E = getScore("E") >= 0 ? "E" : "I";
    const S = getScore("S") >= 0 ? "S" : "N";
    const T = getScore("T") >= 0 ? "T" : "F";
    const J = getScore("J") >= 0 ? "J" : "P";
    return E + S + T + J;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mbti = getMBTI();
    alert(`Your MBTI is: ${mbti}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          {options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                name={`question${index}`}
                value={optionIndex}
                checked={answers[index] === optionIndex}
                onChange={() => handleAnswerSelect(index, optionIndex)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MBTITest;
