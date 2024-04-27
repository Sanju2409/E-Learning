const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const CourseModel = require('./models/Courses')
const multer = require('multer');
const StudentCourseModel = require('./models/StudentsInCourse')
const materialModel = require('./models/storeMaterials')
const Grade=require('./models/Grade')
const path = require('path');
const fs = require('fs');
const QuizCreateModel = require('./models/QuizCreate')
const EventModel=require('./models/Meeting')
const Token=require('./models/token')
const sendEmail=require('./sendEmail')
const crypto=require('crypto')
const app = express()

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST","DELETE"],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('/uploads'))
mongoose.connect('mongodb://127.0.0.1:27017/test');




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null, './uploads'); // specify the directory where files will be uploaded
    },
    filename: function (req, file, cb) {
      return cb(null, file.originalname); // keep the original file name
    }
  });




  const upload = multer({ storage});

  app.post('/upload', upload.single('file'),async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const courseId = req.body.courseId;
    const staffId=req.body.staffId;
    const filePath=req.file.path; // Retrieve courseId from request body
    // You can now use the courseId to associate it with the uploaded file
    // if(materialModel.findOne({courseID : courseId,filePath:filePath})){
    // }else{
    //     const newMaterial=new materialModel({courseId,filePath});
    //     await newMaterial.save();
    // }




    const existingMaterial = await materialModel.findOne({ courseId: courseId,staffId:staffId, filePath: filePath });

    if (existingMaterial) {
        return res.status(400).json({ message: 'File already exists for this course' });
    }

    // File doesn't exist for this course, save it to the database
    const newMaterial = new materialModel({ courseId,staffId, filePath });
    await newMaterial.save();
    
    res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename, courseId,staffId });
});

app.post('/viewgrades',async(req,res)=>{

})



