import React, { Component } from 'react'
import Chart from 'chart.js/auto';

export default class SpendingTrendChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

   componentDidMount() {
        this.props.fetchTransactions()
        .then( () =>  this.buildChart())
   }

    buildChart() {
        const myChartRef = this.chartRef.current.getContext("2d");

        let currDate = new Date().getMonth();
        let Month3Label = this.label(currDate);
        let Month3Spending = this.totalSpend(this.getMonth(currDate + 1));
        let Month2Label = this.label(currDate-1);
        let Month2Spending = this.totalSpend(this.getMonth(currDate));
        let Month1Label = this.label(currDate-2);
        let Month1Spending = this.totalSpend(this.getMonth(currDate - 1));

        Chart.defaults.font.size = 18;
        
        new Chart(myChartRef, {
            type: 'bar',
            data: {
                labels: [Month1Label, Month2Label, Month3Label],
                datasets: [{
                    label: 'Spending',
                    data: [Month1Spending, Month2Spending, Month3Spending],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                    ],
                    borderColor: [
                       'rgba(13, 119, 189, 1)',
                        'rgba(44, 158, 133, 1)',
                        'rgba(227, 123, 20, 1)',
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

        return (
            <div className='spending-trend-container'>
                <h2> Last Quarter Spending Trend</h2>
                <canvas id="myChart" ref={this.chartRef}/>
            </div>
        )
    }
}