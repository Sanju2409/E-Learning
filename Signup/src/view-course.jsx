import { useState } from "react";
import { Link, useLocation } from "react-router-dom"
import './App.css'
function ViewCourse() {

    const location = useLocation();
    const userEmail = location.state?.userEmail;
    const [courses] = useState([
        { id: 1, name: 'Course 1', numberOfStudents: 20 },
        { id: 2, name: 'Course 2', numberOfStudents: 30 },
        { id: 3, name: 'Course 3', numberOfStudents: 40 },
    ]);

    const handleAddStudent = () => {
        console.log("Add student to course")
        //  setCourses(courses.map((c) => (c.id === course.id ? { ...c, numberOfStudents: c.numberOfStudents + 1 } : c)));
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
                                <Link to="/Staff-Dashboard" state={{ userEmail }} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/viewcourse" state={{ userEmail }} className="nav-link">View Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/createcourse" state={{ userEmail }} className="nav-link">Create Course</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" state={{ userEmail }} className="nav-link">Profile</Link>
                            </li>
                        </ul>
                    </div>


                </div>
            </nav>
            <div className="course-list " style={{marginTop:'100px'}}>
                <h2 className="course-list-title">Course List:</h2>
                <table className="table table-bordered table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th style={{ backgroundColor: '#C6DBEF', color: 'black', fontWeight: 'bold' }}>Course Name</th>
                            <th style={{ backgroundColor: '#C6DBEF', color: 'black', fontWeight: 'bold' }}>Number of Students</th>
                            <th style={{ backgroundColor: '#C6DBEF', color: 'black', fontWeight: 'bold' }}>Add Student</th>
                            <th style={{ backgroundColor: '#C6DBEF', color: 'black', fontWeight: 'bold' }}>Add Material</th>
                            <th style={{ backgroundColor: '#C6DBEF', color: 'black', fontWeight: 'bold' }}>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr style={{backgroundColor:'#4177a2'}} key={course.id}>
                                <td>{course.name}</td>
                                <td>{course.numberOfStudents}</td>
                                <td>
                                    <button style={{backgroundColor:'#4177a2'}} onClick={() => handleAddStudent(course)}>Add Student</button>
                                </td>
                                <td>
                                    <button style={{backgroundColor:'#4177a2'}} onClick={() => handleAddMaterial(course)}>Add Material</button>
                                </td>
                                <td>
                                    <button style={{backgroundColor:'#105750'}} onClick={() => handleView(course)}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ViewCourse;
