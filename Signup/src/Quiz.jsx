// // import React, { useState } from 'react';

// // const QuizForm = ({ onSave }) => {
// //   const [questionText, setQuestionText] = useState('');
// //   const [answerChoices, setAnswerChoices] = useState([]);
// //   const [correctAnswer, setCorrectAnswer] = useState('');
// //   const [timeLimit, setTimeLimit] = useState('');
// //   const [passingScore, setPassingScore] = useState('');

// //   const handleAddQuestion = (e) => {
// //     e.preventDefault();
// //     const newQuestion = {
// //       questionText,
// //       answerChoices,
// //       correctAnswer,
// //     };
// //     setAnswerChoices([...answerChoices, newQuestion]);
// //     setQuestionText('');
// //     setCorrectAnswer('');
// //   };

// //   const handleSaveQuiz = (e) => {
// //     e.preventDefault();
// //     const newQuiz = {
// //       questions: answerChoices,
// //       timeLimit,
// //       passingScore,
// //     };
// //     onSave(newQuiz);
// //   };

// //   return (
// //     <form onSubmit={handleSaveQuiz}>
// //       <label>
// //         Question:
// //         <input
// //           type="text"
// //           value={questionText}
// //           onChange={(e) => setQuestionText(e.target.value)}
// //         />
// //       </label>
// //       <label>
// //         Answer Choices:
// //         <input
// //           type="text"
// //           value={answerChoices.join(', ')}
// //           onChange={(e) => setAnswerChoices(e.target.value.split(','))}
// //         />
// //       </label>
// //       <label>
// //         Correct Answer:
// //         <input
// //           type="text"
// //           value={correctAnswer}
// //           onChange={(e) => setCorrectAnswer(e.target.value)}
// //         />
// //       </label>
// //       <label>
// //         Time Limit (minutes):
// //         <input
// //           type="number"
// //           value={timeLimit}
// //           onChange={(e) => setTimeLimit(e.target.value)}
// //         />
// //       </label>
// //       <label>
// //         Passing Score:
// //         <input
// //           type="number"
// //           value={passingScore}
// //           onChange={(e) => setPassingScore(e.target.value)}
// //         />
// //       </label>
// //       <button type="submit">Save Quiz</button>
// //       <button type="button" onClick={handleAddQuestion}>
// //         Add Question
// //       </button>
// //     </form>
// //   );
// // };

// // export default QuizForm;
// import React, { useState } from 'react';

// const QuestionForm = ({ onAddQuestion }) => {
//   const [questionText, setQuestionText] = useState('');
//   const [answerChoices, setAnswerChoices] = useState(['', '', '', '']);
//   const [correctAnswer, setCorrectAnswer] = useState('');

//   const handleQuestionTextChange = (e) => {
//     setQuestionText(e.target.value);
//   };

//   const handleAnswerChoicesChange = (index, e) => {
//     const newAnswerChoices = [...answerChoices];
//     newAnswerChoices[index] = e.target.value;
//     setAnswerChoices(newAnswerChoices);
//   };

//   const handleCorrectAnswerChange = (e) => {
//     setCorrectAnswer(e.target.value);
//   };

//   const handleAddQuestion = (e) => {
//     e.preventDefault();
//     const newQuestion = {
//       questionText,
//       answerChoices,
//       correctAnswer,
//     };
//     onAddQuestion(newQuestion);
//     setQuestionText('');
//     setAnswerChoices(['', '', '', '']);
//     setCorrectAnswer('');
//   };

//   return (
//     <form onSubmit={handleAddQuestion}>
//       <label>
//         Question:
//         <input
//           type="text"
//           value={questionText}
//           onChange={handleQuestionTextChange}
//         />
//       </label>
//       {answerChoices.map((choice, index) => (
//         <label key={index}>
//           Answer Choice {index + 1}:
//           <input
//             type="text"
//             value={choice}
//             onChange={(e) => handleAnswerChoicesChange(index, e)}
//           />
//         </label>
//       ))}
//       <label>
//         Correct Answer:
//         <select value={correctAnswer} onChange={handleCorrectAnswerChange}>
//           <option value="">-- Select --</option>
//           {answerChoices.map((_, index) => (
//             <option key={index} value={index + 1}>
//               Choice {index + 1}
//             </option>
//           ))}
//         </select>
//       </label>
//       <button type="submit">Add Question</button>
//     </form>
//   );
// };

