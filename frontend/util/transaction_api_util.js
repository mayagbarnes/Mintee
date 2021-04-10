
export const showTransaction = (transactionId) => (
    $.ajax({
        method: 'GET',
        url: `/api/transactions/${transactionId}`
    })
);

export const indexTransactions = () => (
    $.ajax({
        method: 'GET',
        url: '/api/transactions'
    })
);

export const newTransaction = (transaction) => (
    $.ajax({
        method: 'POST',
        url: '/api/transactions',
        data: {transaction}
    })
);

export const updateTransaction = (transaction) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/transactions/${transaction.id}`,
        data: {transaction}
    })
);

export const deleteTransaction = (transactionId) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/transactions/${transactionId}`
    })
);

