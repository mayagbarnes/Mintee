import React from 'react';
import {connect} from 'react-redux';
import {updateAccount, fetchAccount} from '../../actions/account_actions';
import AccountForm from './account_form';
import {closeModal} from '../../actions/account_modal_actions';


class UpdateAccountForm extends React.Component {
  componentDidMount() {
    this.props.fetchAccount(this.props.account.id)
  }

  render () {
    const { account, formHeading, formType, errors, action, closeModal} = this.props;
    return (
      <AccountForm
        account={account}
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
    account: state.entities.accounts[ownProps.accountId],
    formHeading: 'Update Account',
    formType: 'Update',
    errors: state.errors.accounts,
});

const mapDispatchToProps = (dispatch) => ({
    action: (account) => dispatch(updateAccount(account)),
    closeModal: () => dispatch(closeModal()),
    fetchAccount: (accountId) => dispatch(fetchAccount(accountId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccountForm)
