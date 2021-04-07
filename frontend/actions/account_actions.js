import * as AccountAPIUtil from '../util/account_api_util';

export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT';
export const RECEIVE_ALL_ACCOUNTS = 'RECEIVE_ALL_ACCOUNTS';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';
export const RECEIVE_ACCOUNT_ERRORS = 'RECEIVE_ACCOUNT_ERRORS';
export const REMOVE_ACCOUNT_ERRORS = 'RECEIVE_ACCOUNT_ERRORS';


const receiveAllAccounts = (accounts) => ({
    type: RECEIVE_ALL_ACCOUNTS,
    accounts
});

const receiveAccount = (account) => ({
    type: RECEIVE_ACCOUNT,
    account
});

const removeAccount = (accountId) => ({
    type: REMOVE_ACCOUNT,
    accountId
});

const receiveErrors = (errors) => ({
    type: RECEIVE_ACCOUNT_ERRORS,
    errors
});

export const removeAccountErrors = (errors) => ({
    type: REMOVE_ACCOUNT_ERRORS,
    errors
});

export const fetchAccounts = () => dispatch => (
    AccountAPIUtil.indexAccounts()
    .then(accounts => (
        dispatch(receiveAllAccounts(accounts))
    ))
);

export const fetchAccount = (accountId) => dispatch => (
    AccountAPIUtil.showAccount(accountId)
    .then(account => (
        dispatch(receiveAccount(account))
    ))
);

export const createAccount = account => dispatch => (
    AccountAPIUtil.newAccount(account)
    .then(account => (
        dispatch(receiveAccount(account))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);

export const updateAccount = account => dispatch => (
    AccountAPIUtil.updateAccount(account)
    .then(account => (
        dispatch(receiveAccount(account))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);

export const deleteAccount = accountId => dispatch => (
    AccountAPIUtil.deleteAccount(accountId)
    .then( () => (
        dispatch(removeAccount(accountId))
    ))
);


