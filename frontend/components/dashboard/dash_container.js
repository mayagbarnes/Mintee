import {connect} from 'react-redux';
import {fetchAccounts, createAccount, updateAccount, deleteAccount} from '../../actions/account_actions';
import Dash from './dash';
import {removeAccountErrors} from '../../actions/account_actions';

const mapStateToProps = (state) => ({
    accounts: state.accounts,
    errors: state.errors.accounts,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAccounts: () => dispatch(fetchAccounts()),
    createAccount: (account) => dispatch(createAccount(account)),
    updateAccount: (account) => dispatch(updateAccount(account)),
    deleteAccount: (account) => dispatch(deleteAccount(account)),
    clearErrors: () => dispatch(removeAccountErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dash)
