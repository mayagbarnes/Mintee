import {connect} from 'react-redux';
import {fetchTransactions} from '../../actions/transaction_actions';
import Transactions from './transactions';
import {openModal} from '../../actions/account_modal_actions';

const mapStateToProps = (state) => ({
    transactions: Object.values(state.entities.transactions),
    errors: state.errors.transactions,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTransactions: () => dispatch(fetchTransactions()),
    openModal: (type, transaction) => dispatch(openModal(type, transaction))
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
