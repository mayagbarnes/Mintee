import React from 'react';
import {connect} from 'react-redux';
import {updateTransaction, fetchTransaction} from '../../actions/transaction_actions';
import TransactionForm from './transaction_form';
import {closeModal} from '../../actions/account_modal_actions'


class UpdateTransactionForm extends React.Component {
  componentDidMount() {
    this.props.fetchTransaction(this.props.transaction.id)
  }

  render () {
    const { transaction, accounts, formHeading, formType, errors, action, closeModal} = this.props;
    return (
      <TransactionForm
        transaction={transaction}
        accounts={accounts}
        formHeading={formHeading}
        formType={formType}
        errors={errors}
        action={action}
        closeModal={closeModal}
         />
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
    transaction: state.entities.transactions[ownProps.transactionId],
    accounts: Object.values(state.entities.accounts),
    formHeading: 'Update Transaction',
    formType: 'Update',
    errors: state.errors.transactions,
});

const mapDispatchToProps = (dispatch) => ({
    action: (transaction) => dispatch(updateTransaction(transaction)),
    closeModal: () => dispatch(closeModal()),
    fetchTransaction: (transactionId) => dispatch(fetchTransaction(transactionId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTransactionForm)
