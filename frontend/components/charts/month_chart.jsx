import React, { Component } from 'react'
import Chart from 'chart.js/auto';


export default class CurrentMonthChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        this.chartRef = React.createRef();
    }

   componentDidMount() {
        this.props.fetchTransactions()
        .then( () =>  this.buildChart())
        .then( () => this.setState({loading:false}))
   }

    buildChart() {
        const myChartRef = this.chartRef.current.getContext("2d");

        let currDate = new Date().getMonth();
        let spending = this.totalSpend(this.getMonth(currDate + 1));
        let income = this.totalIncome(this.getMonth(currDate + 1))

        Chart.defaults.font.size = 18;

        let monthChart = new Chart(myChartRef, {
            type: 'bar',
            data: {
                labels: ["Income", "Spending"],
                datasets: [{
                    label: 'Total',
                    data: [income, spending],
                    backgroundColor: [ 
                        'rgba(7, 163, 98, 0.6)', 
                        'rgba(232, 9, 20, 0.6)'
                    ],
                    borderColor: [
                        'rgb(6, 122, 74)', 
                        'rgb(179, 5, 14)'
                    ],
                    borderWidth: 3
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

    
//     // calculate the total spent that month 
    totalSpend(month){
        let total = 0;
        this.props.transactions.forEach((trans)=>{
            if (trans.category !== 'Income'){
                let monthString = trans.date.slice(5,7);
        
                if(monthString === month){
                    total += Number(trans.amount)
                }
            }
        })
        return -total;
    }

//     // calculate the total spent that month 
    totalIncome(month){
        let total = 0;
        this.props.transactions.forEach((trans)=>{
            if (trans.category === 'Income'){
                let monthString = trans.date.slice(5,7);
                if(monthString === month){
                    total += Number(trans.amount)
                }
            }
        })
        return total;
    }

//     // get correct month string for testing 
    getMonth(month){
        if (month < 10){
            month = '0' + month;
        } else {
            month = month.toString();
        }
        return month;
    }

//     // get correct month label for graph 
    label(month){
        let monthArr = ['January', 'February', 'March', 
        'April', 'May', 'June', 'July', 
        'August', 'September', 'October', 'November', 'December'];

        return monthArr[month]
    }

    render() {
        let currDate = new Date().getMonth();
        let monthLabel = this.label(currDate);
    
        let display;
        if(this.state.loading) {
            display =  <div className='loader-container'><div className='loader'></div></div>
        } else {
            display = <div className='hidden'></div>
        }

        return (
            <div className='spending-trend-container'>
                <h2>{monthLabel}'s Month to Date Spending</h2>
                <canvas id="myChart" ref={this.chartRef}> 
                </canvas>
                {display}
            </div>
        )
    }
}