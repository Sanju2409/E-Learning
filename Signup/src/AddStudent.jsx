import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

import './App.css';
function AddStudent() {
    //const [courses, setCourses] = useState([])
    const [students, setStudents] = useState([])
    const [email, setEmail] = useState("")
    const location = useLocation();
    const userEmail = location.state?.userEmail;
    const staffId = location.state?.staffId;
    const courseId = location.state?.courseId;
    const [studentss, setStudentss] = useState([

    ]);

    const removeStudent =async (studentEmail) => {
        try{
            await axios.delete('http://localhost:3001/removestudentfromcourse',{
                data:{
                    studentEmail:studentEmail,
                    courseId:courseId,
                    staffId:staffId
                }
            
            });
            setStudentss(studentss.filter(student=>student.email!==studentEmail));
            console.log("Students removed successfully from the course");

        }
        catch(error){
            console.error("Error removing student from the course:",error);
        }
       
        
    };
    useEffect(() => {

        const fetchStudent = async () => {
            try {
                console.log("Staff Id:", location.state.staffId);
                const response = await axios.get("http://localhost:3001/student");
                setStudents(response.data);
            }
            catch (error) {
                console.log("Error fetching students", error);
            }
        }
        const fetchstudentaddedtoCourses = async () => {
            try {
                // Fetch courses from the backend API
                // const response = await axios.get("http://localhost:3001/viewcourse");
                // const filteredCourses = response.data.filter(course => course.staffId === staffId);
                // setCourses(filteredCourses)
                console.log("Staff ID:", location.state.staffId);

                const response = await axios.get("http://localhost:3001/fetchstudentaddedtoCourses", {
                    params: {
                        staffId: location.state.staffId,
                        courseId: courseId
                    }
                });
                setStudentss(response.data);
            }

            catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        //fetchCourses();
        fetchStudent();
        fetchstudentaddedtoCourses();
        // fetchStudentsAddedByStaff();

    }, [location.state]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/AddStudentToCourse", {
                courseId: courseId,
                email,
                staffId: staffId,


            });

            console.log(response);
            alert("Added");

        } catch (err) {
            console.log(err);
        }
    };
    const handleAddStudent = (courseId, studentId) => {
        console.log("Add student " + studentId + " to course " + courseId)
        setEmail(studentId);
        //     //  setCourses(courses.map((c) => (c.id === course.id ? { ...c, numberOfStudents: c.numberOfStudents + 1 } : c)));
    };
    
    return (
        <div className=" container " style={{ width: "1000px" }}>
            <div className="  row  vh-100">

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

                <div className="addstudent-container col-md-6 align-left"  >
                    <div className="container1" >
                        <div className="card shadow " style={{ maxWidth: "400px", width: "100%" }}>
                            <h2>Add Student to Course</h2>
                            <div className="card-body"></div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="email">
                                        <strong>Email</strong>
                                    </label>

                                    <div style={{ marginTop: '10px' }}>
                                        <input
                                            type="text"
                                            id="studentInput"
                                            list="studentsList"
                                            onChange={(e) => handleAddStudent(courseId, e.target.value)}
                                            className="form-control"
                                            placeholder="Enter student email"
                                        />
                                        <datalist id="studentsList">
                                            {students.map((student) => (
                                                <option key={student.email} value={student.email} />
                                            ))}
                                        </datalist>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success  rounded-100">Add Student</button>

                            </form>

                        </div>
                        {/* <div>
                        <h2>Student List</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentss.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td><button onClick={() => removeStudent(student.id)}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}

                        <div className="displayadddedstudent" >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentss.map((student) => (
                                        <tr key={student._id}>
                                            <td>{courseId}</td>
                                            <td>{student.email}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => removeStudent(student.email)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}
export default AddStudent;