import React from 'react';
import {
  Route,
  Switch,
  Link
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_utils'; 
import SignUpContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import DemoContainer from './session/demo_container';
import GreetingContainer from './greeting/greeting_container';


const App = () => (
    <div>
        <header>
            <GreetingContainer />
        </header>
        <AuthRoute exact path="/signup" component={SignUpContainer} />
        <AuthRoute exact path="/login" component={LoginContainer} />
        <AuthRoute exact path="/demologin" component={DemoContainer} />
    </div>
)
export default App;