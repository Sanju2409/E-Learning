//import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './signup';
import Login from './login';
//import Dashboard from './';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Dashboard from './Dashboard';
//import PrivateRoute from './PrivateRoute';
//import { AuthProvider } from './context/AuthProvider';
// import AddStaff from './AddStaff';
// import StudentsDashboard from './Student-dashboard.jsx'; 
import StaffDashboard from './Staff-Dashboard'; 
import ViewCourse from './view-course';
import CreateCourse  from './create-course';

import Profile from './Profile.jsx';
import Profiles from './Profiles.jsx';
import Home from './home.jsx';
import Navigation from './Navbar.jsx';
import Footer from './footer.jsx';
import Studviewcourse from './Studviewcourse.jsx';
import Announcements from './Announcements.jsx';
import StudViewMaterials from './Stud_view_materials.jsx';
import UploadMaterialPage from './AddMaterial.jsx';
import AddStudent from './AddStudent.jsx';
import View from './view.jsx'
import About from './About.jsx';
import QuizForm from './QuizCreate.jsx'
import JoinScreen  from './JoinScreen.jsx';
import QuizPage from './QuizAttempt.jsx';
import QuizStudent from './Quiz-Student.jsx';
import GradeView from './GradeView.jsx';
import GradeViewByStaff from './GradeViewByStaff.jsx';
import EmailVerify from './EmailVerify.jsx';
import StudentDashboard from './Student-dashboard.jsx';
// import AddStaff from './AddStaff';
import AddStaffRegister from './AddStaffRegister.jsx';
import Lead from './lead.jsx';
import AdminDashboard from './AdminDashboard.jsx';
// import EmailVerify from './EmailVerify.jsx';
// import QuizAttempts from './QuizAttempts.jsx';
// import EmailVerify from './EmailVerify.jsx'
function App() {
  // const user=localStorage.getItem("token");
  return (
  
    <Router>
    
        <Routes>
          <Route path='admindashboard' element={<AdminDashboard/>}/>
          <Route path='lead' element={<Lead/>}/>
        <Route path="/registerss/:id/verify/:token" element={<EmailVerify/>}/>
        {/* <Route path="/registerss/:id/verify/:token" element={<EmailVerify />} /> */}


          {/* <Route path="/EmailVerify" element={<EmailVerify/>}/> */}
        <Route path="/Navbar" element={<Navigation/>} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addStaffRegister" element={<AddStaffRegister/>}/>
          
          <Route path="/home" element={<Home />} />
          <Route path="/About" element={<About/>}/>
  
          <Route path="/footer" element={<Footer />} />
          
          {/* <Route path="/Student-dashboard" element={<StudentsDashboard />} /> */}
          <Route path="/Student-dashboard" element={<StudentDashboard/>}/>
          <Route path="/Staff-Dashboard" element={<StaffDashboard />} />
          <Route path="/Studviewcourse" element={<Studviewcourse />} />
        <Route path="/Announcements" element={<Announcements />} />
        <Route path="/Profiles" element={<Profiles />} />
        
          <Route path="/viewcourse" element={<ViewCourse/>} />
          <Route path="/createcourse" element={<CreateCourse/>} />
          <Route path="/Profile" element={<Profile/>}/>
       
          <Route path="/AddMaterial" element={<UploadMaterialPage/>} />
          <Route path="/AddStudentToCourse" element={<AddStudent/>}/>
          <Route path="/View" element={<View/>}/>
         {/* <Route path="addsStaff" element={<AddStaff/>}/> */}
          <Route path="/Stud_view_materials" element={<StudViewMaterials/>}/>
          <Route path='/QuizCreate' element={<QuizForm/>}/>
          <Route path='/JoinScreen' element={<JoinScreen/>}/>
          <Route path='/QuizPage' element={<QuizPage/>}/>
          <Route path='/QuizStudent' element={<QuizStudent/>}/>
          <Route path='/Grades' element={<GradeView/>}/>
          <Route path='/GradeViewByStaff' element={<GradeViewByStaff/>}/>
        </Routes>
      
    </Router>
  );
}

export default App;
