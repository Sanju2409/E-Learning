import axios from  "axios";
import  {useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
const Lead=()=>{
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
              const response = await axios.post("http://localhost:3001/register", {
                name,
                email,
                password,
                role:"staff",
              });
              console.log(response);
  }
  catch (err) {
          console.log(err);
        }
    }
    const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });

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

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/announcementadd', newAnnouncement);
      setNewAnnouncement({ title: '', content: '' });
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  
 // const[message,setMessage]=useState('')
//   const navigate = useNavigate();

 

//   const handleSubmit = async (e) => {
//     e.preventDefault();

// //     try {
// //       const response = await axios.post("http://localhost:3001/lead", {
// //         name,
// //         email,
// //         password,
// //         role:"staff",
// //       });

// //       console.log(response);
// //       alert("Created a staff");
// //       navigate("/lead");
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };
// //   useEffect(()=>{
// //     axios.get('http://localhost:3001/Staff-Dashboard')
// //     //.then(res=>console.log(res))
// //     //.catch(err=>console.log(err))
// //     .then(res=>{
// //         if(res.data.valid){
// //            console.log(res.data)
// //         }
// //         else{
// //             navigate('/')
// //         }
// //     })
// }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-center mb-3">Register staff</h1>
                  <form onSubmit={handleSubmit}>
                     
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
        </form>
        
      </div>
    </div>
    </div>
    </div>
    <div className="announcement-page" style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '2rem' }}>Announcements</h2>

      {/* Form to add new announcement */}
      <form onSubmit={handleSubmit1} className="announcement-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            style={{ width: '50%', marginBottom: '1rem',justifyContent:'center'}}
            value={newAnnouncement.title}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <textarea
            className="form-control"
            id="content"
            rows="3"
            style={{ width: '50%', marginBottom: '1rem' }}
            value={newAnnouncement.content}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Announcement
        </button>
      </form>

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
    </div>
  );
}
export default Lead;