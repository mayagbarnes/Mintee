import {RECEIVE_ACCOUNT_ERRORS, REMOVE_ACCOUNT_ERRORS } from '../../actions/account_actions';
import {RECEIVE_CURRENT_USER} from '../../actions/session_actions';

const accountErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return [];
        case RECEIVE_ACCOUNT_ERRORS:
            return action.errors;
        case REMOVE_ACCOUNT_ERRORS:
            return [];
        default: 
            return state;
    }
};

export default accountErrorsReducer;