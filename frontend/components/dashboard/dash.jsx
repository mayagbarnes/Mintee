import React from 'react';
import MainNavContainer from '../main_nav/main_nav_container';
import AccountItem from '../account/account_item';
import { BsPlusCircle } from 'react-icons/bs';
import NavBar from '../nav_bar/nav_bar';
import { IoCashOutline } from 'react-icons/io5';
import {GoCreditCard} from 'react-icons/go'
import {BiLineChart} from 'react-icons/bi'
import CurrentMonthChart from "../charts/month_chart";
import SpendingTrendChart from "../charts/spending_chart";
import InvestmentChart from "../charts/inv_chart";

import { Link } from 'react-router-dom';

class Dash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: 'month',
            invChart: '',
            timePeriod: 'year',
        }
        this.handleTransactionClick = this.handleTransactionClick.bind(this)
        this.handleInvestmentClick = this.handleInvestmentClick.bind(this)
        this.handleTimePeriodClick = this.handleTimePeriodClick.bind(this)
    }

    componentDidMount() {
        this.props.fetchInvestments()
            .then( () => this.setState( {invChart: this.props.investments[0].ticker}))
            .then( () => this.updateInvestments())
            .then( () => this.props.fetchAccounts())
    }

    // handle which transaction chart to render
    handleTransactionClick(e) {
        e.preventDefault();
        this.setState({chart: e.currentTarget.value})
    }

     // handle which investment chart to render
    handleInvestmentClick(e) {
        e.preventDefault();
        this.setState({invChart: e.currentTarget.value})
    }

    // handle which time period to render
    handleTimePeriodClick(e) {
        e.preventDefault();
        this.setState({timePeriod: e.currentTarget.value})
    }

    // calculate the total spent that month 
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

    // calculate the total spent that month 
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

    // get correct month string for testing 
    getMonth(month){
        if (month < 10){
            month = '0' + month;
        } else {
            month = month.toString();
        }
        return month;
    }

     // get correct month label for graph 
    label(month){
        let monthArr = ['January', 'February', 'March', 
        'April', 'May', 'June', 'July', 
        'August', 'September', 'October', 'November', 'December'];

        return monthArr[month]
    }
    
    // Methods to update all investment values when user logs in 

    buildDateString() {
        let current_date = new Date();
        let month = String(current_date.getMonth() + 1);
        let day = String(current_date.getDate());
        let year = String(current_date.getFullYear());

        if (Number(month) < 10) {
            month = '0' + month
        } 
        if (Number(day) < 10) {
            day = '0' + day
        }

        return `${year}-${month}-${day}`;
    }

    testTime() {
        // market open @ 9:30 am EST
        var startTime = '06:30:00'; 
        // market close @ 4:00 PM EST
        var endTime = '13:00:00';

        let currentDate = new Date()   

        let startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startTime.split(":")[2]);

        let endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(endTime.split(":")[2]);

        return (startDate < currentDate && endDate > currentDate) ? true : false
    }

    updateInvestments() {
       let marketOpen = this.testTime();

        this.props.investments.forEach( inv => {
            let apikey = window.finnhubAPIKey;
            let ticker = inv.ticker
            
            if (marketOpen) {
                fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apikey}`)
                    .then(response => (response.json()))
                    .then(quote => {this.addCurrentPrice(quote["pc"], inv)});
            } else {
                fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apikey}`)
                    .then(response => (response.json()))
                    .then(quote => {this.addCurrentPrice(quote["c"], inv)});
            }
        })
    }

    addCurrentPrice(price, inv) {
        let today = this.buildDateString();
        let accountId = inv.account_id
        let investment = {...inv, prev_close: price, last_fetch: today};
        this.props.updateInvestment(investment)
        .then(() => this.props.fetchAccount(accountId));
    }

    //for Investment Chart

    makeButtons() {
        return this.props.investments.map( inv => {
                if(this.state.invChart === inv.ticker) {
                    return (
                        <button className='chart-select-button-selected' 
                                value={`${inv.ticker}`} 
                                key={inv.id}
                                onClick={this.handleInvestmentClick}>
                            {inv.ticker}
                        </button>
                    )
                } else {
                    return (
                         <button className='chart-select-button-unselected' 
                                value={`${inv.ticker}`} 
                                key={inv.id}
                                onClick={this.handleInvestmentClick}>
                            {inv.ticker}
                        </button>
                    )
                }
        })
        
    }

    makeInvChart() {
        let yearClass = this.state.timePeriod === 'year' ? 'selected' : 'unselected';
        let halfYearClass = this.state.timePeriod === '6 month' ? 'selected' : 'unselected';
        let quarterClass = this.state.timePeriod === 'quarter' ? 'selected' : 'unselected';

        let charts = []; 
        let timePeriods = <div className='time-period-button-container'>
                                <h3 className='time-period-header'>Change Time Period:</h3>
                                <button className={`time-period-button-${quarterClass}`} value="quarter" onClick={this.handleTimePeriodClick}>
                                3 Months
                                </button>
                                <button className={`time-period-button-${halfYearClass}`} value="6 month" onClick={this.handleTimePeriodClick}>
                                6 Months
                                </button>
                                <button className={`time-period-button-${yearClass}`} value="year" onClick={this.handleTimePeriodClick}>
                                12 Months
                                </button>
                            </div>
        this.props.investments.forEach( inv => {
            if(this.state.invChart === inv.ticker) {
                    charts.push(
                        <div key={`${inv.id}-1`} className={`current-chart-div-${yearClass}`}>
                            <InvestmentChart key={`${inv.id}-1`} investment={inv} timePeriod='year'/>
                            {timePeriods}
                        </div>,
                        <div key={`${inv.id}-2`} className={`current-chart-div-${halfYearClass}`}>
                            <InvestmentChart key={`${inv.id}-2`} investment={inv} timePeriod='6 month'/>
                            {timePeriods}
                        </div>,
                         <div key={`${inv.id}-3`} className={`current-chart-div-${quarterClass}`}>
                            <InvestmentChart key={`${inv.id}-3`} investment={inv} timePeriod='quarter'/>
                            {timePeriods}
                        </div>
                    )
            } 
        })
        return charts;
    }

    render() {
        let none = <li className='account-item'  key='account-none'>
                        <div>
                            <div className='dashboard-account-none'>
                                <h4 className='account-name' >No Accounts to Display</h4>
                            </div>
                        </div>
                    </li>

        let cashAccounts = [];
        var cashTotal = 0;
        let loanAccounts = [];
        var loanTotal = 0;
        let investmentAccounts = [];
        var investmentTotal = 0;
        var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });

        this.props.accounts.forEach( account => {
            let acc = <li className='account-item'
                        key={account.id}><AccountItem
                                account={account} 
                                openModal={this.props.openModal}/>
                        </li>
            let num = parseFloat(account.balance);
                num.toFixed(2);
            if(account.category === 'Cash') {
                cashTotal += num
                cashAccounts.push(acc);
            } else if(account.category === 'Loan') {
                loanTotal += num
                loanAccounts.push(acc);
            } else {
                investmentTotal += num
                investmentAccounts.push(acc);
            }
        })

        if(cashAccounts.length === 0) {cashAccounts = none}
        if(loanAccounts.length === 0) {loanAccounts = none}
        if(investmentAccounts.length === 0) {investmentAccounts = none}

        let monthClass = '';
        let quarterClass = '';
        if(this.state.chart === 'month') {
            monthClass = 'selected';
            quarterClass = 'unselected';
        } else if(this.state.chart === 'quarter') {
            monthClass = 'unselected';
            quarterClass = 'selected';
        }

        let investmentButtons;
        let investmentCharts;
        if(this.props.investments.length > 0) {
            investmentButtons = this.makeButtons();
            investmentCharts = this.makeInvChart();
        }
        
        return (
            <div>
                <section className='main-nav'>
                    {< MainNavContainer />}
                    {< NavBar page='Overview'/>}
                </section>
                <section className='main-body'>
                <section className='dashboard-leftside'>
                    <div>
                        <header className='dashboard-heading'>
                            <h2>ACCOUNTS</h2>
                            <button className='dashboard-right' onClick={ () => {this.props.openModal('Create')}}>
                                <p>Add</p>
                                <BsPlusCircle />
                            </button>
                        </header>
                        <section className='dashboard-main'>
                            <div className='category'>
                                <h3> < IoCashOutline /> Cash </h3>
                                <p>{formatter.format(cashTotal)}</p>
                            </div>
                                <ul>
                                    {cashAccounts}
                                </ul>
                            <div className='category'>
                                <h3> <GoCreditCard /> Loans</h3>
                                <p>{formatter.format(loanTotal)}</p>
                            </div>
                                <ul>
                                    {loanAccounts}
                                </ul>
                            <div className='category'>
                                <h3> <BiLineChart /> Investments</h3>
                                <p>{formatter.format(investmentTotal)}</p>
                            </div>
                                <ul>
                                    {investmentAccounts}
                                </ul>
                        </section>
                    </div>
                </section>
                <section className='dash-rightside'>
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
                    <div className='dashboard'>
                        <header className='dash-trans-heading'>
                            <h2>INVESTMENT TRENDS</h2>
                            <div className='view-button-container'>
                                <button className='view-button'>
                                <Link to="/investments">
                                    <p className='icon'></p>
                                    <div className='button-text'>View Investments</div>
                                </Link>
                                </button>
                            </div>
                        </header>
                        <div className='chart-select-container'>
                            {investmentButtons}
                        </div>
                            {investmentCharts}
                    </div>
                </section>
                </section> 
            </div>
            
        )
    }
}

export default Dash;