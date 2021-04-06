import {connect} from 'react-redux';
import {signupUser} from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => ({
    user: {
        username: '',
        password: '',
    },
    formHeading: 'Create a Mintee Account',
    formType: 'Create Account',
    errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
    action: (user) => dispatch(signupUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)
