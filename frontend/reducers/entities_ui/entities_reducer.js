import { combineReducers } from "redux";

import usersReducer from "./users_reducer";
import accountsReducer from "./accounts_reducer";
import transactionsReducer from './transactions_reducer';
import investmentsReducer from './investments_reducer';
import filteredReducer from './filtered_reducer';
import filteredInvReducer from './filtered_inv_reducer';


const entitiesReducer = combineReducers({
  users: usersReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
  filteredTran: filteredReducer,
  investments: investmentsReducer,
  filteredInv: filteredInvReducer
});

export default entitiesReducer;