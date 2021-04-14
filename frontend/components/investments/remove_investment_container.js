import {connect} from 'react-redux';
import {deleteInvestment} from '../../actions/investment_actions';
import RemoveInvestmentForm from './remove_investment_form';
import {closeModal} from '../../actions/account_modal_actions'

const mapStateToProps = (state, ownProps) => ({
    investment: state.entities.investments[ownProps.investmentId]
});

const mapDispatchToProps = (dispatch) => ({
    deleteInvestment: (investmentId) => dispatch(deleteInvestment(investmentId)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveInvestmentForm)
