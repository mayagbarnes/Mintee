import { combineReducers } from "redux";

import usersReducer from "./users_reducer";
import accountsReducer from "./accounts_reducer";
import transactionsReducer from './transactions_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer
});

export default entitiesReducer;