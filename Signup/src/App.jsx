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
import AddStaff from './AddStaff';
import StudentsDashboard from './Student-dashboard.jsx'; 
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
function App() {
  return (
  
    <Router>
    
        <Routes>
        <Route path="/Navbar" element={<Navigation/>} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
       
          
          <Route path="/home" element={<Home />} />
          
  
          <Route path="/footer" element={<Footer />} />
          <Route path="/Addstaff" element={<AddStaff/>} />
          <Route path="/Student-dashboard" element={<StudentsDashboard />} />
          
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
         
          <Route path="/Stud_view_materials" element={<StudViewMaterials/>}/>
        </Routes>
      
    </Router>
  );
}

export default App;
