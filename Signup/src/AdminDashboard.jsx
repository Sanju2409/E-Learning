// function AdminDashboard(){
//     return(
//         <div>
//            <h1>Admin dashboard</h1> 
//         </div>
//     )
// }
// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/announcementadd', newAnnouncement);
      setNewAnnouncement({ title: '', content: '' });
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  return (
    <div className="announcement-page" style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '2rem' }}>Announcements</h2>

      {/* Form to add new announcement */}
      <form onSubmit={handleSubmit} className="announcement-form">
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
  );
};

export default AdminDashboard;