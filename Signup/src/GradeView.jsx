
import axios from "axios";
import { useState, useEffect } from "react";
import {Link, useLocation } from "react-router-dom";
import { Card, Table } from "react-bootstrap";

function GradeView() {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const studentId = location.state?.userEmail;
  const userEmail=location.state?.userEmail;
  console.log("Course ID:", courseId);
  console.log("Student ID:", studentId);
  const [quizgrade, setquizgrade] = useState([]);

  useEffect(() => {
    const fetchQuizGrade = async () => {
      try {
        const response = await axios.get("http://localhost:3001/fetchquizgrade", {
          params: {
            studentId: studentId,
            courseId: courseId,
          },
        });
        setquizgrade(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching quiz grade:", error);
      }
    };

    fetchQuizGrade();
  }, [studentId, courseId]);

  return (
    <div className="bgfinal d-flex flex-column align-items-center p-4">
          <nav className="navbarstaff justify-content-space-between fixed-top">
                <div className="container-fluid d-flex justify-content-between">
                    <div>
                        <p className="welcome-message">Hello, {userEmail}!</p>
                    </div>
                    <div>
                        <ul className="navbar-nav-horizontal">
                            <li className="nav-item">
                                <Link to="/Student-dashboard" state={{ userEmail}} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Studviewcourse" state={{ userEmail }} className="nav-link">View Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Announcements" state={{userEmail }} className="nav-link">Announcements</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Profiles" state={{userEmail }} className="nav-link">Profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
      <h1 className="mb-4">Grades</h1>
      <Card className="w-50" style={{ padding: "20px" }}>
      <Card.Header className="text-white text-center" style={{ backgroundColor: "#00BFFF" }}>{courseId}</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead className="thead-light">
              <tr>
                <th>Obtained Marks</th>
                <th>Maximum Marks</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {quizgrade.map((quiz) => (
                <tr key={quiz._id} className="table-hover">
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
  );
}

export default GradeView;