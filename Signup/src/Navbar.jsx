
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Navigation = () => {
   const navigate = useNavigate();
   const handleLoginClick = () => {
     navigate('/login');
   };
   const handleRegisterClick = () => {
    navigate('/register');
   };
 
    return (
      <nav className="container">
        
        <ul>
       
          <li>
    <Link to="/about">About</Link>
  </li>
          {/* <li href="#">Contact</li> */}
        </ul>
  
         <button onClick={handleLoginClick}>login</button>
        <button onClick={handleRegisterClick}>Register</button>

      </nav>
     
    );
  };
  
  export default Navigation;


