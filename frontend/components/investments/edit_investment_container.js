import React from 'react';
import {connect} from 'react-redux';
import {updateInvestment, fetchInvestment, fetchInvestments, receiveInvestmentErrors} from '../../actions/investment_actions';
import {fetchAccount} from '../../actions/account_actions';
import InvestmentForm from './investment_form';
import {fetchStocks} from '../../actions/stock_actions';
import {closeModal} from '../../actions/account_modal_actions'


class UpdateInvestmentForm extends React.Component {
  componentDidMount() {
    this.props.fetchInvestment(this.props.investment.id)
  }

  render () {
    const { investment, stocks, accounts, formHeading, formType, errors, action, closeModal, receiveInvestmentErrors, fetchAccount, fetchStocks, fetchInvestments} = this.props;
    return (
      <InvestmentForm
        investment={investment}
        stocks={stocks}
        accounts={accounts}
        formHeading={formHeading}
        formType={formType}
        errors={errors}
        action={action}
        closeModal={closeModal}
        receiveInvestmentErrors={receiveInvestmentErrors}
        fetchAccount={fetchAccount}
        fetchStocks={fetchStocks}
        fetchInvestments={fetchInvestments}
         />
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
    investment: state.entities.investments[ownProps.investmentId],
    stocks: state.entities.stocks,
    accounts: Object.values(state.entities.accounts),
    formHeading: 'Update Investment',
    formType: 'Update',
    errors: state.errors.investments,
});

const mapDispatchToProps = (dispatch) => ({
    action: (investment) => dispatch(updateInvestment(investment)),
    closeModal: () => dispatch(closeModal()),
    receiveInvestmentErrors: (error) => dispatch(receiveInvestmentErrors(error)),
    fetchAccount: (accountId) => dispatch(fetchAccount(accountId)),
    fetchStocks: () => dispatch(fetchStocks()),
    fetchInvestments: () => dispatch(fetchInvestments()),
    fetchInvestment: (investmentId) => dispatch(fetchInvestment(investmentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInvestmentForm)
