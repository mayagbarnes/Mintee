import React from 'react';
import {connect} from 'react-redux';
import {updateInvestment, fetchInvestment, receiveInvestmentErrors} from '../../actions/investment_actions';
import InvestmentForm from './investment_form';
import {closeModal} from '../../actions/account_modal_actions'


class UpdateInvestmentForm extends React.Component {
  componentDidMount() {
    this.props.fetchInvestment(this.props.investment.id)
  }

  render () {
    const { investment, accounts, formHeading, formType, errors, action, closeModal, receiveInvestmentErrors} = this.props;
    return (
      <InvestmentForm
        investment={investment}
        accounts={accounts}
        formHeading={formHeading}
        formType={formType}
        errors={errors}
        action={action}
        closeModal={closeModal}
        receiveInvestmentErrors={receiveInvestmentErrors}
         />
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
    investment: state.entities.investments[ownProps.investmentId],
    accounts: Object.values(state.entities.accounts),
    formHeading: 'Update Investment',
    formType: 'Update',
    errors: state.errors.investments,
});

const mapDispatchToProps = (dispatch) => ({
    action: (investment) => dispatch(updateInvestment(investment)),
    closeModal: () => dispatch(closeModal()),
    receiveInvestmentErrors: (error) => dispatch(receiveInvestmentErrors(error)),
    fetchInvestment: (investmentId) => dispatch(fetchInvestment(investmentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInvestmentForm)
