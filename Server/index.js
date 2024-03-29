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

const path = require('path');
const fs = require('fs');


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

// app.get('/material-content', (req, res) => {
//     const { filePath } = req.query;

//     // Check if filePath is provided
//     if (!filePath) {
//         return res.status(400).json({ error: 'File path is required' });
//     }

//     // Construct the absolute path to the file
//     const absoluteFilePath = path.join(__dirname, filePath);
//     console.log(absoluteFilePath);
//     // Check if the file exists
//     if (!fs.existsSync(absoluteFilePath)) {
//         return res.status(404).json({ error: 'File not found' });
//     }

//     // Read the content of the file
//     fs.readFile(absoluteFilePath, (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to read file' });
//         }
//         res.setHeader('Content-Type', 'image/jpeg');
//         // Send the file content as the response
//         res.status(200).send(data);
//     });
// });

app.post('/register', (req, res) => {
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


                            .catch(err => res.json(err))

                    }

                    ).catch(err => res.json(err))
           }
        })

})
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
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return res.json({ error: "Internal Server Error" });
                    }
                    if (result) {
                        // Passwords match
                        const token = jwt.sign({ email: req.body.email, role: req.body.role,staffId:user._id }, "jwt-access-key", { expiresIn: '60m' });
                        const refreshtoken = jwt.sign({ email: req.body.email, role: req.body.role }, "jwt-refresh-key", { expiresIn: '60m' });
                        res.cookie('token', token, { httpOnly: true }, { maxAge: 60000 });
                        res.cookie('refreshtoken', refreshtoken, { httpOnly: true, maxAge: 60000, secure: true, sameSite: 'strict' });
                        
                        return res.json({ status: "Success", role: user.role,staffId:user._id });
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

//remove student added to particular course

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