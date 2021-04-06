import React from 'react';
import { Link } from 'react-router-dom';


const MainNav = ({ currentUser, logoutUser }) => {
  const sessionLinks = () => (
    <nav className="login-signup">
      <div className='nav-left'>
        <Link to="/" className="header-link">
          <img src="/assets/logo.png" alt="Mint Logo"/>
        </Link>
      </div>
      <div className='nav-right'>
      <button><Link to="/demologin">Demo Sign In</Link></button>
      <button><Link to="/login">Sign In</Link></button>
      <button><Link to="/signup">Sign Up</Link></button>
      </div>
    </nav>
  );
  
  const mainMenu = () => (
    <nav className="logout">
        <Link to="/" className="header-link">
          <img src="/assets/black_logo.png" alt="Mint Logo"/>
        </Link>
        <div>
        <button onClick={logoutUser}>LOG OUT</button>
        </div>
    </nav>
  );

  return currentUser ? mainMenu() : sessionLinks();
};


export default MainNav;
