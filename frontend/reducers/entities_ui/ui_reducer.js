import { combineReducers } from "redux";
import modalReducer from './account_modal_reducer'

const uiReducer = combineReducers({
  modal: modalReducer,
});

export default uiReducer;