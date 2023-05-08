import React, { useState } from "react";

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

// const MBTIPersonalityTest = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);

//   const handleAnswerOptionClick = (value) => {
//     const newAnswers = [...answers];
//     newAnswers[currentQuestion] = value;
//     setAnswers(newAnswers);
//     setCurrentQuestion(currentQuestion + 1);
//   };

  const handleSubmit = () => {
    // Here you can process the answers and calculate the user's MBTI personality type
    // based on the scoring system of the test.
    console.log("Answers:", answers);

    // Calculate the total score
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);

    // Determine the dominant preference based on total score
    const dominantPreference = totalScore >= 8 ? mbtiTypes[1] : mbtiTypes[0];

    // Display the result to the user
    console.log("Your dominant preference is:", dominantPreference.type);
    console.log("Description:", dominantPreference.description);
  };

  return (
    <div className="mbti-personality-test">
      {currentQuestion < questions.length ? (
        <>
          <div className="question-text">
            {questions[currentQuestion].questionText}
          </div>
          <div className="answer-options">
            {questions[currentQuestion].answerOptions.map((option) => (
              <button
                key={option.value}
                className="answer-option"
                onClick={() => handleAnswerOptionClick(option.value)}
              >
                {option.answerText}
              </button>
            ))}
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </>
      ) : (
        <div className="result-text">Survey Completed!</div>
      )}
    </div>
  );
};

export default MBTIPersonalityTest;
