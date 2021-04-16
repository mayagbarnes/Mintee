import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
    < Route
        path={path} exact={exact} render={(props) => (
        !loggedIn ? (
        <Component {...props} />
        ) : (
        <Redirect to="/transactions" />
        )
    )} />
)

const Protected = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        loggedIn ? (
        <Component {...props} />
        ) : (
        <Redirect to="/login" />
        )
    )} />
);

const Adjusted = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        loggedIn ? (
        <Redirect to="/transactions" />
        ) : (
        <Redirect to="/" />
        )
    )} />
);




const mapStateToProps = (state) => ({
    loggedIn: Boolean(state.session.id),
});

export const AdjustedRoute = withRouter(connect(mapStateToProps)(Adjusted));
export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
 