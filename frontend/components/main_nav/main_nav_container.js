import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { logoutUser, loginUser } from '../../actions/session_actions';
import MainNav from './main_nav';

const mapStateToProps = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id]
  };
};

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  loginDemo: (user) => dispatch(loginUser(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNav));
