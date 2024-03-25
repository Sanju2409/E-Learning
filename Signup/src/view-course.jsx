import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import './App.css'
import axios from "axios";
function ViewCourse() {

    const location = useLocation();
    const userEmail = location.state?.userEmail;
    const staffId = location.state?.staffId;
    const [courses, setCourses] = useState([])
    
    useEffect(() => {
        // Fetch courses created by the logged-in staff member
        const fetchCourses = async () => {
            try {
                // Fetch courses from the backend API
                // const response = await axios.get("http://localhost:3001/viewcourse");
                // const filteredCourses = response.data.filter(course => course.staffId === staffId);
                // setCourses(filteredCourses)
                console.log("Staff ID:", location.state.staffId);

                const response = await axios.get("http://localhost:3001/viewcourse", {
                    params: {
                        staffId: location.state.staffId
                    }
                });
                setCourses(response.data);
            }

            catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
      




        fetchCourses();
       

    }, [staffId]);
    // const [courses] = useState([
    //     { id: 1, name: 'Course 1', numberOfStudents: 20 },
    //     { id: 2, name: 'Course 2', numberOfStudents: 30 },
    //     { id: 3, name: 'Course 3', numberOfStudents: 40 },
    // ]);

    const handleAddStudent = (courseId, studentId) => {
        console.log("Add student "+studentId+" to course " + courseId  )
        //     //  setCourses(courses.map((c) => (c.id === course.id ? { ...c, numberOfStudents: c.numberOfStudents + 1 } : c)));
    };

    const handleAddMaterial = () => {
        //     console.log("Add material to course")
    };

    const handleView = () => {
        //     console.log("View course details")
    };

    return (
        <div className="viewcoursediv vh-100" >
            <nav className="navbarstaff justify-content-space-between fixed-top ">
                <div className="container-fluid d-flex justify-content-between">
                    <div><p className="welcome-message">Helloo, {userEmail}!</p></div>
                    <div>


                        <ul className="navbar-nav-horizontal" >

                            <li className="nav-item">
                                <Link to="/Staff-Dashboard" state={{ userEmail, staffId }} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/viewcourse" state={{ userEmail, staffId: staffId }} className="nav-link">View Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/createcourse" state={{ userEmail, staffId: staffId }} className="nav-link">Create Course</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" state={{ userEmail, staffId }} className="nav-link">Profile</Link>
                            </li>
                        </ul>
                    </div>


                </div>
            </nav>
            <div className="course-list " style={{ marginTop: '100px' }}>
                <h2 className="course-list-title">Course List:</h2>
                <table className="table table-bordered table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th style={{ backgroundColor: '#C6DBEF', color: 'black', fontWeight: 'bold' }}>Course Name</th>
                            <th style={{ backgroundColor: '#C6DBEF', color: 'black', fontWeight: 'bold' }}>Course Id</th>
                            <th style={{ backgroundColor: '#C6DBEF', color: 'black', fontWeight: 'bold' }}>Number of Students</th>
                            <th style={{ backgroundColor: '#C6DBEF', color: 'black', fontWeight: 'bold' }}>Add Student</th>
                            <th style={{ backgroundColor: '#C6DBEF', color: 'black', fontWeight: 'bold' }}>
                                <Link to="/addMaterial" style={{ textDecoration: 'none', color: 'inherit' }}>Add Material</Link>
                            </th>
                            <th style={{ backgroundColor: '#C6DBEF', color: 'black', fontWeight: 'bold' }}>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr style={{ backgroundColor: '#4177a2' }} key={course.courseId}>
                                <td>{course.courseName}</td>
                                <td>{course.courseId}</td>
                                <td>{course.numberOfStudents}</td>
                                <td>
                                    {/* <select onChange={(e) => handleAddStudent(course.courseId, e.target.value)}>
                                        <option value="">Select Student</option>
                                        {students.map((student) => (
                                            <option key={student.email} value={student.email}>
                                                {student.email}
                                            </option>
                                        ))}
                                    </select> */}
                                    <Link to="/AddStudentToCourse" style={{ textDecoration: 'none', color: 'inherit' }} state={{ userEmail, staffId: staffId,courseId:course.courseId}}>
                                        <button style={{ backgroundColor: '#4177a2', marginLeft: '10px' }} onClick={() => handleAddStudent(course.courseId)}>Add Student</button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to="/addMaterial" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <button style={{ backgroundColor: '#4177a2', marginLeft: '10px' }} onClick={() => handleAddMaterial(course.courseId)}>Add Material</button>
                                    </Link>
                                    {/* <button style={{ backgroundColor: '#4177a2', marginLeft: '10px' }} onClick={() => handleAddMaterial(course.courseId)}>Add Material</button> */}
                                </td>
                                <td>
                                    <button style={{ backgroundColor: '#105750', marginLeft: '10px' }} onClick={() => handleView(course.courseId)}>View</button>
                                </td>
                            </tr>
                        ))}
                        {/* {courses.map((course) => (
                            <tr style={{ backgroundColor: '#4177a2' }} key={course.id}>
                                <td>{course.name}</td>
                                <td>{course.numberOfStudents}</td>
                                <td>
                                    <button style={{ backgroundColor: '#4177a2' }} onClick={() => handleAddStudent(course)}>Add Student</button>
                                </td>
                                <td>
                                    <button style={{ backgroundColor: '#4177a2' }} onClick={() => handleAddMaterial(course)}>Add Material</button>
                                </td>
                                <td>
                                    <button style={{ backgroundColor: '#105750' }} onClick={() => handleView(course)}>View</button>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ViewCourse;
