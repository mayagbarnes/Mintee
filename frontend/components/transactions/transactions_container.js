import {connect} from 'react-redux';
import {fetchTransactions, fetchFilteredTransactions} from '../../actions/transaction_actions';
import Transactions from './transactions';
import {openModal} from '../../actions/account_modal_actions';

 const starter = (a,b) => {
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0 }

const mapStateToProps = (state) => ({
    transactions: Object.values(state.entities.transactions).sort(starter),
    filtered: Object.values(state.entities.filteredTran).sort(starter),
    errors: state.errors.transactions,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchFilteredTransactions: (string) => dispatch(fetchFilteredTransactions(string)),
    openModal: (type, transaction) => dispatch(openModal(type, transaction))
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
