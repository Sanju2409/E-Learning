const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const CourseModel = require('./models/Courses')
const StudentCourseModel = require('./models/StudentsInCourse')


const app = express()

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
mongoose.connect('mongodb://127.0.0.1:27017/test');

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




// app.post('/createcourse', (req, res) => {
//     const { courseName, courseId, semester } = req.body;
//     CourseModel.findOne({ courseId:courseId })
//         .then(course => {
//             if (course) {
//                 return res.json({error:"Course Id already exists"});
//             }
//             else {
//                 CourseModel.findOne({ courseName:courseName, semester:semester })
//                     .then(coursewithname => {
//                         if (coursewithname) {
//                             return res.json({error:"Course name already exists for this semester"});
//                         }
//                         else {
//                             CourseModel.create({ courseName: courseName, courseId: courseId, semester: semester })
                               
//                                 return res.json({error:"Created succesfully"})
//                                 .catch(err => res.status(500).json(err))
//                         }
//                     })
//                     .catch(err => res.status(500).json(err))
//             }
//         })
//         .catch(err => res.status(500).json(err))

// })
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