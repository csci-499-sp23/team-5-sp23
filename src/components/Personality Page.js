import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "YOUR_TRAITIFY_API_KEY";
const ASSESSMENT_ID = "YOUR_ASSESSMENT_ID";

const PersonalityFunct = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        `https://api.traitify.com/v1/assessments/${ASSESSMENT_ID}/questions`,
        {
          headers: {
            Authorization: `Basic ${API_KEY}:x`,
            Accept: "application/json",
          },
        }
      );
      setQuestions(response.data);
    };
    fetchQuestions();
  }, []);

  const handleResponse = (questionId, response) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: response,
    }));
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      `https://api.traitify.com/v1/assessments/${ASSESSMENT_ID}/personality`,
      {
        data: responses,
      },
      {
        headers: {
          Authorization: `Basic ${API_KEY}:x`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    // do something with the response, such as display the user's personality traits
  };

  return (
    <div>
      {questions.length > 0 ? (
        <div>
          <h2>{questions[currentQuestionIndex].text}</h2>
          <ul>
            {questions[currentQuestionIndex].options.map((option) => (
              <li key={option.id}>
                <button onClick={() => handleResponse(questions[currentQuestionIndex].id, option.id)}>
                  {option.text}
                </button>
              </li>
            ))}
          </ul>
          {currentQuestionIndex === questions.length - 1 ? (
            <button onClick={handleSubmit}>Submit</button>
          ) : (
            <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next</button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PersonalityFunct;

