import { combineReducers } from "redux";

import sessionErrorsReducer from "./session_errors_reducer";
import accountErrorsReducer from './account_errors_reducer';
import transactionErrorsReducer from './transaction_errors_reducer';
import investmentErrorsReducer from './investment_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  accounts: accountErrorsReducer,
  transactions: transactionErrorsReducer,
  investments: investmentErrorsReducer,
});

export default errorsReducer;