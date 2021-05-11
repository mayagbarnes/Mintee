import React, { Component } from 'react'
import Chart from 'chart.js/auto';

// //--Chart Style Options--//
// // Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
// // Chart.defaults.global.legend.display = false;
// //--Chart Style Options--//

export default class CurrenMonthChart extends Component {
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
        let spending = this.totalSpend(this.getMonth(currDate));
        let income = this.totalIncome(this.getMonth(currDate))


        new Chart(myChartRef, {
            type: 'bar',
            data: {
                labels: ["Income", "Spending"],
                datasets: [{
                    label: 'Total ($)',
                    data: [income, spending],
                    backgroundColor: [ 
                        'rgba(75, 192, 192, 0.2)', 
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgb(75, 192, 192)', 
                        'rgb(255, 99, 132)'
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

        return (
            <div className='spending-trend-container'>
                <h2>{monthLabel}'s Month to Date Spending</h2>
                <canvas id="myChart" ref={this.chartRef}/>
            </div>
        )
    }
}