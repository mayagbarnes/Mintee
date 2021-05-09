import {connect} from 'react-redux';
import {createTransaction} from '../../actions/transaction_actions';
import {fetchAccount} from '../../actions/account_actions';
import TransactionForm from './transaction_form';
import {closeModal} from '../../actions/account_modal_actions'

const mapStateToProps = (state) => ({
    transaction: {
        date: '',
        description: '',
        category: '',
        amount: '',
        account_id: '',
    },
    accounts: Object.values(state.entities.accounts),
    formHeading: 'Create New Transaction',
    formType: 'Create',
    errors: state.errors.transactions,
});

const mapDispatchToProps = (dispatch) => ({
    action: (transaction) => dispatch(createTransaction(transaction)),
    fetchAccount: (accountId) => dispatch(fetchAccount(accountId)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm)
