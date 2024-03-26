//import axios from 'axios';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

//import { Link, useLocation } from "react-router-dom";
import { Link, useLocation } from "react-router-dom"
const CreateCourse = () => {
    const [courseName, setCourseName] = useState('');
    const [courseId, setCourseId] = useState('');
    const [semester, setSemester] = useState(1);
    const [courseNameError, setCourseNameError] = useState('');
    const [semesterError, setSemesterError] = useState('');
    const [courseIdError, setCourseIdError] = useState('');
    const location = useLocation()
    const navigate = useNavigate();
    const userEmail = location.state?.userEmail;
    const staffId = location.state?.staffId;
    const courseIdPattern = /^\d{2}[A-Z]{2}\d{3}$/;
    axios.defaults.withCredentials = true;

    // const navigate = useNavigate()
    // axios.defaults.withCredentials = true;


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate the input fields
        if (courseName.trim() === '') {
            setCourseNameError('Please enter a course name');
        } else if (semester < 1 || semester > 8) {
            setSemesterError('Please enter a valid semester (1-8)');
        }
        else if (!courseIdPattern.test(courseId)) {
            setCourseIdError('Course Id should be in the format YYBBSId (eg:21CS601)');
        } else {
            // Add your logic here to create a new course
            console.log(`Creating new course: ${courseName} - Semester: ${semester}`);
            //console.log({staffId:staffId})
            // Clear the input fields and errors after successful submission
            setCourseName('');
            setCourseId('');
            setSemester(1);
            setCourseNameError('');
            setSemesterError('');
            try {
                const response = await axios.post("http://localhost:3001/createcourse", {
                    courseName: courseName,
                    courseId: courseId,
                    semester: semester,
                    staffId: staffId
                })
                    .then(result => {
                        if (result.data.error === "Course Id already exists") {
                            alert("Course Id already exists");
                        }
                        else if (result.data.error === "Course name already exists for this semester") {
                            alert("Course name already exists for this semester");
                        }
                        else {
                            alert("Course added Successfully")
                        }

                        //         else {
                        //             console.log(result)
                        //             alert("Created new course");
                        //             navigate("/Staff-Dashboard");
                        //         }
                        // })


                        // }
                    }
                    )
                console.log(response);
                // alert("Created new course");
                navigate("/createcourse", { state: { userEmail, staffId } });

            }
            catch (err) {
                console.log(err)
            }
        }
    };

    return (
        <div>
            <nav className="navbarstaff justify-content-space-between fixed-top ">
                <div className="container-fluid d-flex justify-content-between">
                    <div><p className="welcome-message">Helloo, {userEmail}!</p></div>
                    <div>


                        {/* <ul className="navbar-nav-horizontal" >

                            <li className="nav-item">
                                <Link to="/Staff-Dashboard"  state={{ userEmail,staffId}} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/viewcourse"  state={{ userEmail,staffId}} className="nav-link">View Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/createcourse"  state={{ userEmail,staffId}} className="nav-link">Create Course</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile"  state={{ userEmail,staffId}} className="nav-link">Profile</Link>
                            </li>
                        </ul> */}
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
            <div className='log'>
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
                                <label htmlFor="courseName"  >
                                    <strong>Course Id</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter a course Id"
                                    autoComplete="off"
                                    name="courseId"
                                    value={courseId}
                                    onChange={(e) => setCourseId(e.target.value)}
                                    className="form-control rounded-0"

                                />
                            </div>
                            {courseIdError && <p style={{ color: 'red', margin: '0', fontSize: '0.8rem' }}>{courseIdError}</p>}
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
            
        </div>
    )
}
export default CreateCourse;