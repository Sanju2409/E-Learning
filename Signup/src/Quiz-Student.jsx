
// // // import axios from "axios";
// // // import { useEffect, useState } from "react";
// // // import { useLocation } from "react-router-dom";


// // // function QuizStudent() {
// // //     const [questions, setQuestions] = useState([]);
// // //     const [answers, setAnswers] = useState({});
// // //     // const [submitted, setSubmitted] = useState(false);
// // //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// // //     const location = useLocation();
// // //     const courseId = location.state?.courseId;
// // //     const staffId = location.state?.staffId;

// // //     useEffect(() => {
// // //         const fetchQuiz = async () => {
// // //             try {
// // //                 const response = await axios.get('http://localhost:3001/getquizstudent', {
// // //                     params: {
// // //                         courseId: courseId,
// // //                         staffId: staffId
// // //                     }
// // //                 });
// // //                 setQuestions(response.data.questions);
// // //                 // Initialize answers object with default values
// // //                 const initialAnswers = {};
// // //                 response.data.questions.forEach(question => {
// // //                     initialAnswers[question._id] = null;
// // //                 });
// // //                 setAnswers(initialAnswers);
// // //             } catch (error) {
// // //                 console.error("Error fetching quiz:", error);
// // //             }
// // //         };
// // //         fetchQuiz();
// // //     }, [courseId, staffId]);

// // //     const handleAnswerChange = (questionId, selectedOption) => {
// // //         setAnswers(prevAnswers => {
// // //           console.log(prevAnswers); // Log the previous state
// // //           return { ...prevAnswers, [questionId]: selectedOption };
// // //         });
// // //       };
      
// // //     const goToPreviousQuestion = () => {
// // //         setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
// // //     };

// // //     const goToNextQuestion = () => {
// // //         setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1));
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         console.log("handleSubmit function called");
        
// // //         try {
// // //             console.log(answers)
// // //             // Send student's answers to backend for evaluation
// // //           const ans= await axios.post('http://localhost:3001/student-answer-quiz',{ 
// // //             answers:answers,
// // //             courseId:courseId,
// // //             staffId:staffId

// // //         }
// // //         );
// // //         console.log(ans)
// // //         const {percentage,totalnoofquestions,correctcount}=ans.data;
// // //         const message = `Overall Score: ${percentage}% ( ${correctcount} out of  ${totalnoofquestions}correct)`;
// // //       alert(message)
// // //         console.log(percentage,totalnoofquestions);

// // //             console.log("submitted quiz",ans);
// // //             // setSubmitted(true);
// // //         } catch (error) {
// // //             console.error('Error submitting quiz:', error);
// // //         }
// // //     };

// // //     return (
// // //         <div>
// // //             <h1>Quiz</h1>
// // //             {questions.map((question, index) => (
// // //                 <div key={question._id} style={{ display: index === currentQuestionIndex ? 'block' : 'none' }}>
// // //                     <h2>Question {index + 1}</h2>
// // //                     <p>{question.question}</p>
// // //                     <ul>
// // //                         {question.options.map((option, optionIndex) => (
// // //                             <li key={optionIndex}>
// // //                                 <label>
// // //                                     <input
// // //                                         type="radio"
// // //                                         name={`question-${question._id}`}
// // //                                         value={optionIndex}
// // //                                         onChange={() => handleAnswerChange(question._id, optionIndex)}
// // //                                         checked={answers[question._id] === optionIndex}

// // //                                     />
                                    
// // //                                     {option}
// // //                                 </label>
// // //                             </li>
// // //                         ))}
// // //                     </ul>
// // //                 </div>
// // //             ))}

// // //             <div>
// // //                 <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
// // //                 <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
// // //             </div>

           
// // //                 <button onClick={handleSubmit}>Submit</button>
           
           
// // //         </div>
// // //     );
// // // }

// // // export default QuizStudent;
// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // function QuizStudent() {
// //   const [questions, setQuestions] = useState([]);
// //   const [answers, setAnswers] = useState({});
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //   const location = useLocation();
// //   const courseId = location.state?.courseId;
// //   const staffId = location.state?.staffId;

