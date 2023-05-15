import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "../context/UserAuthContext";
import "./css/Personality-Page.css";

const questions = [
  { question: "I enjoy spending time with others", type: "E" },
  { question: "I enjoy being the center of attention", type: "E" },
  {
    question: "I like to meet new people and make new friends",
    type: "E",
  },
  { question: "I prefer to spend time alone", type: "I" },
  {
    question:
      "I feel more energized when I spend time alone, rather than with other people",
    type: "I",
  },
  {
    question:
      "I prefer to have a small group of close friends, rather than a large group of acquaintances",
    type: "I",
  },
  { question: "I focus on the present rather than the future", type: "S" },
  {
    question: "I rely more on my senses than making decisions",
    type: "S",
  },
  {
    question: "I'm comfortable with routine and familiar surroundings",
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
      "When making a decision, I prioritize what makes the most logical sense over what feels right",
    type: "T",
  },
  {
    question:
      "I find myself analyzing and dissecting situations or problems in order to better understand them",
    type: "T",
  },
  {
    question:
      "When making decisions, I consider how it will impact others and their feelings",
    type: "F",
  },
  {
    question:
      "I often put the needs and feelings of others before my own when making decisions",
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
    question: "I find it difficult to stick to a schedule",
    type: "P",
  },
  { question: "I prefer to be spontaneous and adaptable", type: "P" },
  {
    question:
      "I enjoy exploring new places and trying new experiences on a whim, without much planning",
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
  // const { currentUser } = useContext(UserAuth);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [mbtiType, setMBTIType] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { user } = UserAuth();

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);

    if (questionIndex === questions.length - 1) {
      setShowResults(true);
    } else {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }
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

  const handleRandomize = () => {
    const mbtiTypes = [
      "ESTJ",
      "ESFJ",
      "ISTJ",
      "ISFJ",
      "ESTP",
      "ESFP",
      "ISTP",
      "ISFP",
      "ENTJ",
      "INTJ",
      "ENTP",
      "INTP",
      "ENFJ",
      "INFJ",
      "ENFP",
      "INFP",
    ];
    const randomIndex = Math.floor(Math.random() * mbtiTypes.length);
    const randomMBTI = mbtiTypes[randomIndex];
    setMBTIType(randomMBTI);
    setShowResults(true);
  };

  const handleRetake = () => {
    setQuestionIndex(0);
    setAnswers(Array(questions.length).fill(null));
    setShowResults(false);
  };

  const handleClick = async () => {
    const mbtiTypee = mbtiType ? mbtiType : getMBTI();
    try {
      // debugger
      const docRef = doc(db, "profiles", user.email);
      // const docRef = await addDoc(collection(db, "mbtiResults"), {
      //   mbtiType: mbtiTypee,
      //   userId: auth.currentUser.uid,
      //   timestamp: serverTimestamp(),
      // });
      // db.collection("profiles").doc(`${user.email}`).update({
      //   mbtiType: mbtiTypee
      // })
      await updateDoc(docRef, { mbtiType: mbtiTypee });

      // console.log("Document written with ID: ", docRef.id);
      navigate("/Profile-Page");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="quizBody">

      <h1>Personality Survey</h1>

      {showResults ? (
        <div style={{paddingBottom: "100px"}}>
          <p>Your MBTI type is: {mbtiType ? mbtiType : getMBTI()}</p>
          <button onClick={handleClick}
          style={{
            backgroundColor: '#efefef',
            color: '#312E29',
          }}>
            Save Result</button> <br/>
          <button onClick={handleRetake}>Retake the Survey</button>
        </div>

      ) : (

        <div style={{paddingBottom: "100px"}}>
          <p>{questions[questionIndex].question}</p>
          {options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              type="button"
              onClick={() => handleAnswerSelect(optionIndex)}
              style={{
                margin: "2px",
              }}
            >
              {option}
            </button>
          ))}
          <br />
          <button onClick={handleRandomize}
          style={{
            backgroundColor: '#efefef',
            color: '#312E29',
          }}>
            Randomize Result</button>
        </div>
      )}
    </div>
    
  );
};


// // =======
//   // Render survey questions and handle answers <--- what?
//   if (!isCompleted) {
//     const currentQuestion = questions[currentQuestionIndex];
//     return (
//       <div className="quizBody">

//         <h1>Personality Survey</h1>

//         <p>{currentQuestion.text}</p>
        
//         <div class="button-container">
//           <button onClick={() => handleAnswer(true)}>
//             Yes
//           </button>
//           <button onClick={() => handleAnswer(false)}>
//             No
//           </button>
//         </div>


//         <button onClick={handleRandomize}>Randomize Result</button>


//       </div>
//     );
//   } else {
//     return (
//       <div className="quizBody">

//         <h1>Your Result!</h1>
//         <p>Your personality type is:
//           <br />
//           {personalityType}</p>
//         <button onClick={handleClick}>Save Your Result!</button>
//         <button onClick={resetSurvey} 
//         style={{
//           backgroundColor: '#efefef',
//           color: '#312E29',
//         }}>
//         Restart Survey</button>

//       </div>
//     );
//   }
// }
// // >>>>>>> STYLING-QUIZ

export default MBTITest;
