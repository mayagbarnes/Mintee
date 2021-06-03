import React from 'react';
import {Link} from 'react-router-dom';
import CurrentMonthChart from "../charts/month_chart";
import SpendingTrendChart from "../charts/spending_chart";


class DashTransactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: 'month',
        }
        this.handleTransactionClick = this.handleTransactionClick.bind(this)
    }

    // handle which transaction chart to render
    handleTransactionClick(e) {
        e.preventDefault();
        this.setState({chart: e.currentTarget.value})
    }

    render() {
        let monthClass = '';
        let quarterClass = '';
        if(this.state.chart === 'month') {
            monthClass = 'selected';
            quarterClass = 'unselected';
        } else if(this.state.chart === 'quarter') {
            monthClass = 'unselected';
            quarterClass = 'selected';
        }

        return (
            <div className='dashboard'>
                <header className='dash-trans-heading'>
                        <h2>TRANSACTION TRENDS</h2>
                        <div className='view-button-container'>
                            <button className='view-button'>
                            <Link to="/transactions">
                                <p className='icon'></p>
                                <div className='button-text'>View Transactions</div>
                            </Link>
                            </button>
                        </div>
                </header>
                <div className='chart-select-container'>
                    <button className={`chart-select-button-${monthClass}`} value="month" onClick={this.handleTransactionClick}>
                        Current Month
                    </button>
                    <button className={`chart-select-button-${quarterClass} spending-tab`} value="quarter" onClick={this.handleTransactionClick}>
                        Spending Trend
                    </button>
                </div>
                <div className={`current-chart-div-${monthClass}`}>
                    <CurrentMonthChart fetchTransactions={this.props.fetchTransactions} transactions={this.props.transactions}/>
                </div>
                <div className={`current-chart-div-${quarterClass}`}>
                    <SpendingTrendChart fetchTransactions={this.props.fetchTransactions} transactions={this.props.transactions}/>
                </div>
            </div>    
        )
    }
}

export default DashTransactions;
