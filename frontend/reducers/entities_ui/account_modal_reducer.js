import {OPEN_MODAL, CLOSE_MODAL} from '../../actions/account_modal_actions';

const _default = { data: null}

const modalReducer = (state = _default, action) => {
    switch(action.type) {
        case OPEN_MODAL:
            let nextState = {type: action.modal}
            if(action.data) {
                nextState.accountId = action.data.id
            }
            return nextState;
        case CLOSE_MODAL:
            return _default;
        default: 
            return state;
    }
};

export default modalReducer;