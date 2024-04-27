import axios from "axios";
import { useEffect, useState } from 'react'
import { Link,  useLocation } from "react-router-dom";
// import jwt_decode from "jwt-decode";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




const StaffDashboard = () => {
  // const[message,setMessage]=useState('')
  // const [userEmail, setUserEmail] = useState("");
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [time, setTime] = useState("");
  // const [meetingInfo, setMeetingInfo] = useState("");
  // const [meetings, setMeetings] = useState([]);
  // // const[staffId,setStaffId]=useState(null);

  // const location = useLocation()
  // const userEmail = location.state?.userEmail;
  //  const staffId=location.state?.staffId;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [meetingInfo, setMeetingInfo] = useState("");
  const [meetings, setMeetings] = useState([]);
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const staffId = location.state?.staffId;

  //const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(() => {
    // Fetch meetings from the backend when component mounts
    axios.get('http://localhost:3001/meetingfetch',{
      params: {
        staffId: staffId,
      }
    })
      .then(res => {
        setMeetings(res.data.meetings);
      })
      .catch(err => {
        console.error('Error fetching meetings:', err);
      });
  }, [staffId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddMeeting = () => {
    const newMeeting = {
      date: selectedDate.toLocaleDateString(),
      time: time < 12 ? time + ' AM' : (parseFloat(time) - 12).toString() + ' PM',
      info: meetingInfo,
    };

    // Send meeting data to backend to store in the database
    axios.post('http://localhost:3001/meeting', {
      params: {
       
        staffId: staffId
      },
      newMeeting
    })
      .then(res => {
        // Update meetings state with the newly added meeting
        setMeetings([...meetings, newMeeting]);
        console.log(res);
        // Clear input fields after adding meeting
        setTime("");
        setMeetingInfo("");
      })
      .catch(err => {
        console.error('Error adding meeting:', err);
      });
  };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // const handleAddMeeting = () => {
  //   // const newMeeting = {
  //   //   date: selectedDate.toLocaleDateString(),
  //   //   time: time,
  //   //   info: meetingInfo,
  //   // };
  //   if (time < 12 && time !== '') {
  //     setMeetings([...meetings, { date: selectedDate.toLocaleDateString(), time: time + ' AM', info: meetingInfo }]);
  //   } else if (time === '') {
  //     return;
  //   }
  //   else {
  //     setMeetings([...meetings, { date: selectedDate.toLocaleDateString(), time: (parseFloat(time) - 12).toString() + ' PM', info: meetingInfo }]);
  //   }
  //   // setMeetings([...meetings, newMeeting]);
  //   // Clear input fields after adding meeting
  //   setTime("");
  //   setMeetingInfo("");
  // };
 
  // useEffect(() => {
  //   console.log("Staff ID:", staffId);
  //   axios.get('http://localhost:3001/Staff-Dashboard/${staffId}')
      
  //     .then(res => {
  //       if(res.data.valid){
  //         //
  //         }
          
  //       else {
  //         navigate('/')
  //       }
         
  //       })
  //       .catch(err=>{
  //         console.error('Error checking authentication:',err);
  //       });
        
  //     });
      
 
  
  return (
    <div className="staffdiv vh-100 " >
      <nav className="navbarstaff justify-content-space-between fixed-top ">
        <div className="container-fluid d-flex justify-content-between">
          <div> <p className="welcome-message">Hello, {userEmail}!</p></div>


          <div>
            <ul className="navbar-nav-horizontal" >

              <li className="nav-item">
                <Link to="/Staff-Dashboard" state={{ userEmail }} className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/viewcourse" state={{ userEmail,staffId}} className="nav-link">View Courses</Link>
              </li>
              <li className="nav-item">
                <Link to="/createcourse" state={{ userEmail,staffId}} className="nav-link">Create Course</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" state={{ userEmail}} className="nav-link">Profile</Link>
              </li>
            </ul>
          </div>


        </div>
      </nav>
      {/* <div className="calendar-container " style={{ marginTop: '100px', alignItems:'center',}}>
        <h2>Schedule</h2>
        <div className="calendar-and-date ">

          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="form-control"
          />
          <div className="input-fields">
            <input
              type="number"
              step="0.01"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time (e.g. 5.00)"
              className="form-control mt-2"
            />
            <select
              value={time}
              onChange={(e) => {
                const inputTime = e.target.value === 'PM' ? parseFloat(time) + 12 : parseFloat(time);
                setTime(inputTime.toString());
              }}
              className="form-control mt-2"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            <textarea
              value={meetingInfo}
              onChange={(e) => setMeetingInfo(e.target.value)}
              placeholder="Enter meeting information"
              className="form-control mt-2"
            />
          </div>
          <button onClick={handleAddMeeting} className="addschedulebtn btn btn-primary mt-2 ">
           Add Event
          </button>

        </div>


      </div>
      <div className="meeting-cards mt-3">
        {meetings.map((meeting, index) => (
          <div key={index} className="meeting-card">
            <div className="meeting-date-time">
              <p>Date: {meeting.date}</p>
              <p>Time: {meeting.time}</p>
            </div>
            <div className="meeting-info">
              <p>{meeting.info}</p>
            </div>
          </div>
        ))}
      </div>
    </div> */}
     <div className="calendar-container" style={{ marginTop: '100px', alignItems: 'center' }}>
        <h2>Schedule</h2>
        <div className="calendar-and-date">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="form-control"
          />
          <div className="input-fields">
            <input
              type="number"
              step="0.01"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time (e.g. 5.00)"
              className="form-control mt-2"
            />
            <select
              value={time}
              onChange={(e) => {
                const inputTime = e.target.value === 'PM' ? parseFloat(time) + 12 : parseFloat(time);
                setTime(inputTime.toString());
              }}
              className="form-control mt-2"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            <textarea
              value={meetingInfo}
              onChange={(e) => setMeetingInfo(e.target.value)}
              placeholder="Enter meeting information"
              className="form-control mt-2"
            />
          </div>
          <button onClick={handleAddMeeting} className="addschedulebtn btn btn-primary mt-2">
            Add Event
          </button>
        </div>
      </div>
      {/* Meeting cards */}
      <div className="meeting-cards mt-3">
        {meetings.map((meeting, index) => (
          <div key={index} className="meeting-card">
            <div className="meeting-date-time">
              <p>Date: {meeting.date}</p>
              <p>Time: {meeting.time}</p>
            </div>
            <div className="meeting-info">
              <p>{meeting.info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>



  )
}
export default StaffDashboard;





// import axios from "axios";
// import { useEffect, useState } from 'react'
// import { Link, useNavigate, useLocation } from "react-router-dom";

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';




// const StaffDashboard = () => {
//   // const[message,setMessage]=useState('')
//   // const [userEmail, setUserEmail] = useState("");
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [time, setTime] = useState("");
//   const [meetingInfo, setMeetingInfo] = useState("");
//   const [meetings, setMeetings] = useState([]);

//   const location = useLocation()
//   const userEmail = location.state?.userEmail;

//   const navigate = useNavigate()
//   axios.defaults.withCredentials = true;

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleAddMeeting = () => {
//     // const newMeeting = {
//     //   date: selectedDate.toLocaleDateString(),
//     //   time: time,
//     //   info: meetingInfo,
//     // };
//     if (time < 12 && time !== '') {
//       setMeetings([...meetings, { date: selectedDate.toLocaleDateString(), time: time + ' AM', info: meetingInfo }]);
//     } else if (time === '') {
//       return;
//     }
//     else {
//       setMeetings([...meetings, { date: selectedDate.toLocaleDateString(), time: (parseFloat(time) - 12).toString() + ' PM', info: meetingInfo }]);
//     }
//    // setMeetings([...meetings, newMeeting]);
//     // Clear input fields after adding meeting
//     setTime("");
//     setMeetingInfo("");
//   };

//   useEffect(() => {
//     axios.get('http://localhost:3001/Staff-Dashboard')
//       //.then(res=>console.log(res))
//       //.catch(err=>console.log(err))
//       .then(res => {
//         if (res.data.valid) {
//           // setMessage(res.data.message)
//         }
//         else {
//           navigate('/')
//         }
//       })
//   })
//   return (
//     <div>
//       <nav className="navbarstaff justify-content-space-between fixed-top ">
//         <div className="container-fluid d-flex justify-content-between">
//           <div><p className="welcome-message">Helloo, {userEmail}!</p></div>


//           <div>
//             <ul className="navbar-nav-horizontal" >

//               <li className="nav-item">
//                 <Link to="/Staff-Dashboard" className="nav-link">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/viewcourse" className="nav-link">View Courses</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/createcourse" className="nav-link">Create Course</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/profile" className="nav-link">Profile</Link>
//               </li>
//             </ul></div>


//         </div>
//       </nav>
//       <div className="calendar-container">
//         <h2>Schedule</h2>
//         <div className="calendar-and-date">

//           <DatePicker
//             selected={selectedDate}
//             onChange={handleDateChange}
//             dateFormat="dd/MM/yyyy"
//             className="form-control"
//           />
//           <div className="input-fields">
//             <input
//               type="number"
//               step="0.01"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               placeholder="Enter time (e.g. 5.00)"
//               className="form-control mt-2"
//             />
//             <select
//               value={time }
//               onChange={(e) => {
//                 const inputTime = e.target.value === 'PM' ? parseFloat(time) + 12 : parseFloat(time);
//                 setTime(inputTime.toString());
//               }}
//               className="form-control mt-2"
//             >
//               <option value="AM">AM</option>
//               <option value="PM">PM</option>
//             </select>
//             <textarea
//               value={meetingInfo}
//               onChange={(e) => setMeetingInfo(e.target.value)}
//               placeholder="Enter meeting information"
//               className="form-control mt-2"
//             />
//           </div>
//           <button onClick={handleAddMeeting} className="btn btn-primary mt-2">
//             Add Meeting
//           </button>

//         </div>


//       </div>
//       <div className="meeting-cards mt-3">
//         {meetings.map((meeting, index) => (
//           <div key={index} className="meeting-card">
//             <div className="meeting-date-time">
//               <p>Date: {meeting.date}</p>
//               <p>Time: {meeting.time}</p>
//             </div>
//             <div className="meeting-info">
//               <p>{meeting.info}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>



//   )
// }
// export default StaffDashboard;
// import axios from "axios";
// import { useEffect, useState } from 'react';
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const StaffDashboard = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [time, setTime] = useState("");
//   const [meetingInfo, setMeetingInfo] = useState("");
//   const [meetings, setMeetings] = useState([]);
//   const [userEmail, setUserEmail] = useState("");
  
  
//   const location = useLocation();
//   const navigate = useNavigate();
// const staffId=location.state?.staffId;
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/Staff-Dashboard/${staffId}`);
//         if (response.data.valid) {
//           setUserEmail(response.data.userEmail);
//           setMeetings(response.data.meetings);
//         } else {
//           navigate('/');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [navigate, staffId]);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleAddMeeting = async () => {
//     try {
//       const newMeeting = {
//         date: selectedDate.toLocaleDateString(),
//         time: time < 12 && time !== '' ? `${time} AM` : `${parseFloat(time) - 12} PM`,
//         info: meetingInfo,
//       };

//       const response = await axios.post(`http://localhost:3001/add-meeting/${staffId}`, newMeeting);
      
//       if (response.data.success) {
//         setMeetings([...meetings, newMeeting]);
//         setTime("");
//         setMeetingInfo("");
//       } else {
//         console.error('Failed to add meeting:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error adding meeting:', error);
//     }
//   };

//   // Filter meetings based on scheduled time
//   const currentTime = new Date().getTime(); // Current time in milliseconds
//   const filteredMeetings = meetings.filter(meeting => {
//     const meetingTime = new Date(`${meeting.date} ${meeting.time}`).getTime(); // Meeting time in milliseconds
//     return meetingTime >= currentTime; // Display meetings scheduled after or at current time
//   });

//   return (
//     <div className="staffdiv vh-100">
//       <nav className="navbarstaff justify-content-space-between fixed-top">
//         <div className="container-fluid d-flex justify-content-between">
//           <div><p className="welcome-message">Hello, {userEmail}!</p></div>
//           <div>
//             <ul className="navbar-nav-horizontal">
//               <li className="nav-item">
//                 <Link to="/Staff-Dashboard" state={{ userEmail }} className="nav-link">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/viewcourse" state={{ userEmail, staffId }} className="nav-link">View Courses</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/createcourse" state={{ userEmail, staffId }} className="nav-link">Create Course</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/profile" state={{ userEmail }} className="nav-link">Profile</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//       <div className="calendar-container" style={{ marginTop: '100px', alignItems:'center'}}>
//         <h2>Schedule</h2>
//         <div className="calendar-and-date">
//           <DatePicker
//             selected={selectedDate}
//             onChange={handleDateChange}
//             dateFormat="dd/MM/yyyy"
//             className="form-control"
//           />
//           <div className="input-fields">
//             <input
//               type="number"
//               step="0.01"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               placeholder="Enter time (e.g. 5.00)"
//               className="form-control mt-2"
//             />
//             <select
//               value={time}
//               onChange={(e) => {
//                 const inputTime = e.target.value === 'PM' ? parseFloat(time) + 12 : parseFloat(time);
//                 setTime(inputTime.toString());
//               }}
//               className="form-control mt-2"
//             >
//               <option value="AM">AM</option>
//               <option value="PM">PM</option>
//             </select>
//             <textarea
//               value={meetingInfo}
//               onChange={(e) => setMeetingInfo(e.target.value)}
//               placeholder="Enter meeting information"
//               className="form-control mt-2"
//             />
//           </div>
//           <button onClick={handleAddMeeting} className="addschedulebtn btn btn-primary mt-2">
//             Add Event
//           </button>
//         </div>
//       </div>
//       <div className="meeting-cards mt-3">
//         {filteredMeetings.map((meeting, index) => (
//           <div key={index} className="meeting-card">
//             <div className="meeting-date-time">
//               <p>Date: {meeting.date}</p>
//               <p>Time: {meeting.time}</p>
//             </div>
//             <div className="meeting-info">
//               <p>{meeting.info}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StaffDashboard;
