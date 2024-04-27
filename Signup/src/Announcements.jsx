// function Announcements(){
//     return(
//         <div>
//             <h1>Announcements</h1>
//         </div>
//     )
// }
// export default Announcements;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const Announcements = ({ announcement }) => {
//     const initialannouncement = [
//         {
//           id: 1,
//           title: "Welcome Back!",
//           date: "March 20, 2024",
//           content: "Welcome back students! We hope you had a great break and are ready for the new semester.",
//         },
//         {
//           id: 2,
//           title: "Upcoming Events",
//           date: "March 22, 2024",
//           content: "Don't forget about the upcoming student orientation on March 25th. Make sure to mark your calendars!",
//         },
//         {
//           id: 3,
//           title: "Library Closure",
//           date: "March 24, 2024",
//           content: "The library will be closed for renovations from March 26th to April 1st. Apologies for any inconvenience.",
//         },
//       ];
//     return (
//         <div className="announcement-page">
//             {/* Header Navigation */}
//             <nav className="navbar">
//                 <ul className="navbar-nav">
//                     <li className="nav-item">
//                         <Link to="/Student-dashboard" className="nav-link">Back to Dashboard</Link>
//                     </li>
//                     {/* Add more navigation links as needed */}
//                 </ul>
//             </nav>

//             {/* Page Title */}
//             <h2>Announcements</h2>

//             {/* List of Announcements */}
//             <div className="announcement-list">
//                 {initialannouncement.map((announcement) => (
//                     <div key={announcement.id} className="announcement-item">
//                         <h3>{announcement.title}</h3>
//                         <p>Date: {announcement.date}</p>
//                         <p>{announcement.content}</p>
//                         {/* Add more details as needed */}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Announcements;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Announcements = () => {
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
//     <div className="announcement-page">
//       {/* Header Navigation */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-primary">
//         <div className="container">
//           <Link to="/Student-dashboard" className="navbar-brand text-white">
//             Back to Dashboard
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav">
//               {/* Addmore navigation links as needed */}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Page Title */}
//       <h2 className="text-white mt-4">Announcements</h2>

//       {/* List of Announcements */}
//       <div className="announcement-list mt-4">
//         {initialAnnouncement.map((announcement) => (
//           <div key={announcement.id} className="announcement-item card bg-light text-white">
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
//   );
// };

// export default Announcements;






import './announcement.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation } from "react-router-dom"


const Announcements = () => {
    const location = useLocation();
    const userEmail = location.state?.userEmail;
  const initialAnnouncement = [
    {
      id: 1,
      title: "Welcome Back!",
      date: "March 20, 2024",
      content: "Welcome back students! We hope you had a great break and are ready for the new semester.",
    },
    {
      id: 2,
      title: "Upcoming Events",
      date: "March 22, 2024",
      content: "Don't forget about the upcoming student orientation on March 25th. Make sure to mark your calendars!",
    },
    {
      id: 3,
      title: "Library Closure",
      date: "March 24, 2024",
      content: "The library will be closed for renovations from March 26th to April 1st. Apologies for any inconvenience.",
    },
  ];

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
    <div className="announcement-page">
      {/* Header Navigation */}
      <nav className="navbar">
        <ul className="navbar-nav">
          {/* <li className="nav-item">
            <Link to="/Student-dashboard" className="nav-link">Back to Dashboard</Link>
          </li> */}
          {/* Add more navigation links as needed */}
        </ul>
      </nav>

      {/* Page Title */}
      <h2 style={{ color: 'white' }}>Announcements</h2>

      {/* List of Announcements */}
      <div className="announcement-list">
        {initialAnnouncement.map((announcement) => (
          <div key={announcement.id} className="announcement-item card mb-3">
            <div className="card-body">
              <h3 className="card-title">{announcement.title}</h3>
              <p className="card-text">Date: {announcement.date}</p>
              <p className="card-text">{announcement.content}</p>
              {/* Add more details as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Announcements;