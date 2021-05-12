import {RECEIVE_STOCKS } from '../../actions/stock_actions';

const stocksReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_STOCKS:
        return action.stocks
    default:
      return state;
  }
};

export default stocksReducer;