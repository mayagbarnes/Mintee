import React, { Component } from 'react'
import Chart from 'chart.js/auto';

// buttons - add time period chart display mechanism

export default class InvestmentChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            investment: this.props.investment,
            timePeriod: 'year'
        }
        this.chartRef = React.createRef();
        this.handleTimePeriodClick = this.handleTimePeriodClick.bind(this)
    }

   componentDidMount() {
        this.getData()
        this.setState({loading:false})
   }

//    componentDidUpdate() {
//         this.getData()
//    }

   // handle which investment chart to render
    handleTimePeriodClick(e) {
        e.preventDefault();
        this.setState({timePeriod: e.currentTarget.value})
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
            .then(data => {
                this.buildChart(data["c"], data["t"])
            });
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
                {/* <h3>Time Periods:</h3>
                    <div className='view-button-container'>
                        <button className='view-button' value="quarter" onClick={this.handleTimePeriodClick}>
                        3 Months
                        </button>
                        <button className='view-button' value="6 month" onClick={this.handleTimePeriodClick}>
                        6 Months
                        </button>
                        <button className='view-button' value="year" onClick={this.handleTimePeriodClick}>
                        12 Months
                        </button>
                    </div> */}
                <h2>Stock Price - Last 12 Months</h2>
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
        
        // let yearAgo = current - Number(31556926);
        // let sixMonthsAgo = current - Number(15778463);
        // let threeMonthsAgo = current - Number(7889231);
        // current = current.toFixed(0)
        // yearAgo = yearAgo.toFixed(0)
        // sixMonthsAgo = sixMonthsAgo.toFixed(0)
        // threeMonthsAgo = threeMonthsAgo.toFixed(0)