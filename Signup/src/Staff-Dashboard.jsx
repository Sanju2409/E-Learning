import axios from "axios";
import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
// import jwt_decode from "jwt-decode";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




const StaffDashboard = () => {
  // const[message,setMessage]=useState('')
  // const [userEmail, setUserEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [meetingInfo, setMeetingInfo] = useState("");
  const [meetings, setMeetings] = useState([]);
  // const[staffId,setStaffId]=useState(null);

  const location = useLocation()
  const userEmail = location.state?.userEmail;
   const staffId=location.state?.staffId;

  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddMeeting = () => {
    // const newMeeting = {
    //   date: selectedDate.toLocaleDateString(),
    //   time: time,
    //   info: meetingInfo,
    // };
    if (time < 12 && time !== '') {
      setMeetings([...meetings, { date: selectedDate.toLocaleDateString(), time: time + ' AM', info: meetingInfo }]);
    } else if (time === '') {
      return;
    }
    else {
      setMeetings([...meetings, { date: selectedDate.toLocaleDateString(), time: (parseFloat(time) - 12).toString() + ' PM', info: meetingInfo }]);
    }
    // setMeetings([...meetings, newMeeting]);
    // Clear input fields after adding meeting
    setTime("");
    setMeetingInfo("");
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
  //   if (token) {
  //     try {
  //       const decodedToken = jwt_decode(token);
  //       const staffId = decodedToken.staffId;
  //       // Now you have the staffId, you can use it as needed
  //       console.log("Staff ID:", staffId);
  //       // Fetch data from the server
  //       axios.get('http://localhost:3001/Staff-Dashboard')
  //         .then(res => {
  //           if(res.data.valid){
  //             //
  //           } else {
  //             navigate('/');
  //           }
  //         })
  //         .catch(err => {
  //           console.error('Error checking authentication:', err);
  //         });
  //     } catch (error) {
  //       console.error("Error decoding JWT token:", error);
  //     }
  //   } else {
  //     console.log("User not logged in");
  //     navigate('/');
  //   }
  // }, []);

  useEffect(() => {
    console.log("Staff ID:", staffId);
    axios.get('http://localhost:3001/Staff-Dashboard/${staffId}')
      //.then(res=>console.log(res))
      //.catch(err=>console.log(err))
      .then(res => {
        if(res.data.valid){
          //
          }
          
        else {
          navigate('/')
        }
         
        })
        .catch(err=>{
          console.error('Error checking authentication:',err);
        });
        
      });
      
  // useEffect(() => {
  //   // Fetch data from the server
  //   axios.get('http://localhost:3001/Staff-Dashboard')
  //     .then(res => {
  //       if (res.data.valid) {
  //         // Retrieve JWT token from localStorage
  //         const token = localStorage.getItem("token");
  //         if (token) {
  //           const decodedToken = jwt_decode(token);
  //           const staffId = decodedToken.staffId;
  //           setStaffId(staffId);
          
  //         } else {
  //           // Handle case where token is not available
  //         }
  //       } else {
  //         navigate('/');
  //       }
  //     })
  //     .catch(err => {
  //       console.error('Error checking authentication:', err);
  //     });
  // }, [navigate, setStaffId]);
  
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
      <div className="calendar-container " style={{ marginTop: '100px', alignItems:'center',}}>
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