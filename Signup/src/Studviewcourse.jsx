import { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import './App.css'
import './studviewcourse.css';
import axios from "axios";
function Studviewcourse() {

//     const location = useLocation();
//     const userEmail = location.state?.userEmail;
//     const [courses] = useState([
//         { id: 1, name: 'Compiler Design', StudentsEnrolled: 20,instructor: 'ABC' },
//         { id: 2, name: 'Mobile App Development', StudentsEnrolled: 30,instructor: 'ABC' },
//         { id: 3, name: 'Machine Learning ', StudentsEnrolled: 40,instructor: 'ABC' },
//     ]);

//     const handleAddStudent = () => {
//         console.log("Add student to course")
//         //  setCourses(courses.map((c) => (c.id === course.id ? { ...c, Students: c.Students + 1 } : c)));
//     };

//     const handleAddMaterial = () => {
//         console.log("Add material to course")
//     };

//     const handleView = () => {
//         console.log("View course details")
//     };

//     return (
//         <div className="viewcoursediv vh-100" >
//             <nav className="navbarstaff justify-content-space-between fixed-top ">
//                 <div className="container-fluid d-flex justify-content-between">
//                     <div><p className="welcome-message">Helloo, {userEmail}!</p></div>
//                     <div>


//                         <ul className="navbar-nav-horizontal" >

                            
//                 <li className="nav-item">
//                   <Link to="/Student-dashboard" state={{ userEmail }} className="nav-link">Home</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/Studviewcourse" state={{ userEmail }} className="nav-link">View Courses</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/Announcements" state={{ userEmail }} className="nav-link">Announcements</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/Profiles" state={{ userEmail }} className="nav-link">Profile</Link>
//                 </li>
//                         </ul>
//                     </div>


//                 </div>
//             </nav>
//             <div className="course-list " style={{marginTop:'100px'}}>
//                 <h2 className="course-list-title" >Course List</h2>
//                 <div className="course-cards-container">
//         {courses.map((course) => (
//           <div key={course.id} className="course-card">
//             {/* <img src={course.imageUrl} alt={course.name} className="course-image" /> */}
//             <div className="course-info">
//               <h3 className="course-title">{course.name}</h3>
//               <p className="course-description">Students Enrolled: {course.StudentsEnrolled}</p>
//               <button className="view-button" onClick={() => handleView(course)}>View</button>
//             </div>
//           </div>
//         ))}
//       </div>
//             </div>
//         </div>
//     )
// }
// export default Studviewcourse;

const location = useLocation();
    const userEmail = location.state?.userEmail;
    const [studentCourses, setStudentCourses] = useState([]);

    useEffect(() => {
        const fetchStudentCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/studentcourses', {
                    params: {
                        studentEmail: userEmail,
                    },
                });
                setStudentCourses(response.data);
            } catch (error) {
                console.error('Error fetching student courses:', error);
            }
        };
        
        fetchStudentCourses();
        
    }, [userEmail]);


    return (
        <div className="viewcoursediv vh-100">
            <nav className="navbarstaff justify-content-space-between fixed-top">
                <div className="container-fluid d-flex justify-content-between">
                    <div>
                        <p className="welcome-message">Hello, {userEmail}!</p>
                    </div>
                    <div>
                        <ul className="navbar-nav-horizontal">
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
            <div className="course-list" style={{ marginTop: '100px' }}>
                <h2 className="course-list-title">Course List</h2>
                <div className="course-cards-container">
                    {studentCourses.map((course) => (
                        <div key={course.courseId} className="course-card">
                            <div className="course-info">
                                <h3 className="course-title">{course.courseId}</h3>
                                {/* <p className="course-description">Instructor: {course.instructor}</p>
                                <p className="course-description">Students Enrolled: {course.StudentsEnrolled}</p> */}
                                {/* <button className="view-button" type="button" onClick={() => handleViewMaterials(course.courseId)}>View Materials</button> */}
                                <Link to="/Stud_view_materials" style={{textDecoration:'none',color:'inherit'}}  state={{ userEmail, courseId:course.courseId,staffId:course.staffId}} className="view-button">
                                {/* <Link to={{ pathname: "/Stud_view_materials", state: { courseId: course.courseId } }} className="view-button"> */}
                                View Materials
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Studviewcourse;

