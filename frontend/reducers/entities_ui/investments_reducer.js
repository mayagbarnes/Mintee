import { RECEIVE_INVESTMENT, RECEIVE_INVESTMENTS, REMOVE_INVESTMENT} from '../../actions/investment_actions';
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions';

const investmentsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign( {}, state)
    switch(action.type) {
        case RECEIVE_INVESTMENTS:
            return action.investments;
        case RECEIVE_INVESTMENT:
            newState[action.investment.id] = action.investment;
            return newState;
        case REMOVE_INVESTMENT:
            delete newState[action.investmentId];
            return newState;
        case LOGOUT_CURRENT_USER:
            return {};
        default: 
            return state;
    }
};

export default investmentsReducer;