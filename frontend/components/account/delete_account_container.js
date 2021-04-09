import {connect} from 'react-redux';
import {deleteAccount} from '../../actions/account_actions';
import {closeModal} from '../../actions/account_modal_actions'
import DeleteAccountForm from '../../components/account/delete_account_form';

const mapStateToProps = (state, ownProps) => ({
    account: state.entities.accounts[ownProps.accountId],
});

const mapDispatchToProps = (dispatch) => ({
    deleteAccount: (accountId) => dispatch(deleteAccount(accountId)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccountForm)
