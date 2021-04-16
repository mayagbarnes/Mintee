import * as InvestmentAPIUtil from '../util/investment_api_util';

export const RECEIVE_INVESTMENT = 'RECEIVE_INVESTMENT';
export const RECEIVE_INVESTMENTS = 'RECEIVE_INVESTMENTS';
export const REMOVE_INVESTMENT = 'REMOVE_INVESTMENT';
export const RECEIVE_INVESTMENT_ERRORS = 'RECEIVE_INVESTMENT_ERRORS';
export const REMOVE_INVESTMENT_ERRORS = 'RECEIVE_INVESTMENT_ERRORS';
export const RECEIVE_FILTERED_INVESTMENTS = 'RECEIVE_FILTERED_INVESTMENTS';


const receiveInvestments = (investments) => ({
    type: RECEIVE_INVESTMENTS,
    investments
});

export const receiveInvestment = (investment) => ({
    type: RECEIVE_INVESTMENT,
    investment
});

const removeInvestment = (investmentId) => ({
    type: REMOVE_INVESTMENT,
    investmentId
});

export const receiveInvestmentErrors = (errors) => ({
    type: RECEIVE_INVESTMENT_ERRORS,
    errors
});

export const fetchInvestments = () => dispatch => (
    InvestmentAPIUtil.indexInvestments()
    .then(investments => (dispatch(receiveInvestments(investments))
    ))
);

export const fetchInvestment = (investmentId) => dispatch => (
    InvestmentAPIUtil.showInvestment(investmentId)
    .then(investment => dispatch(receiveInvestment(investment)))
);

export const createInvestment = investment => dispatch => {
    // if(investment.price === 0) return;
    return InvestmentAPIUtil.newInvestment(investment)
    .then(investment => (
        dispatch(receiveInvestment(investment))
    ), err => (
        dispatch(receiveInvestmentErrors(err.responseJSON))
    ))
};

export const updateInvestment = investment => dispatch => (
    InvestmentAPIUtil.updateInvestment(investment)
    .then(investment => (
        dispatch(receiveInvestment(investment))
    ), err => (
        dispatch(receiveInvestmentErrors(err.responseJSON))
    ))
);

export const deleteInvestment = investmentId => dispatch => (
    InvestmentAPIUtil.deleteInvestment(investmentId)
    .then( () => (
        dispatch(removeInvestment(investmentId))
    ))
);


const receiveFilteredInvestments = (investments) => ({
    type: RECEIVE_FILTERED_INVESTMENTS,
    investments
});


export const fetchFilteredInvestments = (string) => dispatch => (
    InvestmentAPIUtil.searchInvestments(string)
    .then(investments => (dispatch(receiveFilteredInvestments(investments))
    ))
);