// const QuizForm = ({ onSave }) => {
//   const [quiz, setQuiz] = useState([]);
//   const [timeLimit, setTimeLimit] = useState('');
//   const [passingScore, setPassingScore] = useState('');

//   const handleAddQuestion = (newQuestion) => {
//     setQuiz((prevQuiz) => [...prevQuiz, newQuestion]);
//   };

//   const handleSaveQuiz = (e) => {
//     e.preventDefault();
//     const newQuiz = {
//       questions: quiz,
//       timeLimit,
//       passingScore,
//     };
//     onSave(newQuiz);
//   };

//   return (
//     <>
//       <h2>Quiz Form</h2>
//       <QuestionForm onAddQuestion={handleAddQuestion} />
//       <ul>
//         {quiz.map((question, index) => (
//           <li key={index}>{question.questionText}</li>
//         ))}
//       </ul>
//       <label>
//         Time Limit (minutes):
//         <input
//           type="number"
//           value={timeLimit}
//           onChange={(e) => setTimeLimit(e.target.value)}
//         />
//       </label>
//       <label>
//         Passing Score:
//         <input
//           type="number"
//           value={passingScore}
//           onChange={(e) => setPassingScore(e.target.value)}
//         />
//       </label>
//       <button type="submit" onClick={handleSaveQuiz}>
//         Save Quiz
//       </button>
//     </>
//   );
// };

// export default QuizForm;
import React, { useState } from 'react';


const QuizForm = ({ onSave }) => {
  const [questionText, setQuestionText] = useState('');
  const [answerChoices, setAnswerChoices] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [passingScore, setPassingScore] = useState('');

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const newQuestion = {
      questionText,
      answerChoices,
      correctAnswer: parseInt(correctAnswer, 10) - 1,
    };
    onSave(newQuestion);

    setQuestionText('');
    setAnswerChoices(['', '', '', '']);
    setCorrectAnswer('');
  };

  const handleAddChoice = () => {
    setAnswerChoices((prevChoices) => [...prevChoices, '']);
  };

  return (
    <div className="quiz-form-container">
      <form onSubmit={handleAddQuestion}>
        <h3>Create a new question:</h3>
        <div className="question-input-container">
          <label htmlFor="questionTextInput">Question:</label>
          <input
            id="questionTextInput"
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>
        <div className="answer-choices-container">
          {answerChoices.map((choice, index) => (
            <div className="answer-choice-input-container" key={index}>
              <label htmlFor={`answerChoice${index + 1}`}>Answer Choice {index + 1}:</label>
              <input
                id={`answerChoice${index + 1}`}
              type="text"
                value={answerChoices[index]}
                onChange={(e) => {
                  const newAnswerChoices = [...answerChoices];
                  newAnswerChoices[index] = e.target.value;
                  setAnswerChoices(newAnswerChoices);
                }}
              />
            </div>
          ))}
          <button className="add-choice-button" onClick={handleAddChoice}>
            Add Choice
          </button>
        </div>
        <div className="correct-answer-container">
          <label htmlFor="correctAnswerInput">Correct Answer:</label>
          <select
            id="correctAnswerInput"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          >
            {answerChoices.map((choice, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="quiz-settings-container">
          <div className="time-limit-container">
            <label htmlFor="timeLimitInput">Time Limit (minutes):</label>
            <input
              id="timeLimitInput"
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </div>
          <div className="passing-score-container">
            <label htmlFor="passingScoreInput">Passing Score:</label>
            <input
              id="passingScoreInput"
              type="number"
              value={passingScore}
              onChange={(e) => setPassingScore(e.target.value)}
            />
          </div>
        </div>
        <div className="form-actions-container">
          <button type="submit">Add Question</button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;