import React from 'react';
import { Link } from 'react-router-dom';
import Clipboard from '@zendeskgarden/svg-icons/src/16/clipboard-list-fill.svg';
import Lock from '@zendeskgarden/svg-icons/src/16/lock-locked-fill.svg';
// import Unlock from '@zendeskgarden/svg-icons/src/16/lock-unlocked-fill.svg';
// import { GiHamburgerMenu } from 'react-icons/gi';
import { ImEnter } from 'react-icons/im';


const MainNav = ({ currentUser, logoutUser }) => {
  const sessionLinks = () => (
    <nav className="login-signup">
      <div className='nav-left'>
        <Link to="/" className="header-link">
          <img src={window.photos.logo} alt="Mint Logo"/>
        </Link>
      </div>
      <div className='nav-right'>
        <button><Link to="/demologin">
          <p className='icon'><ImEnter/></p> 
          <div className='button-text'> Demo Sign In</div> 
          </Link>
        </button>

        <button><Link to="/login">
          <p className='icon'><Lock/></p>
          <div className='button-text'> Sign In</div>
          </Link>
        </button>
        
        <button><Link to="/signup">
          <p className='icon'><Clipboard/></p>
          <div className='button-text'> Sign Up</div>
          </Link>
        </button>
      </div>
    </nav>
  );
  
  const mainMenu = () => (
    <nav className="logout">
      <div className='nav-left'>
        {/* <GiHamburgerMenu/> */}
        <Link to="/" className="header-link">
          <img src={window.photos.black_logo} alt="Mint Logo"/>
        </Link>
      </div>
      <div className='nav-right'>
        <button onClick={logoutUser}>LOG OUT</button>
      </div>
    </nav>
  );

  return currentUser ? mainMenu() : sessionLinks();
};


export default MainNav;
