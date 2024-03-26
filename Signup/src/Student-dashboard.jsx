// import axios from  "axios";
// import  {useEffect,useState} from 'react'
// import { useNavigate } from "react-router-dom";
// const StudentDashboard=()=>{
//     const[message,setMessage]=useState('')
//     const navigate=useNavigate()
//     axios.defaults.withCredentials=true;
//     useEffect(()=>{
//         axios.get('http://localhost:3001/Student-dashboard')
//         //.then(res=>console.log(res))
//         //.catch(err=>console.log(err))
//         .then(res=>{
//             if(res.data.valid){
//                 setMessage(res.data.message)
//             }
//             else{
//                 navigate('/')
//             }
//         })
//     })
//     return(
//         <div>
//              <h2>Student Dashboard {message}</h2>
//              <nav>
//                 <ul>
//                     <li>Home</li>
//                     <li>My Courses</li>
//                     <li>Profile</li>
//                 </ul>
//              </nav>
//         </div>
//     )
// }
// export default StudentDashboard;



















import axios from  "axios";
import  {useEffect} from 'react'
import { useNavigate,useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

const StudentDashboard=()=>{
    // const[message,setMessage]=useState('');
    const navigate=useNavigate();
  //   const [courses, setCourses] = useState([]);
  // const [courseProgress, setCourseProgress] = useState([]);
  const location=useLocation();
  const userEmail = location.state?.userEmail;
  // const [announcements, setAnnouncements] = useState([]);
  // const [profile, setProfile] = useState({});
    axios.defaults.withCredentials=true;
    useEffect(()=>{
        axios.get('http://localhost:3001/Student-dashboard')
        //.then(res=>console.log(res))
        //.catch(err=>console.log(err))
        .then(res=>{
            if(res.data.valid){
               // setMessage(res.data.message)
            }
            else{
                navigate('/')
            }
        })
    //     axios.get('http://localhost:3001/courses')
    //     .then(response => setCourses(response.data))
    //     .catch(error => console.error('Error fetching courses:', error));
    
    //   // Example: Fetch course progress
    //   axios.get('http://localhost:3001/course-progress')
    //     .then(response => setCourseProgress(response.data))
    //     .catch(error => console.error('Error fetching course progress:', error));
    
    //   // Example: Fetch announcements
    //   axios.get('http://localhost:3001/announcements')
    //     .then(response => setAnnouncements(response.data))
    //     .catch(error => console.error('Error fetching announcements:', error));
    
    //   // Example: Fetch user profile
    //   axios.get('http://localhost:3001/profile')
    //     .then(response => setProfile(response.data))
    //     .catch(error => console.error('Error fetching profile:', error));
    
    })
    return(
        <div className="staffdiv vh-100 " >
        <nav className="navbarstaff justify-content-space-between fixed-top ">
          <div className="container-fluid d-flex justify-content-between">
            <div> <p className="welcome-message">Hello, {userEmail}!</p></div>
  
  
            <div>
              <ul className="navbar-nav-horizontal" >
  
                <li className="nav-item">
                  <Link to="/Student-dashboard" state={{ userEmail }} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Studviewcourse" state={{ userEmail }} className="nav-link">View Courses</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Announcements" state={{ userEmail }} className="nav-link">Announcements</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Profiles" state={{ userEmail }} className="nav-link">Profile</Link>
                </li>
              </ul>
            </div>
  
  
          </div>
        </nav>
        </div>
          );
          
    
}
export default StudentDashboard;

