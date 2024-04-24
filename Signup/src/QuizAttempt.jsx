// import { useState } from "react";
// import JoinScreen from "./JoinScreen";
// import QuizScreen from "./QuizScreen";


// function QuizAttempt() {
//     const [isQuizStarted, setIsQuizStarted] = useState(false);
//     return (
//         <>
//             <div className="QuizAttempt">
//                 {
//                     isQuizStarted ? (
//                         <QuizScreen retry={() => setIsQuizStarted(false)} />
//                     ) : (
//                         <JoinScreen start={() => setIsQuizStarted(true)} />
//                     )
//                 }
//             </div>
//         </>

//     );
// }
// export default QuizAttempt;
import  { useState, useEffect } from 'react';
import axios from 'axios';

const QuizPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Fetch quiz data from backend when the component mounts
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/quiz'); // Replace '/api/quiz' with your actual API endpoint
        setQuizData(response.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleSubmit = async () => {
    try {
      // Send student's answers to backend for evaluation
      await axios.post('/api/submit-quiz', answers); // Replace '/api/submit-quiz' with your actual API endpoint
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <div>
      <h1>Quiz</h1>
      {quizData.map((question) => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          <ul>
            {question.options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={index}
                    onChange={() => handleAnswerChange(question.id, index)}
                    checked={answers[question.id] === index}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!submitted && (
        <button onClick={handleSubmit}>Submit</button>
      )}
      {submitted && <p>Quiz submitted successfully!</p>}
    </div>
  );
};

export default QuizPage;
