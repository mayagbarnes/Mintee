import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_utils'; 
import SignUpContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import DemoContainer from './session/demo_container';
import MainNavContainer from './main_nav/main_nav_container';
// import DashContainer from './dashboard/dash_container';


const App = () => (
    <div>
        <Switch>
            <AuthRoute exact path="/signup" component={SignUpContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
            <AuthRoute exact path="/demologin" component={DemoContainer} />
            {/* <ProtectedRoute exact path="/dashboard" component={DashContainer} /> */}
            <Route path="/" component={MainNavContainer} />
            <Redirect to="/" />
        </Switch>
    </div>
)
export default App;