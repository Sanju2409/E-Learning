//import axios from 'axios';
import { useState } from 'react';
//import { Link, useLocation } from "react-router-dom";
import { Link,useLocation } from "react-router-dom"
function CreateCourse() {
    const [courseName, setCourseName] = useState('');
    const [semester, setSemester] = useState(1);
    const [courseNameError, setCourseNameError] = useState('');
    const [semesterError, setSemesterError] = useState('');
    const location = useLocation()
    const userEmail = location.state?.userEmail;
   // axios.defaults.withCredentials = true;

    // const navigate = useNavigate()
    // axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate the input fields
        if (courseName.trim() === '') {
            setCourseNameError('Please enter a course name');
        } else if (semester < 1 || semester > 8) {
            setSemesterError('Please enter a valid semester (1-8)');
        } else {
            // Add your logic here to create a new course
            console.log(`Creating new course: ${courseName} - Semester: ${semester}`);
            // Clear the input fields and errors after successful submission
            setCourseName('');
            setSemester(1);
            setCourseNameError('');
            setSemesterError('');
        }
    };
    return (
        <div>
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
            <div className="row justify-content-center align-items-center  vh-100">
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-body"></div>
                        <h2>Create New Course</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="courseName"  >
                                    <strong>Course Name</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter a course name"
                                    autoComplete="off"
                                    name="courseName"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    className="form-control rounded-0"
                                    
                                />
                            </div>
                            {courseNameError && <p style={{ color: 'red', margin: '0', fontSize: '0.8rem' }}>{courseNameError}</p>}
                            <br />
                            <div className="mb-3">
                                <label htmlFor="semester">
                                    <strong>Semester</strong>
                                </label>
                                <input
                                    type="number"
                                    id="semester"
                                    autoComplete="off"
                                    name="password"
                                    min={1}
                                    max={8}
                                    value={semester}
                                    onChange={(e) => setSemester(e.target.value)}
                                    className="form-control rounded-0"
                                    style={{ textAlign: 'center' }}
                                />
                            </div>
                            {semesterError && <p style={{ color: 'red', margin: '0', fontSize: '0.8rem' }}>{semesterError}</p>}
                            <br />
                            <button type="submit" className="btn btn-success w-100 rounded-0">Create</button>

                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}
export default CreateCourse;