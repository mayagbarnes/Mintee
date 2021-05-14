
export const showAccount = (accountId) => (
    $.ajax({
        method: 'GET',
        url: `/api/accounts/${accountId}`
    })
);

export const indexAccounts = (signal) => (
     fetch('/api/accounts', {
        method: 'GET',
        signal: signal
    })
    .then((response) => response.json())
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

