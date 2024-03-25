const mongoose=require('mongoose')
const StudentCourse = new mongoose.Schema({
    courseId: String,
    email:String,
    staffId:String,
    
});

const StudentCourseModel = mongoose.model("StudentCourses", StudentCourse);
module.exports = StudentCourseModel
