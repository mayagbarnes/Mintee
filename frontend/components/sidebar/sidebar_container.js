import {connect} from 'react-redux';
import {fetchAccounts, createAccount} from '../../actions/account_actions';
import Sidebar from './sidebar';
import {openModal} from '../../actions/account_modal_actions';

const mapStateToProps = (state) => ({
    accounts: Object.values(state.entities.accounts),
    errors: state.errors.accounts,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAccounts: () => dispatch(fetchAccounts()),
    createAccount: (account) => dispatch(createAccount(account)),
    openModal: (type, account) => dispatch(openModal(type, account))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
