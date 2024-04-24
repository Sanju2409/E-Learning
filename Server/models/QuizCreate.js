const mangoose=require('mongoose')
const QuizCreateSchema=new mangoose.Schema({
title:{
    type:String,
    required:true
},
questions:[{
    question:{
        type:String,
        required:true
    } , 
    options: [{
        type:String,
        required:true
    }],
    correctAnswerIndex:{
        type:Number,
        required:true
    }
}],
courseId:String,
staffId:String

});
const QuizCreateModel=mangoose.model('Quiz',QuizCreateSchema);
module.exports=QuizCreateModel
