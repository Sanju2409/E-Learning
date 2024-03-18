const mongoose=require('mongoose')
const CourseSchema = new mongoose.Schema({
    courseName: String,
    courseId: String,
    semester: Number,
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Register' }
});

const CourseModel = mongoose.model("courses", CourseSchema);
module.exports = CourseModel;