// //   useEffect(() => {
// //     const fetchQuiz = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:3001/getquizstudent', {
// //           params: {
// //             courseId: courseId,
// //             staffId: staffId
// //           }
// //         });
// //         setQuestions(response.data.questions);
// //         const initialAnswers = {};
// //         response.data.questions.forEach(question => {
// //           initialAnswers[question._id] = null;
// //         });
// //         setAnswers(initialAnswers);
// //       } catch (error) {
// //         console.error("Error fetching quiz:", error);
// //       }
// //     };
// //     fetchQuiz();
// //   }, [courseId, staffId]);

// //   const handleAnswerChange = (questionId, selectedOption) => {
// //     setAnswers(prevAnswers => {
// //       return { ...prevAnswers, [questionId]: selectedOption };
// //     });
// //   };

// //   const goToPreviousQuestion = () => {
// //     setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
// //   };

// //   const goToNextQuestion = () => {
// //     setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const ans= await axios.post('http://localhost:3001/student-answer-quiz',{ 
// //         answers:answers,
// //         courseId:courseId,
// //         staffId:staffId

// //     }
// //     );
// //     const {percentage,totalnoofquestions,correctcount}=ans.data;
// //     const message = `Overall Score: ${percentage}% ( ${correctcount} out of  ${totalnoofquestions}correct)`;
// //     alert(message)
// //     } catch (error) {
// //       console.error('Error submitting quiz:', error);
// //     }
// //   };
// //   return (
// //     <div className="quiz-container container">
// //       <h1 className="text-center mb-4">Quiz</h1>
// //       <div className="question-info d-flex justify-content-between align-items-center">
// //         <span>{currentQuestionIndex + 1}</span>
// //         <span>/ {questions.length}</span>
// //       </div>
// //       <div className="question-content">
// //         <h2 className="mb-3">{questions[currentQuestionIndex]?.question}</h2>
// //         <ul className="options-list list-unstyled">
// //           {questions[currentQuestionIndex]?.options.map((option, optionIndex) => (
// //             <li key={optionIndex} className="mb-2">
// //               <label className="form-check">
// //                 <input
// //                   type="radio"
// //                   name={`question-${questions[currentQuestionIndex]?._id}`}
// //                   value={optionIndex}
// //                   onChange={() => handleAnswerChange(questions[currentQuestionIndex]?._id, optionIndex)}
// //                   className="form-check-input"
// //                   checked={answers[questions[currentQuestionIndex]?._id] === optionIndex}
// //                 />
// //                 <span className="form-check-label">{option}</span>
// //               </label>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //       <div className="button-group  justify-content-between align-items-center">
// //         <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0} className="btn btn-secondary">Previous</button>
// //         <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1} className="btn btn-secondary">Next</button>
// //       </div>
// //       <button onClick={handleSubmit} className="btn btn-primary submit-button mt-3">Submit</button>
// //     </div>
// //   );

// // }

