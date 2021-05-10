import {connect} from 'react-redux';
import {fetchInvestments, fetchFilteredInvestments, receiveInvestment, updateInvestment} from '../../actions/investment_actions';
import Investments from './investment_main';
import {openModal} from '../../actions/account_modal_actions';

 const starter = (a,b) => {
        return a.market_value > b.market_value ? -1 : a.market_value < b.market_value ? 1 : 0 }

const mapStateToProps = (state) => ({
    investments: Object.values(state.entities.investments).sort(starter),
    filtered: Object.values(state.entities.filteredInv).sort(starter),
    errors: state.errors.investments,
});

const mapDispatchToProps = (dispatch) => ({
    fetchInvestments: () => dispatch(fetchInvestments()),
    receiveInvestment: (investment) => dispatch(receiveInvestment(investment)),
    updateInvestment: (investment) => dispatch(updateInvestment(investment)),
    fetchFilteredInvestments: (string) => dispatch(fetchFilteredInvestments(string)),
    openModal: (type, investment) => dispatch(openModal(type, investment))
});

export default connect(mapStateToProps, mapDispatchToProps)(Investments)
