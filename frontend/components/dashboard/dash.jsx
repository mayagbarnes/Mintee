import React from 'react';
import {BsPlusCircle} from 'react-icons/bs';
import MainNavContainer from '../main_nav/main_nav_container';
import NavBar from '../nav_bar/nav_bar';
import DashAccounts from './dash_accounts';
import DashTransactions from './dash_transactions';
import DashInvestments from './dash_investments';


class Dash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountsLoading: true,
        }
    }

    componentDidMount() {
        this.props.fetchInvestments()
            .then( () => this.updateInvestments())
            .then( () => this.props.fetchAccounts())
            .then( () => this.setState( {accountsLoading: false} ))
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

    render() {
        return (
            <div>
                <section className='main-nav'>
                    {< MainNavContainer />}
                    {< NavBar page='Overview'/>}
                </section>
                <section className='main-body'>
                <section className='dashboard-leftside'>
                    <header className='dashboard-heading'>
                        <h2>ACCOUNTS</h2>
                        <button className='dashboard-right' onClick={ () => {props.openModal('Create')}}>
                            <p>Add</p>
                            <BsPlusCircle />
                        </button>
                    </header>
                    { this.state.accountsLoading ? <div className='accounts-wheel-loader'></div> : 
                        < DashAccounts accounts={this.props.accounts} openModal={this.props.openModal}/>
                    }
                </section>
                <section className='dash-rightside'>
                    <DashTransactions fetchTransactions={this.props.fetchTransactions} transactions={this.props.transactions}/>
                    <DashInvestments fetchInvestments={this.props.fetchInvestments} investments={this.props.investments}/>
                </section>
                </section> 
            </div>
            
        )
    }
}

export default Dash;