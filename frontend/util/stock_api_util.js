export const indexStocks = () => (
    $.ajax({
        method: 'GET',
        url: '/api/stocks'
    })
);