app.get('/materials',async(req,res)=>{
    const { courseId, staffId } = req.query;

    try {
        const materials = await materialModel.find({ courseId: courseId, staffId: staffId });
        res.json(materials);
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/getquizstudent',async(req,res)=>{
    const {courseId,staffId}=req.query;
    try{
        const questions=await QuizCreateModel.findOne({courseId:courseId,staffId:staffId});
        res.json(questions);
    }catch(error){
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
})
// app.post('/student-answer-quiz',async(req,res)=>{
//     const studentAnswers = req.body;

//     // Simulate evaluating the answers
//     const results = QuizCreateModel.map(question => {
//         const isCorrect = studentAnswers[question._id] === question.correctAnswerIndex;
//         return { questionId: question._id, isCorrect };
// }
// )
// }
// )
// app.post('/student-answer-quiz', async (req, res) => {
//     const studentAnswers = req.body;

//     // Simulate evaluating the answers
//     const results = QuizCreateModel.map(quiz => {
//         return quiz.questions.map(question => {
//             const isCorrect = studentAnswers[question._id] === question.correctAnswerIndex;
//             return { questionId: question._id, isCorrect };
//         });
//     }).reduce((acc, val) => acc.concat(val), []);

//     res.json(results);
// });
// app.post('/student-answer-quiz', async (req, res) => {
//     const studentAnswers = req.body;

//     try {
//         // Fetch the quiz from the database based on courseId and staffId
//         const { courseId, staffId } = studentAnswers;
//         const quiz = await QuizCreateModel.findOne({ courseId, staffId });

//         if (!quiz) {
//             return res.status(404).json({ error: 'Quiz not found' });
//         }

//         // Compare student answers with correct answers
//         const results = quiz.questions.map(question => {
//             const isCorrect = studentAnswers[question._id] === question.correctAnswerIndex;
//             return { questionId: question._id, isCorrect };
//         });

//         res.json(results);
//     } catch (error) {
//         console.error('Error verifying student answers:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// app.post('/student-answer-quiz', async (req, res) => {
//     // Your logic to handle the student's answers
//     const studentAnswers = req.body;
    
//     console.log(studentAnswers)
//     try {
//         // Fetch the quiz from the database based on courseId and staffId
//         const { courseId, staffId } = studentAnswers;
//         const quiz = await QuizCreateModel.findOne({ courseId, staffId });

//         if (!quiz) {
//             return res.status(404).json({ error: 'Quiz not found' });
//         }
//         else{
//             const results = quiz.questions.map(question => {
//                         const isCorrect = studentAnswers[question._id] === question.correctAnswerIndex;
//                         return { questionId: question._id, isCorrect };
//                     });
//                     res.json(results);
//         }

//     //     // Compare student answers with correct answers
//     //     const results = quiz.questions.map(question => {
//     //         const isCorrect = studentAnswers[question._id] === question.correctAnswerIndex;
//     //         return { questionId: question._id, isCorrect };
//     //     });

        
//     } catch (error) {
//         console.error('Error verifying student answers:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
//     return true;
//   });
app.post('/student-answer-quiz', async (req, res) => {
    // Extract studentAnswers and other required data from the request body
    const { answers, courseId, staffId } = req.body;
   
    
    try {
        // Fetch the quiz from the database based on courseId and staffId
        const quiz = await QuizCreateModel.findOne({ courseId, staffId });

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Compare student answers with correct answers
     let correctcount=0;
        const results = quiz.questions.map(question => {
            const isCorrect = answers[question._id] === question.correctAnswerIndex;
            if(isCorrect){
                correctcount++;
            }
            return { questionId: question._id, isCorrect };
        });
        const totalnoofquestions=quiz.questions.length;
        const percentage=(correctcount/totalnoofquestions*100);
        

        const response={
         
            percentage,
            totalnoofquestions,
            correctcount

        }
        res.json(response);
    } catch (error) {
        console.error('Error verifying student answers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/student-submit-quiz',async(req,res)=>{

    const{grade,percentage,totalnoofquestions,courseId,staffId,studentId}=req.body;
    try{
        Grade.create({grade:grade,percentage:percentage,courseId:courseId,staffId:staffId,studentId:studentId,totalnoofquestions:totalnoofquestions,})
    }
    catch(error){
        console.log("Error storing gardes",error);
    }
})
app.get('/checkattempted',async(req,res)=>{
    const {studentId,courseId}=req.query;
    try{
        const quizgrades=await Grade.find({studentId:studentId,courseId:courseId});
        const attempted = quizgrades.length > 0;
        res.json({ attempted: attempted });
    }
    catch(error){
        console.error('Error fetching quiz grade to display',error);
    }
})
app.get('/fetchquizgrade',async(req,res)=>{
    const {studentId,courseId}=req.query;
    try{
        const quizgrades=await Grade.find({studentId:studentId,courseId:courseId});
        res.json(quizgrades);
    }
    catch(error){
        console.error('Error fetching quiz grade to display',error);
    }
})
app.get('/fetchstudentgradeforstaff',async(req,res)=>{
    const {staffId,courseId}=req.query;
    try{
        const studentgrade=await Grade.find({staffId:staffId,courseId:courseId});
        res.json(studentgrade);
    }
    catch(error){
        console.error('Error fetching student grade to display',error);
    }
})
app.get('/studmaterials',async(req,res)=>{
    const { courseId, staffId } = req.query;

    try {
        const materials = await materialModel.find({ courseId: courseId, staffId:staffId });
        res.json(materials);
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/material-content', (req, res) => {
    const { filePath } = req.query;

    // Check if filePath is provided
    if (!filePath) {
        return res.status(400).json({ error: 'File path is required' });
    }

    // Construct the absolute path to the file
    const absoluteFilePath = path.join(__dirname, filePath);

    // Check if the file exists
    if (!fs.existsSync(absoluteFilePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    // Read the content of the file
    fs.readFile(absoluteFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read file' });
        }

        // Determine the appropriate content type based on file extension
        const contentType = getContentType(filePath);

        // Set the appropriate Content-Type header
        res.setHeader('Content-Type', contentType);

        // Send the file content as the response
        res.status(200).send(data);
    });
});





// Function to determine content type based on file extension
function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname.toLowerCase()) {
        case '.pdf':
            return 'application/pdf';
        case '.doc':
        case '.docx':
            return 'application/msword';
        case '.xls':
        case '.xlsx':
            return 'application/vnd.ms-excel';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        default:
            return 'application/octet-stream';
    }
}



app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await RegisterModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await RegisterModel.create({ name, email, password: hashedPassword, role });

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();

        console.log("User id:",user._id);
        console.log("User token:",token.token);
        const url = `http://localhost:3001/registerss/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify email", url);
        res.status(201).json({ message: "An email has been sent to your account. Please verify" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// app.post('/register', async (req, res) => {
//     const { name, email, password, role } = req.body;

//     try {
//         let user = await RegisterModel.findOne({ email: email });
//         if (user) {
//             return res.json("Already have an account");
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         user = (await RegisterModel.create({ name: name, email: email, password: hashedPassword, role: role })).save();

//         const token = await new Token({
//             userId: user._id,
//             token: crypto.randomBytes(32).toString("hex")
//         }).save();

//         const url = `http://localhost:3001/register/${user._id}/verify/${token.token}`;
//         await sendEmail(user.email, "Verify email", url);
//         res.status(201).send({message:"An email send to your account please verify"});
//         // res.json("Account created");
//     } catch (error) {
//         console.error(error);
//         res.json(error);
//     }
// });
// app.get("/:id/verify/:token",async(req,res)=>{
//    try{
//     console.log("ID:", req.params.id);
//     console.log("Token:", req.params.token);
//     const user=await RegisterModel.findOne({_id:req.params.id});
//     if(!user) return res.status(400).send({message:"Invalid link"});

//     const token=await Token.findOne({
//         userId:user._id,
//         token:req.params.token
//     });
//     if(!token) return res.status(400).send({message:"Invalid link"});
//     await RegisterModel.updateOne({_id:user._id},{verified:true});
//     await token.remove()
//     res.status(200).send({message:'Email verified succesfully'})
//    } catch(error){
//         console.log("Internal server error",error);
//    }
// });
// app.get("/registerss/:id/verify/:token", async (req, res) => {
//     // Route logic remains the same
//     try {
//         console.log("ID:", req.params.id);
//         console.log("Token:", req.params.token);
//         const user = await RegisterModel.findOne({ _id: req.params.id });
//         if (!user) return res.status(400).send({ message: "Invalid link" });

//         const token = await Token.findOne({
//             userId: user._id,
//             token: req.params.token
//         });
//         if (!token) return res.status(400).send({ message: "Invalid link" });

//         await RegisterModel.updateOne({ _id: user._id }, { verified: true });
//         // await token.remove();
//         res.status(200).send({ message: 'Email verified successfully' });
//     } catch (error) {
//         console.log("Internal server error", error);
//         res.status(500).send({ message: "Internal server error" });
//     }
// });

// app.get("/registerss/:id/verify/:token", async (req, res) => {
//     // Route logic remains the same
//     try {
//         console.log("ID:", req.params.id);
//         console.log("Token:", req.params.token);
//         const user = await RegisterModel.findOne({ _id: req.params.id });
//         if (!user) return res.status(400).send({ message: "Invalid link user" });

//         const token = await Token.findOne({
//             userId: user._id,
//             token: req.params.token
//         });
//         if (!token) return res.status(400).send({ message: "Invalid link" });

//         await RegisterModel.updateOne({ _id: user._id }, { verified: true });
//         // res.json({id:token.userId,token:token.token});
//         // res.send({id:token.userId,token:token.token});
//         // Send JSON response with success message and login URL
//         res.status(200).json({
//             message: 'Email verified successfully',
//             loginUrl: 'http://localhost:5173/login' // Change this URL to your login page URL
//         });
//     } catch (error) {
//         console.log("Internal server error", error);
//         res.status(500).send({ message: "Internal server error" });
//     }
// });
app.get("/registerss/:id/verify/:token", async (req, res) => {
    try {
        console.log("ID:", req.params.id);
        console.log("Token:", req.params.token);
        const user = await RegisterModel.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link user" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        await RegisterModel.updateOne({ _id: user._id }, { verified: true });

        // Redirect to the email verification page
        res.redirect(`http://localhost:5173/registerss/${req.params.id}/verify/${req.params.token}`);
    } catch (error) {
        console.log("Internal server error", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

// app.post('/register', async (req, res) => {
//     const { name, email, password, role } = req.body;
//     try{

//     }
//     RegisterModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 res.json("Already have an account")
//             }
//             else {
//                 bcrypt.hash(password, 10)
//                     .then(hash => {
//                         user=RegisterModel.create({ name: name, email: email, password: hash, role: role })
//                             .then(result => res.json("Account created"))


                            
//                         const token=await new Token({
//                             userId:user._id,
//                             token:crypto.randomBytes(32).toString("hex")
//                         }).save();
//                         const url='http://localhost:3001/users/{user._id}/verify/{token.token}';
//                         await sendEmail(user.email,"Verigy email",url);
//                     }

//                     ).catch(err => res.json(err))
//            }
//         })

// })
app.post('/addstaff', (req, res) => {
    const { name, email, password, role } = req.body;

    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already have an account")
            }
            else {
                bcrypt.hash(password, 10)
                    .then(hash => {
                        RegisterModel.create({ name: name, email: email, password: hash, role: role })
                            .then(result => res.json("Account created"))
                            //  .alert("Created")
                            .catch(err => res.json(err))
                    }

                    ).catch(err => res.json(err))


            }
        })

})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // Check if the user is verified
                if (!user.verified) {
                    return res.json({ error: "Email not verified" });
                }

                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return res.json({ error: "Internal Server Error" });
                    }
                    if (result) {
                        // Passwords match
                        const token = jwt.sign({ email: req.body.email, role: req.body.role, staffId: user._id }, "jwt-access-key", { expiresIn: '60m' });
                        const refreshtoken = jwt.sign({ email: req.body.email, role: req.body.role }, "jwt-refresh-key", { expiresIn: '60m' });
                        res.cookie('token', token, { httpOnly: true }, { maxAge: 60000 });
                        res.cookie('refreshtoken', refreshtoken, { httpOnly: true, maxAge: 60000, secure: true, sameSite: 'strict' });
                        
                        return res.json({ status: "Success", role: user.role, staffId: user._id,verified:true });
                    } else {
                        // Passwords don't match
                        return res.json({ error: "Incorrect password" });
                    }
                });
            } else {
                return res.json({ error: "No record existed" });
            }
        })
        .catch(err => {
            console.error("Error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        });
});


// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     RegisterModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 bcrypt.compare(password, user.password, (err, result) => {
//                     if (err) {
//                         return res.json({ error: "Internal Server Error" });
//                     }
//                     if (result) {
//                         // Passwords match
//                         const token = jwt.sign({ email: req.body.email, role: req.body.role,staffId:user._id }, "jwt-access-key", { expiresIn: '60m' });
//                         const refreshtoken = jwt.sign({ email: req.body.email, role: req.body.role }, "jwt-refresh-key", { expiresIn: '60m' });
//                         res.cookie('token', token, { httpOnly: true }, { maxAge: 60000 });
//                         res.cookie('refreshtoken', refreshtoken, { httpOnly: true, maxAge: 60000, secure: true, sameSite: 'strict' });
                        
//                         return res.json({ status: "Success", role: user.role,staffId:user._id });
//                     } else {
//                         // Passwords don't match
//                         return res.json({ error: "Incorrect password" });
//                     }
//                 });
//             } else {
//                 return res.json({ error: "No record existed" });
//             }
//         })
//         .catch(err => {
//             console.error("Error:", err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         });
// });

app.post('/Staff-Dashboard',(req,res)=>{

})
app.post('/createcourse', (req, res) => {
    const { courseName, courseId, semester } = req.body;
    const staffId=req.body.staffId;
   
    CourseModel.findOne({ staffId:staffId,courseId:courseId })
        .then(course => {
            if (course) {
               return res.json({error:"Course Id already exists"});
            }
            else {
                CourseModel.findOne({ staffId:staffId,courseName:courseName, semester:semester })
                    .then(coursewithname => {
                        if (coursewithname) {
                          return  res.json({error:"Course name already exists for this semester"});
                        }
                        else {
                             // Create a new course associated with the staff member
                            CourseModel.create({ courseName: courseName, courseId: courseId, semester: semester,staffId:staffId })
                          // return res.json({courseName:courseName,staffId:staffId})
                               .then(result => res.json("Course added  Successfully"))
                                .catch(err => res.status(500).json(err))
                        }
                    })
                    .catch(err => res.status(500).json(err))
            }
        })
        .catch(err => res.status(500).json(err))

})

app.get('/viewcourse', async (req, res) => {
    try {
        const { staffId } = req.query;
        console.log("Received staffId:", staffId); 
        let courses;
        if (staffId) {
            courses = await CourseModel.find({ staffId: staffId });
        } else {
            courses = await CourseModel.find();
        }
        res.json(courses);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/fetchstudentaddedtoCourses', async (req, res) => {
    try {
        const { staffId,courseId } = req.query;
        let studentcourses;
        if (staffId) {
            studentcourses = await StudentCourseModel.find({ staffId: staffId,courseId:courseId });
        } else {
            studentcourses = await StudentCourseModel.find();
        }
        res.json(studentcourses);
        console.log(studentcourses);
    } catch (err) {
        console.error("Error fetching studentcourses:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/student',async(req,res)=>{
try{
    const students=await RegisterModel.find({role:'student'})
    res.json(students);
}
catch(error){
    console.log("Error fetching students",error);

}
});

app.post('/AddStudentToCourse',async(req,res)=>{
    const{email,staffId,courseId}=req.body;
    console.log("Request Body:", req.body);
    try{
        StudentCourseModel.findOne({email:email,courseId:courseId})
        .then(student=>{
            if(student){
                res.json("Student already added to this course");
            }
            else{
                StudentCourseModel.create({courseId:courseId,email:email,staffId:staffId})
                .then(result=>{
                    res.json("Account created")
                //.catch(err=>res.json(err))
                })
            }
        })
    }
    catch{
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
    }
    
})
app.get('/studentcourses', async (req, res) => {
    try {
        const { studentEmail } = req.query;
        console.log("Received student email:", studentEmail); 
        const courses = await StudentCourseModel.find({ email: studentEmail }).populate('courseId');
        res.json(courses);
        console.log(courses);
    } catch (err) {
        console.error("Error fetching student courses:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete('/removestudentfromcourse',async(req,res)=>{
    const {studentEmail,courseId,staffId}=req.body;
    try{
            await StudentCourseModel.findOneAndDelete({email:studentEmail,courseId:courseId,staffId:staffId}) ;
            res.json({message:'Student removed from the course'});     
            console.log("Student removed from the course")  

    }catch(error){
        console.error('Error removing students from the course:',error);

    }
});

//create quiz
app.post('/createquiz',async(req,res)=>{
    try{
        const quiz=QuizCreateModel.create(req.body);
        res.json("Succesfull creation of quiz");
        console.log(req.body);
    }
    catch(err){
        res.json("Failed to create quiz");
    }
});



// app.get('/viewcourse',async (req,res)=>{
//     try{
//         const courses=await CourseModel.find();
//         res.json(courses);
//     }
//     catch(err){
//         console.error("Error fetching courses:",err);
//         res.status(500).json({error:'Internal server error'});
//     }
// })


const varifyUser = (req, res, next) => {
    const accesstoken = req.cookies.token;
    if (!accesstoken) {
        if (renewToken(req, res)) {
            next()
        }
    }
    else {
        jwt.verify(accesstoken, 'jwt-access-key', (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid token" })
            }
            else {
                req.email = decoded.email
                next()
            }
        })
    }
};
const renewToken = (req, res) => {
    const refreshtoken = req.cookies.refreshtoken;
    let exist = false;
    if (!refreshtoken) {
        return res.json({ valid: false, message: "No refresh token" })
    }
    else {
        jwt.verify(refreshtoken, 'jwt-refresh-key', (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid refreshtoken" })
            }
            else {
                const token = jwt.sign({ email: decoded.email, role: req.body.role }, "jwt-access-key", { expiresIn: '1m' });
                res.cookie('token', token, { httpOnly: true }, { maxAge: 60000 });
                exist = true;
            }
        })
    }
    return exist;
}
app.get('/Student-dashboard', varifyUser, (req, res) => {
    return res.json({ valid: true, message: "authorized" })
})
app.get('/addstaff', varifyUser, (req, res) => {
    return res.json({ valid: true, message: "authorized" })
})
app.get('/Staff-Dashboard', varifyUser, (req, res) => {
    return res.json({ valid: true, message: "authorized" })
})
app.listen(
    3001,
    () => {
        console.log("Server is running")
    }
) 



app.post('/change-password', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
  
    try {
      // Find the user by email
      const user = await RegisterModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Verify the old password
      const isPasswordValid = bcrypt.compare(oldPassword, user.password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid old password' });
      }
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      user.password = hashedNewPassword;
      await user.save();
  
      // Return success response
      return res.status(200).json({ message: 'Password changed successfully' });
      
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
//schedule
// app.post('/add-event/:staffId', async (req, res) => {
//     try {
//       const { title, description, startTime, endTime } = req.body;
//       const { staffId } = req.params;
  
//       // Create a new event object
//       const event = new EventModel({
//         title,
//         description,
//         startTime,
//         endTime,
//         staffId
//       });
  
//       // Save the event to the database
//       await event.save();
  
//       res.json({ success: true, message: 'Event added successfully' });
//     } catch (error) {
//       console.error('Error adding event:', error);
//       res.status(500).json({ success: false, message: 'Failed to add event' });
//     }
//   });
  
//   // Route to fetch events for a specific staff member
//   app.get('/events/:staffId', async (req, res) => {
//     try {
//       const { staffId } = req.params;
  
//       // Fetch events for the specified staffId
//       const events = await EventModel.find({ staffId });
  
//       res.json({ success: true, events });
//     } catch (error) {
//       console.error('Error fetching events:', error);
//       res.status(500).json({ success: false, message: 'Failed to fetch events' });
//     }
//   });

//schedule2
app.post('/meeting', (req, res) => {
    const { staffId } = req.query;
    const { date, time, info } = req.body;
    
    const newMeeting = new Meeting({
      staffId,
      date,
      time,
      info,
    });
  
    newMeeting.save()
      .then(() => {
        res.status(201).send('Meeting added successfully');
      })
      .catch((err) => {
        console.error('Error adding meeting:', err);
        res.status(500).send('Error adding meeting');
      });
  });
  
  app.get('/meetingfetch', (req, res) => {
    const { staffId } = req.query;
  
    Meeting.find({ staffId })
      .then((meetings) => {
        res.json({ meetings });
      })
      .catch((err) => {
        console.error('Error fetching meetings:', err);
        res.status(500).send('Error fetching meetings');
      });
  });
  