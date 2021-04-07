
export const showAccount = (account) => (
    $.ajax({
        method: 'GET',
        url: `/api/accounts/${account.id}`,
        data: {account}
    })
);

export const indexAccounts = (accounts) => (
    $.ajax({
        method: 'GET',
        url: '/api/accounts',
        data: {accounts}
    })
);

export const newAccount = (account) => (
    $.ajax({
        method: 'POST',
        url: '/api/accounts',
        data: {account}
    })
);

export const updateAccount = (account) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/accounts/${account.id}`,
        data: {account}
    })
);

export const deleteAccount = (accountId) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/accounts/${accountId}`
    })
);

