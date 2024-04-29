
// import './announcement.css';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {useLocation } from "react-router-dom"


// const Announcements = () => {
//     const location = useLocation();
//     const userEmail = location.state?.userEmail;
//   const initialAnnouncement = [
//     {
//       id: 1,
//       title: "Welcome Back!",
//       date: "March 20, 2024",
//       content: "Welcome back students! We hope you had a great break and are ready for the new semester.",
//     },
//     {
//       id: 2,
//       title: "Upcoming Events",
//       date: "March 22, 2024",
//       content: "Don't forget about the upcoming student orientation on March 25th. Make sure to mark your calendars!",
//     },
//     {
//       id: 3,
//       title: "Library Closure",
//       date: "March 24, 2024",
//       content: "The library will be closed for renovations from March 26th to April 1st. Apologies for any inconvenience.",
//     },
//   ];

//   return (
//     <div className="viewcoursediv vh-100" >
//     <nav className="navbarstaff justify-content-space-between fixed-top ">
//         <div className="container-fluid d-flex justify-content-between">
//             <div><p className="welcome-message">Helloo, {userEmail}!</p></div>
//             <div>


//                 <ul className="navbar-nav-horizontal" >

                    
//         <li className="nav-item">
//           <Link to="/Student-dashboard" state={{ userEmail }} className="nav-link">Home</Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/Studviewcourse" state={{ userEmail }} className="nav-link">View Courses</Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/Announcements" state={{ userEmail }} className="nav-link">Announcements</Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/Profiles" state={{ userEmail }} className="nav-link">Profile</Link>
//         </li>
//                 </ul>
//             </div>


//         </div>
//     </nav>
//     <div className="announcement-page">
//       {/* Header Navigation */}
//       <nav className="navbar">
//         <ul className="navbar-nav">
//           {/* <li className="nav-item">
//             <Link to="/Student-dashboard" className="nav-link">Back to Dashboard</Link>
//           </li> */}
//           {/* Add more navigation links as needed */}
//         </ul>
//       </nav>

//       {/* Page Title */}
//       <h2 style={{ color: 'white' }}>Announcements</h2>

//       {/* List of Announcements */}
//       <div className="announcement-list">
//         {initialAnnouncement.map((announcement) => (
//           <div key={announcement.id} className="announcement-item card mb-3">
//             <div className="card-body">
//               <h3 className="card-title">{announcement.title}</h3>
//               <p className="card-text">Date: {announcement.date}</p>
//               <p className="card-text">{announcement.content}</p>
//               {/* Add more details as needed */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Announcements;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import {useLocation } from "react-router-dom"

// const Announcements = () => {
//   // const location = useLocation();
//   //   const userEmail = location.state?.userEmail;
//   const [announcements, setAnnouncements] = useState([]);
//   const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });

  
//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/announcemntfetch');
//         setAnnouncements(response.data);
//       } catch (error) {
//         console.error('Error fetching announcements:', error);
//       }
//     };
//     fetchAnnouncements();
//   }, []);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3001/announcementadd', newAnnouncement);
//       // fetchAnnouncements(); // Refresh announcements after adding
//       setNewAnnouncement({ title: '', content: '' });
//     } catch (error) {
//       console.error('Error adding announcement:', error);
//     }
//   };

//   return (
//     <div className="announcement-page">
//       <h2 style={{ color: 'white' }}>Announcements</h2>

//       {/* Form to add new announcement */}
//       <form onSubmit={handleSubmit}>
//         <label>Title:</label>
//         <input type="text" value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} required />
//         <label>Content:</label>
//         <textarea value={newAnnouncement.content} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })} required />
//         <button type="submit">Add Announcement</button>
//       </form>

//       {/* List of Announcements */}
//       <div className="announcement-list">
//         {announcements.map((announcement) => (
//           <div key={announcement._id} className="announcement-item card mb-3">
//             <div className="card-body">
//               <h3 className="card-title">{announcement.title}</h3>
//               <p className="card-text">Date: {new Date(announcement.date).toLocaleDateString()}</p>
//               <p className="card-text">{announcement.content}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Announcements;
import { useState, useEffect } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  // const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:3001/announcemntfetch');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
    fetchAnnouncements();
  }, []);

  

  return (
    <div className="announcement-page" style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '2rem' }}>Announcements</h2>

    

      {/* List of Announcements */}
      <div className="announcement-list">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="announcement-item card mb-3">
            <div className="card-body" style={{ padding: '1rem' }}>
              <h3 className="card-title">{announcement.title}</h3>
              <p className="card-text">Date: {new Date(announcement.date).toLocaleDateString()}</p>
              <p className="card-text">{announcement.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;