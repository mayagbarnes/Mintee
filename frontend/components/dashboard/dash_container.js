import {connect} from 'react-redux';
import {fetchAccounts, createAccount, updateAccount, deleteAccount} from '../../actions/account_actions';
import Dash from './dash';
import {openModal} from '../../actions/account_modal_actions';

const mapStateToProps = (state) => ({
    accounts: Object.values(state.entities.accounts),
    errors: state.errors.accounts,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAccounts: () => dispatch(fetchAccounts()),
    createAccount: (account) => dispatch(createAccount(account)),
    deleteAccount: (accountId) => dispatch(deleteAccount(accountId)),
    openModal: (type, account) => dispatch(openModal(type, account))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dash)
