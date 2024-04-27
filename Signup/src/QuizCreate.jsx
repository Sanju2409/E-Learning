
import  { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './QuizCreate.css';

const QuizForm = () => {
  const location=useLocation();
  const courseId=location.state?.courseId;
  const staffId=location.state?.staffId;
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }
  ]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(courseId);
      await axios.post("http://localhost:3001/createquiz", { title, questions,courseId,staffId });
      // Optionally, show success message or redirect
    } catch (err) {
      console.error('Error creating quiz:', err);
      // Handle error
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
    setCurrentCardIndex(currentCardIndex + 1);
  };

  const handleQuestionChange = (index, e) => {
    const value = e.target.value;
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value; // Update the question text
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const value = e.target.value;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const value = parseInt(e.target.value);
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswerIndex = value;
    setQuestions(updatedQuestions);
  };

  const goToPreviousCard = () => {
    setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
  };

  const goToNextCard = () => {
    setCurrentCardIndex(Math.min(questions.length, currentCardIndex + 1));
  };

  return (
    <div className="container-fluid mb-4 createfinal">
        <h1 className='row justify-content-center heading-quiz' >Create Quiz</h1>
      <div className=" row justify-content-center vh-100  ">
        <div className="col-md-4 vh-40">
          <div className="container-div card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb">
                  <label htmlFor="title" className="form-label fw-bold">Quiz Title:</label>
                  <input  type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="form-control" />
                </div>
                {questions.map((question, index) => (
                  <div key={index} className={index === currentCardIndex ? '' : 'd-none'}>
                    <div className="mb-1">
                      <label htmlFor={`question-${index}`} className="form-label fw-bold">Question {index + 1}:</label>
                      <input type="text" id={`question-${index}`} name={`question-${index}`} value={question.question} onChange={(e) => handleQuestionChange(index, e)} required className="form-control" />
                    </div>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="mb-1">
                        <label htmlFor={`option-${index}-${optionIndex}`} className="form-label fw-bold">Option {optionIndex + 1}:</label>
                        <input type="text" id={`option-${index}-${optionIndex}`} name={`option-${index}-${optionIndex}`} value={option} onChange={(e) => handleOptionChange(index, optionIndex, e)} required className="form-control" />
                      </div>
                    ))}
                    <div className="mb-1">
                      <label htmlFor={`correct-answer-${index}`} className="form-label fw-bold">Correct Answer:</label>
                      <select id={`correct-answer-${index}`} value={question.correctAnswerIndex} onChange={(e) => handleCorrectAnswerChange(index, e)} required className="form-select">
                        {question.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={optionIndex}>{`Option ${optionIndex + 1}`}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                <div className='btn-toolbar d-flex justify-content-between'>
                <button type="button" onClick={goToPreviousCard} className="btn btn-primary mb-0.5" disabled={currentCardIndex === 0}>Previous</button>
                <button type="button" onClick={handleAddQuestion} className="btn btn-primary mb-0.5">Add Question</button>
                <button type="button" onClick={goToNextCard} className="btn btn-primary mb-0.5" disabled={currentCardIndex === questions.length - 1}>Next</button>
                <button type="submit" className="btn btn-primary">Create Quiz</button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
