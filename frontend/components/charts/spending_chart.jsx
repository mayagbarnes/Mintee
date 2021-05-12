import React, { Component } from 'react'
import Chart from 'chart.js/auto';

// //--Chart Style Options--//
// // Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
// // Chart.defaults.global.legend.display = false;
// //--Chart Style Options--//

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

        new Chart(myChartRef, {
            type: 'bar',
            data: {
                labels: [Month1Label, Month2Label, Month3Label],
                datasets: [{
                    label: 'Spending ($)',
                    data: [Month1Spending, Month2Spending, Month3Spending],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                       'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1
                }]
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