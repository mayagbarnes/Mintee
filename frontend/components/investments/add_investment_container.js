import {connect} from 'react-redux';
import {createInvestment, fetchInvestments, receiveInvestmentErrors} from '../../actions/investment_actions';
import {fetchAccounts} from '../../actions/account_actions';
import {closeModal} from '../../actions/account_modal_actions'
import {fetchStocks} from '../../actions/stock_actions';
import InvestmentForm from './investment_form';

const mapStateToProps = (state) => ({
    investment: {
        inv_name: '',
        ticker: '',
        shares: '',
        prev_close: '',
        price_paid: '',
        account_id: '',
        last_fetch: '',
    },
    stocks: state.entities.stocks,
    accounts: Object.values(state.entities.accounts),
    formHeading: 'Create New Investment',
    formType: 'Create',
    errors: state.errors.investments,
});

const mapDispatchToProps = (dispatch) => ({
    action: (investment) => dispatch(createInvestment(investment)),
    receiveInvestmentErrors: (error) => dispatch(receiveInvestmentErrors(error)),
    fetchAccounts: () => dispatch(fetchAccounts()),
    fetchStocks: () => dispatch(fetchStocks()),
    fetchInvestments: () => dispatch(fetchInvestments()),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentForm)
