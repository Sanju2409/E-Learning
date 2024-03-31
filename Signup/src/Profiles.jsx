
// import { useState } from "react";
// import axios from "axios";
// import {
//   Card,
//   Button,
//   Form,
//   Alert,
//   Container,
//   Row,
//   Col,
// } from "react-bootstrap";

// import avatar from "./assets/avatar1.png";

// export default function Profiles() {
//   // const history = useHistory();
//   const [formData, setFormData] = useState({
//     name: "",
//     usn: "",
//     email: '',
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: "",
//     profilePicture: null,
//     errors: {},
//   });
//   // const [loading, setLoading] = useState(false);

//   // Handles errors
//   // const handleErrors = (errors) => {
//   //   setFormData({ ...formData, errors: errors });
//   // };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePasswordChange = async () => {
//     try {
//       console.log("FormData:", formData);
//       const response = await axios.post("/change-password", {
//         email: formData.email,
//         oldPassword: formData.oldPassword,
//         newPassword: formData.newPassword,
//       });
//       console.log(response.data);
//       // Handle success message or redirect to another page
//     } catch (error) {
//       console.error("Error changing password:", error);
//       // Handle error response
//     } 
//   };



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//   };

//   return (
//     <Container className="py-5">
//       <Row>
//         <Col xs={12} md={4}>
//           <Card className="profile-picture-card">
//             <Card.Img
//               variant="top"
//               className="profile-picture"
//               src={avatar}
//             />
//             <Card.Body>
//               <Form.Group controlId="formProfilePicture">
//                 <Form.Label>Change Profile Picture</Form.Label>
//                 <Form.Control
//                   type="file"
//                   name="profilePicture"
//                 // onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} md={8}>
//           <Card className="shadow-sm mb-5">
//             <Card.Body>
//               <h2 className="mb-4">Personal Details</h2>

//               {/* {loading && <Spinner animation="border" role="status"> */}
//               {/* <span className="sr-only">Loading...</span>
//                 </Spinner>} */}

//               <Alert variant="danger" show={Object.keys(formData.errors).length > 0}>
//                 <p>
//                   {Object.values(formData.errors).map((error, i) => (
//                     <span key={i}>{error}</span>
//                   ))}
//                 </p>
//               </Alert>

//               <Form noValidate onSubmit={handleSubmit}>
//                 <Form.Group controlId="formName">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formUSN">
//                   <Form.Label>USN</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="usn"
//                     value={formData.usn}
//                     onChange={handleInputChange}

//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}

//                   />
//                 </Form.Group>

//                 {/* Password Change */}
//                 <Form.Group controlId="formOldPassword">
//                   <Form.Label>Old Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="oldPassword"
//                     value={formData.oldPassword}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formNewPassword">
//                   <Form.Label>
//                     New Password (min. 8 characters, at least one uppercase,
//                     one lowercase, one number)
//                   </Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="newPassword"
//                     value={formData.newPassword}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formConfirmPassword">
//                   <Form.Label>Confirm New Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Button style={{ width: '60px', marginLeft: '50%', marginBottom: '10px', marginTop: '20px' }}
//                   variant="primary"
//                   type="button"
//                   onClick={handlePasswordChange}
                
//                 >Update

//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// import { useState } from "react";
// import axios from "axios";
// import { Card, Button, Form, Alert, Container, Row, Col } from "react-bootstrap";
// import avatar from "./assets/avatar1.png";

// const Profiles = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     switch (name) {
//       case "name":
//         setName(value);
//         break;
//       case "email":
//         setEmail(value);
//         break;
//       case "oldPassword":
//         setOldPassword(value);
//         break;
//       case "newPassword":
//         setNewPassword(value);
//         break;
//       case "confirmPassword":
//         setConfirmPassword(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handlePasswordChange = async () => {
//     try {
//       const response = await axios.post("/change-password", {
//         email,
//         oldPassword,
//         newPassword,
//       });
//       console.log(response.data);
//       // Handle success message or redirect to another page
//     } catch (error) {
//       console.error("Error changing password:", error);
//       // Handle error response
//     }
//   };

//   return (
//     <Container className="py-5">
//       <Row>
//         <Col xs={12} md={4}>
//           <Card className="profile-picture-card">
//             <Card.Img variant="top" className="profile-picture" src={avatar} />
//             <Card.Body>
//               <Form.Group controlId="formProfilePicture">
//                 <Form.Label>Change Profile Picture</Form.Label>
//                 <Form.Control type="file" name="profilePicture" />
//               </Form.Group>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} md={8}>
//           <Card className="shadow-sm mb-5">
//             <Card.Body>
//               <h2 className="mb-4">Personal Details</h2>
//               <Alert variant="danger" show={Object.keys(errors).length > 0}>
//                 <p>
//                   {Object.values(errors).map((error, i) => (
//                     <span key={i}>{error}</span>
//                   ))}
//                 </p>
//               </Alert>
//               <Form noValidate>
//                 <Form.Group controlId="formName">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={name}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={email}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formOldPassword">
//                   <Form.Label>Old Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="oldPassword"
//                     value={oldPassword}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formNewPassword">
//                   <Form.Label>New Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="newPassword"
//                     value={newPassword}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formConfirmPassword">
//                   <Form.Label>Confirm New Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="confirmPassword"
//                     value={confirmPassword}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Button
//                   style={{ width: '60px', marginLeft: '50%', marginBottom: '10px', marginTop: '20px' }}
//                   variant="primary"
//                   type="button"
//                   onClick={handlePasswordChange}
//                 >
//                   Update
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Profiles;




















import React, { useState } from "react";
import axios from "axios";
import { Card, Button, Form, Alert, Container, Row, Col } from "react-bootstrap";
import avatar from "./assets/avatar1.png";

const Profiles = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  

  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handlePasswordChange = async () => {
    try {
      console.log("useremail",email);
      console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
      const response = await axios.post("http://localhost:3001/change-password", {
        email: email,
        oldPassword:oldPassword,
        newPassword:newPassword,
      });
      console.log(response.data);
      alert("password changed successfully");
      // Handle success message or redirect to another page
    } catch (error) {
      console.error("Error changing password:", error);
      // Handle error response
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Your form submission logic here
      console.log("email:", email);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error response
    } 
  };

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12} md={4}>
          <Card className="profile-picture-card">
            <Card.Img variant="top" className="profile-picture" src={avatar} />
            <Card.Body>
              <Form.Group controlId="formProfilePicture">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control type="file" name="profilePicture" />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8}>
          <Card className="shadow-sm mb-5">
            <Card.Body>
              <h2 className="mb-4">Personal Details</h2>
              <Alert variant="danger" show={Object.keys(errors).length > 0}>
                <p>
                  {Object.values(errors).map((error, i) => (
                    <span key={i}>{error}</span>
                  ))}
                </p>
              </Alert>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formOldPassword">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  style={{ width: '60px', marginLeft: '50%', marginBottom: '10px', marginTop: '20px' }}
                  variant="primary"
                  type="button"
                  onClick={handlePasswordChange}
                >
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profiles;