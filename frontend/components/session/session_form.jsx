import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(type) {
        return (e) => (this.setState( {[type]: e.target.value} ) )
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state)
            .then( () => this.props.history.push('/dashboard'));
    }

    renderErrors() {
        return(
            <ul>
                {this.props.errors.map((error, i) => (
                <li key={`error-${i}`}>
                    {error}
                </li>
                ))}
            </ul>
            );
    }

    render() {
        let route = '/signup';
        let link_name = 'Create an Account';
        let text = "New to Mint?"
        
        if(this.props.formType === 'Create Account') {
            route = '/login';
            link_name = 'Sign In';
            text = 'Already a user?';
        }
        let demo = ''
        if(this.props.formHeading !== 'Demo Sign In') {
            demo = <div className='button-holder'>
                        <button><Link to="/demologin">Demo Sign In</Link></button>
                    </div>
        }

        return (
            <section>
                <nav className="login-signup">
                    <div className='nav-left'>
                        <Link to="/" className="header-link">
                        <img src="/assets/logo.png" alt="Mint Logo"/>
                        </Link>
                    </div>
                </nav>

                <section className='session-form-section'>
                <div className='session-form'>
                <h2>{this.props.formHeading}</h2>
                <h4> Monitor all your accounts in one place</h4>
                <form onSubmit={this.handleSubmit}>
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
                        <button type='submit'>{this.props.formType}</button>
                    </div>
                    {demo}
                    <p>{text} <Link to={route}>{link_name}</Link></p>
                </form>
                </div>
                </section>
            </section>
        )
    }

}

export default SessionForm;