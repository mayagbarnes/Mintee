import {RECEIVE_INVESTMENT_ERRORS } from '../../actions/investment_actions';
import {RECEIVE_CURRENT_USER} from '../../actions/session_actions';
import {CLOSE_MODAL} from '../../actions/account_modal_actions';

const investmentErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return [];
        case RECEIVE_INVESTMENT_ERRORS:
            return [...state, ...action.errors];
        case CLOSE_MODAL:
            return [];
        default: 
            return state;
    }
};

export default investmentErrorsReducer;