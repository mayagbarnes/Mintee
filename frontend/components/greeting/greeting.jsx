import React from 'react';
import { Link } from 'react-router-dom';


const Greeting = ({ currentUser, logoutUser }) => {
  const sessionLinks = () => (
    <nav className="login-signup">
        <Link to="/" className="header-link">Mintee</Link>
      <div>
      <button><Link to="/demologin">Demo Sign In</Link></button>
      <button><Link to="/login">Sign In</Link></button>
      <button><Link to="/signup">Sign Up</Link></button>
      </div>
    </nav>
  );
  
  const personalGreeting = () => (
    <div className="header-group">
      <h2 className="header-name">Hi, {currentUser.username}!</h2>
      <button className="header-button" onClick={logoutUser}>Log Out</button>
    </div>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;
