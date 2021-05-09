import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';
import Homepage from './homepage_nav';

const mapStateToProps = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id]
  };
};

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps,mapDispatchToProps)(Homepage);
