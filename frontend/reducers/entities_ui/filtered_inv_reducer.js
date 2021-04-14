import {RECEIVE_FILTERED_INVESTMENTS} from '../../actions/investment_actions';
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';

const filteredInvReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_FILTERED_INVESTMENTS:
            return action.investments;
        case LOGOUT_CURRENT_USER:
            return {};
        default: 
            return state;
    }
};

export default filteredInvReducer;