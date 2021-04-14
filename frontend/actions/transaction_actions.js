import * as TransactionAPIUtil from '../util/transaction_api_util';

export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';
export const RECEIVE_TRANSACTION_ERRORS = 'RECEIVE_TRANSACTION_ERRORS';
export const REMOVE_TRANSACTION_ERRORS = 'RECEIVE_TRANSACTION_ERRORS';
export const RECEIVE_FILTERED_TRANSACTIONS = 'RECEIVE_FILTERED_TRANSACTIONS';


const receiveTransactions = (transactions) => ({
    type: RECEIVE_TRANSACTIONS,
    transactions
});

const receiveTransaction = (transaction) => ({
    type: RECEIVE_TRANSACTION,
    transaction
});

const removeTransaction = (transactionId) => ({
    type: REMOVE_TRANSACTION,
    transactionId
});

const receiveTransactionErrors = (errors) => ({
    type: RECEIVE_TRANSACTION_ERRORS,
    errors
});

export const fetchTransactions = () => dispatch => (
    TransactionAPIUtil.indexTransactions()
    .then(transactions => (dispatch(receiveTransactions(transactions))
    ))
);

export const fetchTransaction = (transactionId) => dispatch => (
    TransactionAPIUtil.showTransaction(transactionId)
    .then(transaction => dispatch(receiveTransaction(transaction)))
);

export const createTransaction = transaction => dispatch => (
    TransactionAPIUtil.newTransaction(transaction)
    .then(transaction => (
        dispatch(receiveTransaction(transaction))
    ), err => (
        dispatch(receiveTransactionErrors(err.responseJSON))
    ))
);

export const updateTransaction = transaction => dispatch => (
    TransactionAPIUtil.updateTransaction(transaction)
    .then(transaction => (
        dispatch(receiveTransaction(transaction))
    ), err => (
        dispatch(receiveTransactionErrors(err.responseJSON))
    ))
);

export const deleteTransaction = transactionId => dispatch => (
    TransactionAPIUtil.deleteTransaction(transactionId)
    .then( () => (
        dispatch(removeTransaction(transactionId))
    ))
);



const receiveFilteredTransactions = (transactions) => ({
    type: RECEIVE_FILTERED_TRANSACTIONS,
    transactions
});

export const fetchFilteredTransactions = (string) => dispatch => (
    TransactionAPIUtil.searchTransactions(string)
    .then(transactions => (dispatch(receiveFilteredTransactions(transactions))
    ))
);


