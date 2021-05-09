import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';

import { AuthRoute, ProtectedRoute, AdjustedRoute } from '../util/route_utils'; 
import SignUpContainer from './session/signup_container';
import LoginContainer from './session/login_container';
// import DemoContainer from './session/demo_container';
// import MainNavContainer from './main_nav/main_nav_container';
import DashContainer from './dashboard/dash_container';
import TransactionsContainer from './transactions/transactions_container';
import InvestmentsContainer from './investments/investments_container';
import Modal from './modal/modal';
// import HomepageContainer from './main_nav/homepage_container';
import Homepage from './main_nav/out_homepage';

const App = () => (
    <div>
        <Modal />
        <Switch>
            <AuthRoute exact path="/signup" component={SignUpContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
            <AuthRoute exact path="/" component={Homepage} />
            <ProtectedRoute exact path="/dashboard" component={DashContainer} />
            <ProtectedRoute exact path="/transactions" component={TransactionsContainer} />
            <ProtectedRoute exact path="/investments" component={InvestmentsContainer} />
            <AdjustedRoute path="/"/>
        </Switch>
    </div>
)
export default App;