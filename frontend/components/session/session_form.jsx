import React from 'react';
import { Link } from 'react-router-dom';
import MainNavContainer from '../main_nav/main_nav_container';
import { ImEnter } from 'react-icons/im';
import Unlock from '@zendeskgarden/svg-icons/src/16/lock-unlocked-fill.svg';
import Lock from '@zendeskgarden/svg-icons/src/16/lock-locked-fill.svg';
import Clipboard from '@zendeskgarden/svg-icons/src/16/clipboard-list-fill.svg';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    handleChange(type) {
        return (e) => (this.setState( {[type]: e.target.value} ) )
    }

    handleSubmit() {
        this.props.action(this.state)
            .then( () => this.props.history.push('/dashboard'));
    }

    renderErrors() {
        let errors = <ul>
                {this.props.errors.map((error, i) => (
                <li key={`error-${i}`}>
                    {error}
                </li>
                ))}
            </ul>
        
        return errors;
        
    }

    render() {
        let route = '/signup';
        let link_name = 'Create an Account';
        let text = "New to Mint?"
        let demo = ''
        let icon = ''
        if(this.props.formType === 'Create Account') {
            route = '/login';
            link_name = 'Sign In';
            text = 'Already a user?';
            icon = < Clipboard />
        } else if(this.props.formType === 'Sign In') {
            icon = < Lock />
        }
        if(this.props.formHeading !== 'Demo Sign In') {
            demo = <div className='demo'>
                        <h4> Take it for a test drive: </h4>
                        <div>
                            <button><Link to="/demologin"> Demo Sign In</Link></button>
                        </div>
                    </div>
        }

        return (
            <section>
                {<MainNavContainer />}
                <section className='session-form-section'>
                <div className='session-form'>
                <h2>{this.props.formHeading}</h2>
                <h4> Monitor all your accounts in one place</h4>
                <div>
                    {this.renderErrors()}
                    <label> Username
                        <br/>
                        <input id='login-username' type="text" value={this.state.username}
                                onChange={this.handleChange('username')}
                                />
                    </label>
                    <br/>
                    <label> Password
                        <br/>
                        <input type="password" value={this.state.password}
                                onChange={this.handleChange('password')}
                                />
                    </label>
                    <div className='button-holder'>
                        <button onClick={this.handleSubmit}>{icon}<text> {this.props.formType}</text></button>
                    </div>
                    {demo}
                    <p>{text} <Link to={route}>{link_name}</Link></p>
                </div>
                </div>
                </section>
            </section>
        )
    }

}

export default SessionForm;