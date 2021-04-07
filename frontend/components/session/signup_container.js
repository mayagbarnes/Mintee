import {connect} from 'react-redux';
import {signupUser} from '../../actions/session_actions';
import SessionForm from './session_form';
import {removeErrors} from '../../actions/session_actions';

const mapStateToProps = (state) => ({
    user: {
        username: '',
        password: '',
    },
    formHeading: 'Create a Mintee Account',
    formType: 'Create Account',
    errors: state.errors.session,
    icon: Clipboard
});

const mapDispatchToProps = (dispatch) => ({
    action: (user) => dispatch(signupUser(user)),
    clearErrors: () => dispatch(removeErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)


