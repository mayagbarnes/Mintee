import {RECEIVE_TRANSACTION_ERRORS } from '../../actions/transaction_actions';
import {RECEIVE_CURRENT_USER} from '../../actions/session_actions';
import {CLOSE_MODAL} from '../../actions/account_modal_actions';

const transactionErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return [];
        case RECEIVE_TRANSACTION_ERRORS:
            return action.errors;
        case CLOSE_MODAL:
            return [];
        default: 
            return state;
    }
};

export default transactionErrorsReducer;