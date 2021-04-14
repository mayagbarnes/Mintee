import { RECEIVE_TRANSACTION, RECEIVE_TRANSACTIONS, REMOVE_TRANSACTION} from '../../actions/transaction_actions';
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';

const transactionsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign( {}, state)
    switch(action.type) {
        case RECEIVE_TRANSACTIONS:
            return action.transactions;
        case RECEIVE_TRANSACTION:
            newState[action.transaction.id] = action.transaction;
            return newState;
        case REMOVE_TRANSACTION:
            delete newState[action.transactionId];
            return newState;
        case LOGOUT_CURRENT_USER:
            return {};
        default: 
            return state;
    }
};

export default transactionsReducer;