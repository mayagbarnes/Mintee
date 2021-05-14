
export const showInvestment = (investmentId) => (
    $.ajax({
        method: 'GET',
        url: `/api/investments/${investmentId}`
    })
);

export const indexInvestments = (signal) => (
    fetch('/api/investments', {
        method: 'GET',
        signal: signal
    })
    .then((response) => response.json())
);

export const newInvestment = (investment) => (
    $.ajax({
        method: 'POST',
        url: '/api/investments',
        data: {investment}
    })
);

export const updateInvestment = (investment) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/investments/${investment.id}`,
        data: {investment}
    })
);

export const deleteInvestment = (investmentId) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/investments/${investmentId}`
    })
);

export const searchInvestments = (string) => (
    $.ajax({
        method: 'GET',
        url: '/api/investments/search',
        data: {query: string}
    })
);
