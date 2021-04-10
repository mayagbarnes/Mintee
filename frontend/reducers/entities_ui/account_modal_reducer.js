import {OPEN_MODAL, CLOSE_MODAL} from '../../actions/account_modal_actions';
// import {OPEN_TRANSACTION_MODAL, CLOSE_TRANSACTION_MODAL} from '../../actions/transaction_modal_actions'

const _default = { data: null}

const modalReducer = (state = _default, action) => {
    switch(action.type) {
        case OPEN_MODAL:
            let nextState = {type: action.modal}
            if(action.data) {
                nextState.itemId = action.data.id
            }
            return nextState;
        case CLOSE_MODAL:
            return _default;
        default: 
            return state;
    }
};

export default modalReducer;