// function Profiles(){
//     return(
//         <div>
//             <h1>Profile</h1>
//         </div>
//     )
// }
// export default Profiles;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Form, InputGroup } from 'react-bootstrap';
// import axios from 'axios';
// import avatar from './assets/avatar1.png'; // Replace with your own default profile picture

// function Profiles () {
//   const [formData, setFormData] = useState({
//     name: 'John Doe',
//     usn: '1SM19CS001',
//     email: 'johndoe@gmail.com',
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//     profilePicture: null,
//   });

//   const [previewImage, setPreviewImage] = useState(avatar);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, profilePicture: e.target.files[0] });
//     setPreviewImage(URL.createObjectURL(e.target.files[0]));
//   };

//   const handlePasswordChange = () => {
//     // Handle password change logic here
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//   };

//   return (
//     <div className="profile-page">
//       {/* Header Navigation */}
//       <nav className="navbar">
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <Link to="/Student-dashboard" className="nav-link">Back to Dashboard</Link>
//           </li>
//           {/* Add more navigation links as needed */}
//         </ul>
//       </nav>

//       {/* Page Title */}
//       <h2>Profile</h2>

//       {/* Profile Picture */}
//       {/* <div className="profile-picture">
//         <img src={previewImage} alt="Profile" />
//         <InputGroup className="mb-3">
//           <InputGroup.Prepend>
//             <InputGroup.Text>
//               <i className="fas fa-camera" />
//             </InputGroup.Text>
//           </InputGroup.Prepend>
//           <Form.Control
//             type="file"
//             name="profilePicture"
//             onChange={handleImageChange}
//           />
//         </InputGroup>
//       </div> */}

//       {/* Personal Details */}
//       <div className="personal-details">
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formName">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               disabled
//             />
//           </Form.Group>

//           <Form.Group controlId="formUSN">
//             <Form.Label>USN</Form.Label>
//             <Form.Control
//               type="text"
//               name="usn"
//               value={formData.usn}
//               onChange={handleInputChange}
//               disabled
//             />
//           </Form.Group>

//           <Form.Group controlId="formEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               disabled
//             />
//           </Form.Group>

//           {/* Password Change */}
//           <Form.Group controlId="formOldPassword">
//             <Form.Label>Old Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="oldPassword"
//               value={formData.oldPassword}
//               onChange={handleInputChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="formNewPassword">
//             <Form.Label>New Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="newPassword"
//               value={formData.newPassword}
//               onChange={handleInputChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="formConfirmPassword">
//             <Form.Label>Confirm New Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               required
//             />
//           </Form.Group>

//           <Button
//             variant="primary"
//             type="button"
//             onClick={handlePasswordChange}
//           >
//             Change Password
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Profiles;


import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
 import { Card, Button, Form, InputGroup } from 'react-bootstrap';
 import axios from 'axios';
 import avatar from './assets/avatar1.png';
const Profiles= ()=> {
const [formData, setFormData] = useState({
    name: 'John Doe',
    usn: '4NM21CS068',
    email: 'johndoe@gmail.com',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    // profilePicture: null,
  });

  const [previewImage, setPreviewImage] = useState(avatar);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, profilePicture: e.target.files[0] });
//     setPreviewImage(URL.createObjectURL(e.target.files[0]));
//   };

  const handlePasswordChange = () => {
    // Handle password change logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="profile-page">
      
        <div className="container">
          {/* <Link to="/Student-dashboard" className="navbar-brand">
            Back to Dashboard
          </Link> */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              
            </ul>
          </div>
        </div>
     

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            {/* <Card className="profile-card">
              <Card.Body>
                <Card.Img
                  src={previewImage}
                  alt="Profiles"
                  className="profile-picture"
                /> */}
                {/* <InputGroup className="mt-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fas fa-camera" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="file"
                    name="profilePicture"
                    onChange={handleImageChange}
                  />
                </InputGroup> */}
              {/* </Card.Body>
            </Card> */}
          </div>
          <div className="col-md-8">
            <Card>
              <Card.Body>
                <h2 className="mb-4">Personal Details</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group controlId="formUSN">
                    <Form.Label>USN</Form.Label>
                    <Form.Control
                      type="text"
                      name="usn"
                      value={formData.usn}
                      onChange={handleInputChange}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </Form.Group>

                  {/* Password Change */}
                  <Form.Group controlId="formOldPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="button"
                    onClick={handlePasswordChange}
                  >
                Change Password
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profiles;