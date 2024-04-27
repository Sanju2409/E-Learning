// import { useState } from "react"
// import QuestionList from "../data/questoin.json"
// import QuizResult from "./QuizResult"
// import Question from "./Question"


// function QuizScreen(){
//     const [currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
//     const [markedAnswer,setmarkedAnswer]=useState(new Array(QuestionList.length));
//     const isQuestionEnd=currentQuestionIndex===QuestionList.length;


//     return(
//         <div>
//                 {
//                     isQuestionEnd ?(
//                         <QuizResult/>
//                     ):(
//                         <Question
//                         question={
//                             QuestionList[currentQuestionIndex]
//                         }
//                         totalQuestions={QuestionList.length}
//                         currentQuestionIndex={currentQuestionIndex+1}
//                         setAnswer={(index)=>{
//                             setmarkedAnswer((arr)=>{
//                                 let newArr=[...arr];
//                                 newArr[currentQuestionIndex]=index;
//                                 return newArr;

//                             });
//                             setCurrentQuestionIndex(currentQuestionIndex+1);
//                         }}

//                         />
//                     )
//                 }
//         </div>
//     )
// }