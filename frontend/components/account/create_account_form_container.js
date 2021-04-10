import {connect} from 'react-redux';
import {createAccount} from '../../actions/account_actions';
import AccountForm from './account_form';

import {closeModal} from '../../actions/account_modal_actions'

const mapStateToProps = (state) => ({
    account: {
        account_name: '',
        institution: '',
        category: '',
        balance: ''
    },
    formHeading: 'Create New Account',
    formType: 'Create',
    errors: state.errors.accounts,
});

const mapDispatchToProps = (dispatch) => ({
    action: (account) => dispatch(createAccount(account)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm)
