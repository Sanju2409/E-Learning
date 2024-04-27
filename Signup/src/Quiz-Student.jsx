
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
  const studentId=location.state?.userEmail;
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const result=await axios.get('http://localhost:3001/checkattempted',{
          params:{
            courseId:courseId,
            studentId:studentId
          }
          
        });
        const {attempted}=result.data;
        if(attempted){
          const msg="already attempted"
          alert(msg);
        }
        else{
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
        }
        
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
    const res=await axios.post('http://localhost:3001/student-submit-quiz',{ 
      grade:correctcount,
      percentage:percentage,
      totalnoofquestions:totalnoofquestions,
      
      courseId:courseId,
      staffId:staffId,
      studentId:studentId

  });
  console.log(res);
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
        <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0} className="prev  me-4">Previous</button>
        <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1} className="prev  me-4">Next</button>
      </div>
      </div>
      </div>
     
     
      <button onClick={handleSubmit} className="prev  me-4">Submit</button>
    </div>
    
  );
}

export default QuizStudent;