// // function Studviewcourse(){
// //     return(
// //         <div>
// //             <h1>Studviewcourse</h1>
// //         </div>
// //     )
// // }
// // export default Studviewcourse;


// import React from 'react';
// import './sviewcourse.css';


// const StudviewCourse = ({ courses, onAddToFavorites }) => (
//   <div className="view-courses-container">
//     {courses.map((course) => (
//       <div className="course-card" key={course.id}>
//         <img src={course.imageUrl} alt={course.title} className="course-image" />
//         <div className="course-info">
//           <h3 className="course-title">{course.title}</h3>
//           <p className="course-description">{course.description}</p>
//           <button
//             className="favorite-button"
//             onClick={() => onAddToFavorites(course.id)}
//           >
//             Add to Favorites
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>
// );

// export default StudviewCourse;



// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import './App.css';

// const Studviewcourse = () => {
//   const location = useLocation();
//   const userEmail = location.state?.userEmail;
//   const [courses] = useState([
//     { id: 1, name: 'Data Structures' },
//     { id: 2, name: 'Operating System' },
//     { id: 3, name: 'Database Management System' },
//   ]);

//   return (
//     <div className="student-dashboard">
//       <nav className="navbar">
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <Link to="/student-dashboard" className="nav-link">Home</Link>
//           </li>
//           {/* Add more navigation links as needed */}
//         </ul>
//       </nav>

//       <div className="dashboard-content">
//         <section className="course-section">
//           <h2>Available Courses</h2>
//           <div className="row">
//             {courses.map((course) => (
//               <div className="col-md-4" key={course.id}>
//                 <div className="card mb-4">
//                   <div className="card-body">
//                     <h3 className="card-title">{course.name}</h3>
//                     <button className="btn btn-primary">Enroll</button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Studviewcourse;

// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom"
// import './sviewcourse.css';
// function Studviewcourse() {
//     const location = useLocation();
//     const userEmail = location.state?.userEmail;
//     const [courses] = useState([
//         { id: 1, name: 'Course 1', Students: 20 },
//         { id: 2, name: 'Course 2', Students: 30 },
//         { id: 3, name: 'Course 3', Students: 40 },
//     ]);

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

//                             <li className="nav-item">
//                                 <Link to="/Staff-Dashboard" state={{ userEmail }} className="nav-link">Home</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to="/viewcourse" state={{ userEmail }} className="nav-link">View Courses</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to="/createcourse" state={{ userEmail }} className="nav-link">Create Course</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to="/profile" state={{ userEmail }} className="nav-link">Profile</Link>
//                             </li>
//                         </ul>
//                     </div>


//                 </div>
//             </nav>
//             <div className="view-courses-container">
//             {courses.map((courses) => (
//       <div className="course-card" key={courses.id}>
//         <img src={courses.imageUrl} alt={courses.title} className="course-image" />
//         <div className="course-info">
//           <h3 className="course-title">{courses.title}</h3>
//           <p className="course-description">{courses.description}</p>
         
//         </div>
//       </div>
//     ))}
//   </div>
//   </div>
  
// )
//             };

// export default Studviewcourse;




import { useState } from "react";
import { Link, useLocation } from "react-router-dom"
import './App.css'
function Studviewcourse() {

    const location = useLocation();
    const userEmail = location.state?.userEmail;
    const [courses] = useState([
        { id: 1, name: 'Compiler Design', StudentsEnrolled: 20,instructor: 'ABC' },
        { id: 2, name: 'Mobile App Development', StudentsEnrolled: 30,instructor: 'ABC' },
        { id: 3, name: 'Machine Learning ', StudentsEnrolled: 40,instructor: 'ABC' },
    ]);

    const handleAddStudent = () => {
        console.log("Add student to course")
        //  setCourses(courses.map((c) => (c.id === course.id ? { ...c, Students: c.Students + 1 } : c)));
    };

    const handleAddMaterial = () => {
        console.log("Add material to course")
    };

    const handleView = () => {
        console.log("View course details")
    };

    return (
        <div className="viewcoursediv vh-100" >
            <nav className="navbarstaff justify-content-space-between fixed-top ">
                <div className="container-fluid d-flex justify-content-between">
                    <div><p className="welcome-message">Helloo, {userEmail}!</p></div>
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
            <div className="course-list " style={{marginTop:'100px'}}>
                <h2 className="course-list-title" >Course List</h2>
                <div className="course-cards-container">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            {/* <img src={course.imageUrl} alt={course.name} className="course-image" /> */}
            <div className="course-info">
              <h3 className="course-title">{course.name}</h3>
              <p className="course-description">Students Enrolled: {course.StudentsEnrolled}</p>
              <button className="view-button" onClick={() => handleView(course)}>View</button>
            </div>
          </div>
        ))}
      </div>
            </div>
        </div>
    )
}
export default Studviewcourse;