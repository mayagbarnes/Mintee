import { RECEIVE_ACCOUNT, RECEIVE_ACCOUNTS, REMOVE_ACCOUNT} from '../../actions/account_actions';
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';

const accountsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign( {}, state)
    switch(action.type) {
        case RECEIVE_ACCOUNTS:
            return action.accounts;
        case RECEIVE_ACCOUNT:
            newState[action.account.id] = action.account;
            return newState;
        case REMOVE_ACCOUNT:
            delete newState[action.accountId];
            return newState;
        case LOGOUT_CURRENT_USER:
            return {};
        default: 
            return state;
    }
};

export default accountsReducer;