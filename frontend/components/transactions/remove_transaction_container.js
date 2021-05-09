import {connect} from 'react-redux';
import {deleteTransaction} from '../../actions/transaction_actions';
import {fetchAccount} from '../../actions/account_actions';
import RemoveTransactionForm from './remove_transaction_form';
import {closeModal} from '../../actions/account_modal_actions'

const mapStateToProps = (state, ownProps) => ({
    transaction: state.entities.transactions[ownProps.transactionId]
});

const mapDispatchToProps = (dispatch) => ({
    deleteTransaction: (transactionId) => dispatch(deleteTransaction(transactionId)),
    fetchAccount: (accountId) => dispatch(fetchAccount(accountId)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveTransactionForm)
