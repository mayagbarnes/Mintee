import React, { Component } from 'react'
import Chart from 'chart.js/auto';


export default class InvestmentChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
        }
        this.chartRef = React.createRef();
    }

   componentDidMount() {
        this.props.fetchInvestments()
        .then( () =>  this.buildChart())
        .then( () => this.setState({loading:false}))
   }

//    buildDates() {
//     let today = Date.now()

//    }

    buildChart = async() => {
        let apikey = window.finnhubAPIKey;
        let current = (Date.now() / 1000);
        let yearAgo = current - Number(31556926);
        current = current.toFixed(0)
        yearAgo = yearAgo.toFixed(0)

        // let array = this.props.investments.map((inv) => {
        //     fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${inv.ticker}&resolution=D&from=${yearAgo}&to=${current}&token=${apikey}`)
        //         .then(response => response.json())
        //         .then(quote => quote["c"]);
        // })

        
        const fetching = async() => { 
            const values = [];
            const labels = [];
            
            this.props.investments.forEach( async(inv) => {
                const data = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${inv.ticker}&resolution=D&from=${yearAgo}&to=${current}&token=${apikey}`)
                const response = await data.json();

                const quotes = response["c"];
                const labelVals = response["t"];

                console.log(quotes)

                values.push(quotes)
                labels.push(labelVals)
            });
            return true;
        }

        await fetching();
        console.log(values)
        console.log(labels)
        

        // labels variable is the date at each point between two times

        const myChartRef = this.chartRef.current.getContext("2d");
        Chart.defaults.font.size = 18;

        // let invChart = new Chart(myChartRef, {
        //     type: 'line',
        //     data: {
        //         labels: labels,
        //         datasets: [{
        //             label: 'Total',
        //             data: data,
        //             backgroundColor: [ 
        //                 'rgba(7, 163, 98, 0.6)', 
        //                 'rgba(232, 9, 20, 0.6)'
        //             ],
        //             borderColor: [
        //                 'rgb(6, 122, 74)', 
        //                 'rgb(179, 5, 14)'
        //             ],
        //             borderWidth: 3
        //         }]
        //     },
        //     options: {
        //         plugins: {
        //             legend: {
        //                 labels: {
        //                     font: {
        //                         size: 20
        //                     }
        //                 }
        //             },
        //             tooltip: {
        //                 callbacks: {
        //                      label: function(context) {
        //                         var label = context.dataset.label || '';

        //                         if (label) {
        //                             label += ': ';
        //                         }
        //                         if (context.parsed.y !== null) {
        //                             label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
        //                         }
        //                         return label;
        //                     }
        //                 }
        //             },
        //         },
        //         scales: {
        //             y: {
        //                 ticks: {
        //                     // Include a dollar sign in the ticks
        //                     callback: function(value, index, values) {
        //                         return '$' + value;
        //                     },
        //                 },
        //             }
        //         }
        //     }
        // });
    }

    render() {
    
        let display;
        if(this.state.loading) {
            display =  <div className='loader-container'><div className='loader'></div></div>
        } else {
            display = <div className='hidden'></div>
        }

        return (
            <div className='spending-trend-container'>
                <h2>Trailing Year Stock Prices</h2>
                <canvas id="myChart" ref={this.chartRef}> 
                </canvas>
                {display}
            </div>
        )
    }
}