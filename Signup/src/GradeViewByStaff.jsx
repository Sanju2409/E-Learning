
import { Card, Table } from "react-bootstrap";
import { useLocation ,Link} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

function GradeViewByStaff(){
    const location = useLocation();
  const courseId = location.state?.courseId;
  const userEmail = location.state?.userEmail;
  const staffId=location.state?.staffId;
  
  const[studgrade,setstudgrade]=useState([]);
  useEffect(() => {
    const fetchQuizGrade = async () => {
      try {
        const response = await axios.get("http://localhost:3001/fetchstudentgradeforstaff", {
          params: {
            staffId:staffId,
            courseId: courseId,
          },
        });
        setstudgrade(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching quiz students grade by staff:", error);
      }
    };

    fetchQuizGrade();
  }, [staffId, courseId]);
    return(
        <div>
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
                        <Link to="/Profile" state={{ userEmail,staffId}} className="nav-link">Profile</Link>
                    </li>
                </ul>
            </div>


        </div>
    </nav>
        <div className="d-flex flex-column align-items-center p-4">
        <h1 className="mb-4">Grades</h1>
        <Card className="w-50" style={{ padding: "20px" }}>
        <Card.Header className="text-white text-center" style={{ backgroundColor: "#00BFFF" }}>{courseId}</Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead className="thead-light">
                <tr>
                    <th>Student</th>
                  <th>Obtained Marks</th>
                  <th>Maximum Marks</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {studgrade.map((quiz) => (
                  <tr key={quiz._id} className="table-hover">
                    <td>{quiz.studentId}</td>
                    <td>{quiz.grade}</td>
                    <td>{quiz.totalnoofquestions}</td>
                    <td>{quiz.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
      </div>
    )
    }
export default GradeViewByStaff