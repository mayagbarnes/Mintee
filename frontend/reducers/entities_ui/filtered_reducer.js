import {RECEIVE_FILTERED_TRANSACTIONS} from '../../actions/transaction_actions';
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';

const filteredReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_FILTERED_TRANSACTIONS:
            return action.transactions;
        case LOGOUT_CURRENT_USER:
            return {};
        default: 
            return state;
    }
};

export default filteredReducer;