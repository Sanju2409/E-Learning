import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EmailVerify.css';

function EmailVerify() {
  useEffect(() => {
    // Get the current URL
    const url = window.location.href;

    // Parse the URL to extract the id and token
    const urlParts = url.split('/');
    const idIndex = urlParts.indexOf('registerss') + 1; // Assuming 'registerss' is part of the URL
    const tokenIndex = urlParts.indexOf('verify') + 1; // Assuming 'verify' is part of the URL
    const id = urlParts[idIndex];
    const token = urlParts[tokenIndex];

    // Do something with the id and token, such as sending them to the server for verification
    console.log('ID:', id);
    console.log('Token:', token);

  }, []);

  return (
    <div className="email-verify-container">
      <div className="email-verify-content">
        <p className="email-verify-message">Your email has been verified successfully.</p>
        <p className="email-verify-proceed-message">Proceed to login:</p>
        <Link to="/login"><button className="email-verify-button">Login</button></Link>
      </div>
    </div>
  );
}

export default EmailVerify;