import React, { Component } from 'react'
import Chart from 'chart.js/auto';

export default class InvestmentChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            investment: this.props.investment,
            timePeriod: this.props.timePeriod
        }
        this.chartRef = React.createRef();
    }

   componentDidMount() {
    this.getData();
   }

    getData() {
        let ticker = this.state.investment.ticker;
        let apikey = window.finnhubAPIKey;
        let current = (Date.now() / 1000);
        let startTime;
        switch(this.state.timePeriod) {
            case 'year':
                startTime = current - Number(31556926);
                break;
            case '6 month':
                startTime = current - Number(15778463);
                break;
            case 'quarter':
                startTime = current - Number(7889231);
                break;
        }
        current = current.toFixed(0)
        startTime = startTime.toFixed(0)

        fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${startTime}&to=${current}&token=${apikey}`)
            .then(response => response.json())
            .then(data => { this.buildChart(data["c"], data["t"]) })
            .then( () => this.setState({loading: false}));
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
        Chart.defaults.font.size = 17;

        
        let myLineChart = new Chart(myChartRef, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${this.state.investment.inv_name} (${this.state.investment.ticker})`,
                    data: datapoints,
                    borderColor: [
                        'rgb(6, 122, 74)', 
                    ],
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 20,
                            },
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
                    },
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

        let chartTitle;
        if(this.state.timePeriod === 'year'){
            chartTitle = 'Stock Price - Last 12 Months'
        } else if (this.state.timePeriod === '6 month') {
            chartTitle = 'Stock Price - Last 6 Months'
        } else {
            chartTitle = 'Stock Price - Last 3 Months'
        }

        return (
            <div className='spending-trend-container'>
                <h2>{chartTitle}</h2>
                <canvas id="myChart" ref={this.chartRef}> 
                </canvas>
                {display}
            </div>
        )
    }
}
