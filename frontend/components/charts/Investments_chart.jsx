import React, { Component } from 'react'
import Chart from 'chart.js/auto';


// Option 1: Pass each ticker to build ind chart
// Option 2: Promise.all to resolve each of the data fetches in one chart

export default class InvestmentChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            // data: [],
            investment: this.props.investment
        }
        this.chartRef = React.createRef();
    }

   componentDidMount() {
        // this.props.fetchInvestments()
        // .then( () =>  this.buildChart())
        // .then( () => this.setState({loading:false}))
        this.getData()
        this.setState({loading:false})
   }

    getData() {
        let ticker = this.state.investment.ticker;
        let apikey = window.finnhubAPIKey;
        let current = (Date.now() / 1000);
        let yearAgo = current - Number(31556926);
        current = current.toFixed(0)
        yearAgo = yearAgo.toFixed(0)

        fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${yearAgo}&to=${current}&token=${apikey}`)
            .then(response => response.json())
            .then(data => {
                this.buildChart(data["c"], data["t"])
            });
       
        // labels variable is the date at each point between two times
    }

    convertTimestamps(timestamps){
        let labelsArray = timestamps.map( UNIX => {
            let newDate = new Date(UNIX * 1000);
            let year = newDate.getFullYear().toString().slice(2);
            let month = newDate.getMonth() + 1;
            let date = newDate.getDate();
            let label = month + '/' + date + '/' + year
            return label
        })
        return labelsArray;
    }

    buildChart(datapoints, timestamps) {
        let labels = this.convertTimestamps(timestamps)

        const myChartRef = this.chartRef.current.getContext("2d");
        Chart.defaults.font.size = 18;

        new Chart(myChartRef, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Price',
                    data: datapoints,
                    // backgroundColor: [ 
                    //     'rgba(7, 163, 98, 0.6)', 
                    //     'rgba(232, 9, 20, 0.6)'
                    // ],
                    borderColor: [
                        'rgb(6, 122, 74)', 
                        // 'rgb(179, 5, 14)'
                    ],
                    // borderWidth: 3
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 20
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                             label: function(context) {
                                var label = context.dataset.label || '';

                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    },
                },
                scales: {
                    y: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value, index, values) {
                                return '$' + value;
                            },
                        },
                    }
                }
            }
        });
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
                <h2>Trailing Year Stock Price</h2>
                <h3>{this.state.investment.inv_name} ({this.state.investment.ticker})</h3>
                <canvas id="myChart" ref={this.chartRef}> 
                </canvas>
                {display}
            </div>
        )
    }
}


 // let promiseArray = this.props.investments.map((inv) => {
        //     return new Promise((resolve) => {
        //         resolve(fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${inv.ticker}&resolution=D&from=${yearAgo}&to=${current}&token=${apikey}`)
        //         .then(response => response.json())
        //         .then(quote => quote["c"]));
        //     })
        // });
        
        // const fetching = async() => { 
        //     const values = [];
        //     const labels = [];
            
        //     this.props.investments.forEach( async(inv) => {
        //         const data = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${inv.ticker}&resolution=D&from=${yearAgo}&to=${current}&token=${apikey}`)
        //         const response = await data.json();

        //         const quotes = response["c"];
        //         const labelVals = response["t"];

        //         console.log(quotes)

        //         values.push(quotes)
        //         labels.push(labelVals)
        //     });
        //     return true;
        // }

        // await fetching();
        // console.log(values)
        // console.log(labels)
        
