import {connect} from 'react-redux';
import {loginUser} from '../../actions/session_actions';
import SessionForm from './session_form';
import {removeErrors} from '../../actions/session_actions';

const mapStateToProps = (state) => ({
    user: {
        username: '',
        password: '',
    },
    formHeading: 'Sign In',
    formType: 'Sign In',
    errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
    action: (user) => dispatch(loginUser(user)),
    demo: (user) => dispatch(loginUser(user)),
    clearErrors: () => dispatch(removeErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)
