// export const indexStocks = () => (
//     $.ajax({
//         method: 'GET',
//         url: '/api/stocks'
//     })
// );

export const indexStocks = (signal) => (
   fetch('/api/stocks', {
        method: 'GET',
        signal: signal
    })
    .then((response) => response.json())
);