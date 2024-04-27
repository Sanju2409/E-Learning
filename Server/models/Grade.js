const mongoose=require('mongoose');
const gradeschema=new mongoose.Schema({
    grade:Number,
    percentage:Number,
    totalnoofquestions:Number,
    courseId:String,
    staffId:String,
    studentId:String



})
const Grade = mongoose.model('Grade', gradeschema);
module.exports=Grade;