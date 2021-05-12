import {connect} from 'react-redux';
import {fetchTransactions} from '../../actions/transaction_actions';
import {fetchAccounts, fetchAccount} from '../../actions/account_actions';
import {fetchInvestments, updateInvestment} from '../../actions/investment_actions';
import Dash from './dash';
import {openModal} from '../../actions/account_modal_actions';


const mapStateToProps = (state) => ({
    accounts: Object.values(state.entities.accounts),
    investments: Object.values(state.entities.investments),
    transactions: Object.values(state.entities.transactions),
    errors: state.errors.accounts,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAccounts: () => dispatch(fetchAccounts()),
    fetchAccount: (accountId) => dispatch(fetchAccount(accountId)),
    fetchInvestments: () => dispatch(fetchInvestments()),
    fetchTransactions: () => dispatch(fetchTransactions()),
    updateInvestment: (investment) => dispatch(updateInvestment(investment)),
    openModal: (type, account) => dispatch(openModal(type, account))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dash)
