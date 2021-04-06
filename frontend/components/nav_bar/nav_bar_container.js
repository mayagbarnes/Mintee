import {logoutUser} from '../../actions/session';
import {connect} from 'react-redux';
import NavBar from './nav_bar';

const mapStateToProps = (state) => ({
    currentUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