// // export default QuizStudent;
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function QuizStudent() {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const location = useLocation();
//   const courseId = location.state?.courseId;
//   const staffId = location.state?.staffId;

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/getquizstudent', {
//           params: {
//             courseId: courseId,
//             staffId: staffId
//           }
//         });
//         setQuestions(response.data.questions);
//         const initialAnswers = {};
//         response.data.questions.forEach(question => {
//           initialAnswers[question._id] = null;
//         });
//         setAnswers(initialAnswers);
//       } catch (error) {
//         console.error("Error fetching quiz:", error);
//       }
//     };
//     fetchQuiz();
//   }, [courseId, staffId]);

//   const handleAnswerChange = (questionId, selectedOption) => {
//     setAnswers(prevAnswers => {
//       return { ...prevAnswers, [questionId]: selectedOption };
//    });
//   };

//   const goToPreviousQuestion = () => {
//     setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
//   };

//   const goToNextQuestion = () => {
//     setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const ans= await axios.post('http://localhost:3001/student-answer-quiz',{ 
//         answers:answers,
//         courseId:courseId,
//         staffId:staffId

//     }
//     );
//     const {percentage,totalnoofquestions,correctcount}=ans.data;
//     const message = `Overall Score: ${percentage}% ( ${correctcount} out of  ${totalnoofquestions}correct)`;
//     alert(message)
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//     }
//   };

//   return (
//     <div className="quiz-container container">
//       <h1 className="text-heading">Quiz</h1>
//       <div className="question-info d-flex justify-content-between align-items-center">
//         <span>{currentQuestionIndex + 1}</span>
//         <span>/ {questions.length}</span>
//       </div>
//       <div className="question-content">
//         <h2 className="mb-3">{questions[currentQuestionIndex]?.question}</h2>
//         <ul className="options-list list-unstyled">
//           {questions[currentQuestionIndex]?.options.map((option, optionIndex) => (
//             <li key={optionIndex} className="mb-2">
//               <label className="form-check">
//                 <input
//                   type="radio"
//                   name={`question-${questions[currentQuestionIndex]?._id}`}
//                   value={optionIndex}
//                   onChange={() => handleAnswerChange(questions[currentQuestionIndex]?._id, optionIndex)}
//                   className="form-check-input"
//                   checked={answers[questions[currentQuestionIndex]?._id] === optionIndex}
//                 />
//                 <span className="form-check-label">{option}</span>
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="button-group  justify-content-between align-items-center">
//         <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0} className="btn btn-secondary">Previous</button>
//         <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1} className="btn btn-secondary">Next</button>
//       </div>
//       <button onClick={handleSubmit} className="btn btn-primary submit-button mt-3">Submit</button>
//     </div>
//   );
// }

// export default QuizStudent;
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function QuizStudent() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const location = useLocation();
  const courseId = location.state?.courseId;
  const staffId = location.state?.staffId;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getquizstudent', {
          params: {
            courseId: courseId,
            staffId: staffId
          }
        });
        setQuestions(response.data.questions);
        const initialAnswers = {};
        response.data.questions.forEach(question => {
          initialAnswers[question._id] = null;
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [courseId, staffId]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers(prevAnswers => {
      return { ...prevAnswers, [questionId]: selectedOption };
   });
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ans= await axios.post('http://localhost:3001/student-answer-quiz',{ 
        answers:answers,
        courseId:courseId,
        staffId:staffId

    }
    );
    const {percentage,totalnoofquestions,correctcount}=ans.data;
    const message = `Overall Score: ${percentage}% ( ${correctcount} out of  ${totalnoofquestions}correct)`;
    alert(message)
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    

  
    <div className="quiz-container container ">
      <div className="heading-content-button">
      <h1 className="text-center text-heading">Quiz</h1>
      <div className="question-info d-flex  align-items-center">
        <span>{currentQuestionIndex + 1}</span>
        <span>/ {questions.length}</span>
      </div>
      <div className="content-button">
      <div className="question-content">
        <h2 className="mb-3">{questions[currentQuestionIndex]?.question}</h2>
        <ul className="options-list list-unstyled">
          {questions[currentQuestionIndex]?.options.map((option, optionIndex) => (
            <li key={optionIndex} className="mb-2">
              <label className="form-check">
                <input
                  type="radio"
                  name={`question-${questions[currentQuestionIndex]?._id}`}
                  value={optionIndex}
                  onChange={() => handleAnswerChange(questions[currentQuestionIndex]?._id, optionIndex)}
                  className="form-check-input"
                  checked={answers[questions[currentQuestionIndex]?._id] === optionIndex}
                />
                <span className="form-check-label">{option}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="button-group d-flex justify-content-between ">
        <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0} className="btn btn-secondary me-4">Previous</button>
        <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1} className="btn btn-secondary">Next</button>
      </div>
      </div>
      </div>
     
     
      <button onClick={handleSubmit} className="btn btn-primary submit-button">Submit</button>
    </div>
   
  );
}

export default QuizStudent;