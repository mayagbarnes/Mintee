import React from 'react';
import { Link } from 'react-router-dom';
import Clipboard from '@zendeskgarden/svg-icons/src/16/clipboard-list-fill.svg';
import Lock from '@zendeskgarden/svg-icons/src/16/lock-locked-fill.svg';
// import { GiHamburgerMenu } from 'react-icons/gi';
import { ImEnter } from 'react-icons/im';
import { GrLogout, GrLinkedin } from 'react-icons/gr';
import {FaGithub} from 'react-icons/fa';


class MainNav extends React.Component {
    constructor(props) {
          super(props);
          this.handleDemo = this.handleDemo.bind(this);
    }

    handleDemo() {
        this.props.loginDemo({username: 'DemoLogin', password: '123456'})
        .then( () => this.props.history.push('/transactions'));
    }

    render() {
      let sessionLinks = () => (
          <nav className="login-signup">
            <div className='nav-left'>
              <Link to="/" className="header-link">
                <img src={window.photos.logo} alt="Mint Logo"/>
              </Link>
                <a target="_blank" href="https://github.com/mayagbarnes" className='header-icons'>
                  <p className='left-icon'><FaGithub className='icon-class'/></p> 
                  <div className='button-text'> Github</div> 
                </a>
              <a target="_blank" href="https://www.linkedin.com/in/mayabarnes/" className='header-icons'>
                <p className='left-icon'><GrLinkedin className='linkedin'/></p> 
                <div className='button-text'> LinkedIn</div> 
              </a>
            </div>
            <div className='nav-right'>
              <button><Link to="/signup">
                <p className='icon'><Clipboard/></p>
                <div className='button-text'> Sign Up</div>
                </Link>
              </button>

              <button><Link to="/login">
                <p className='icon'><Lock/></p>
                <div className='button-text'> Sign In</div>
                </Link>
              </button>
              
              <button onClick={this.handleDemo}>
                <div>
                  <p className='icon'><ImEnter/></p> 
                  <div className='button-text'> Demo Sign In</div> 
                </div>
              </button>
            </div>
          </nav>
        );
        
      let mainMenu = () => (
        <nav className="logout">
            <div className='nav-left'>
              {/* <GiHamburgerMenu/> */}
              <Link to="/" className="header-link">
                <img src={window.photos.black_logo} alt="Mint Logo"/>
              </Link>

              <a target="_blank" href="https://github.com/mayagbarnes" className='header-icons'>
                <p className='left-icon'><FaGithub className='left-icon github'/></p> 
                <div className='button-text'> Github</div> 
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/mayabarnes/" className='header-icons'>
                <p className='left-icon'><GrLinkedin className='left-icon linkedin'/></p> 
                <div className='button-text'> LinkedIn</div> 
              </a>
            </div>
            <div className='nav-right'>
              <button onClick={this.props.logoutUser}> <GrLogout/> LOG OUT</button>
            </div>
          </nav>
        );

      return this.props.currentUser ? mainMenu() : sessionLinks();
    }
}

export default MainNav;
