import { useState, useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import axios from "axios";


function StudViewMaterials() {

    const [materials, setMaterials] = useState([]);
    const location = useLocation();
    
    const userEmail = location.state?.userEmail;
    const courseId = location.state.courseId;
    const staffId=location.state.staffId;
    console.log(location.state);
    const email = location.state.userEmail;
    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await axios.get('http://localhost:3001/studmaterials', {
                    params: {
                        courseId: courseId,
                        staffId:staffId
                    },
                });
                setMaterials(response.data);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };
        const handleViewMaterials = async () => {
            
            try {
              // Fetch materials for the selected course
              const response = await axios.get('http://localhost:3001/materials', {
                params: {
                  courseId: courseId,
                  
                },
              });
              console.log(response.data);
            } catch (error) {
              console.error('Error fetching materials:', error);
            }
          };

        fetchMaterials();
        handleViewMaterials();
    }, [courseId,email]);

    return (
        <div className="vh-100">
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
                                </li><li className="nav-item">
                                    <Link to="/Announcements" state={{ userEmail }} className="nav-link">Announcements</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Profiles" state={{ userEmail }} className="nav-link">Profile</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            <h1 className="material-content-title">View Materials</h1>
            <ul className="material-content-table">
                {materials.map(material => (
                    <li key={material._id} className="material-content-item">
                        <a href={`http://localhost:3001/material-content?filePath=${material.filePath}`} target="_blank" rel="noopener noreferrer" className="material-content-link">
                            {material.filePath}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudViewMaterials;
