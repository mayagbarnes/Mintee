import {connect} from 'react-redux';
import {createInvestment} from '../../actions/investment_actions';
import InvestmentForm from './investment_form';
import {closeModal} from '../../actions/account_modal_actions'

const mapStateToProps = (state) => ({
    investment: {
        inv_name: '',
        ticker: '',
        shares: '',
        price_paid: '',
        account_id: '',
    },
    accounts: Object.values(state.entities.accounts),
    formHeading: 'Create New Investment',
    formType: 'Create',
    errors: state.errors.investments,
});

const mapDispatchToProps = (dispatch) => ({
    action: (investment) => dispatch(createInvestment(investment)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentForm)
