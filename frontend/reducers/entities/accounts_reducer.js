import {RECEIVE_ACCOUNT, RECEIVE_ALL_ACCOUNTS, REMOVE_ACCOUNT} from '../../actions/account_actions';


const accountsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign( {}, state)
    switch(action.type) {
        case RECEIVE_ALL_ACCOUNTS:
            return Object.assign( {}, state, action.accounts);
        case RECEIVE_ACCOUNT:
            newState[action.account.id] = action.account;
            return newState;
        case REMOVE_ACCOUNT:
            delete newState[action.accountId];
            return newState;
        default: 
            return state;
    }
};

export default accountsReducer;