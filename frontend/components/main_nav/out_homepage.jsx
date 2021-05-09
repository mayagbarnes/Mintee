import React from 'react';
import { Link } from 'react-router-dom';
import MainNavContainer from './main_nav_container';
import {AiFillApple} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';

class LoggedOutHomePage extends React.Component {

    handleDemo() {
        this.props.demo({username: 'DemoLogin', password: '123456'})
        .then( () => this.props.history.push('/transactions'));
    }

    render() {
        return (
            <section className='logged-out-homepage'>
                { < MainNavContainer />}
                <div className="homepage-body">
                    <div className='homepage-left'>
                        <h2>Manage your money</h2>
                        <h3>all in one place!</h3>
                        <p className='homepage-secondary'>Take the first step - compile your accounts, transactions, 
                            and investments to reach your goals</p>
                        <div className='button-holder'>
                            <button>
                                <Link to="/signup">
                                <div className='button-text'>Sign Up for Mintee</div>
                                </Link>
                            </button>
                        </div>
                        <br/>
                        <div className='link-holder'>
                            <a target="_blank"
                                href="https://apps.apple.com/us/app/mint-personal-finance-money/id300238550">
                                <div className='apple-store-button'>
                                    <AiFillApple/>
                                    <p>Download on the<br/>
                                    <span className='primary-text'> App Store</span></p>
                                </div>  
                            </a>
                            <br/>
                            <a className='google-button'
                                target="_blank"
                                href="https://play.google.com/store/apps/details?id=com.mint&hl=en_US">
                                <div className='google-store-button'>
                                    <FcGoogle/>
                                    <p>GET IT ON<br/>
                                    <span className='primary-text'>Google Play</span></p>
                                </div>
                            </a>
                        </div>
                        <br/>
                    </div>
                        <img className='homepage-right' src={window.photos.homepage} alt="HomepageImg"/>
                </div>
            </section>
        )
    }
}

export default LoggedOutHomePage;


 
