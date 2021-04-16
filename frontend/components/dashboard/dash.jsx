import React from 'react';
import MainNavContainer from '../main_nav/main_nav_container';
import AccountItem from '../account/account_item';
import { BsPlusCircle } from 'react-icons/bs';
import NavBar from '../nav_bar/nav_bar';
import { IoCashOutline } from 'react-icons/io5';
import {GoCreditCard} from 'react-icons/go'
import {BiLineChart} from 'react-icons/bi'


class Dash extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAccounts();
    }

    render() {
        let none = <li className='account-item'  key='account-none'>
                    <div>
                        <div className='account-info-none'>
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
                        key={account.id}>< AccountItem
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

        if(cashAccounts.length === 0) { cashAccounts = none}
        if(loanAccounts.length === 0) {loanAccounts = none}
        if(investmentAccounts.length === 0) {investmentAccounts = none}

        return (
            <div>
                <section className='main-nav'>
                    {< MainNavContainer />}
                    {< NavBar page='Overview'/>}
                </section>
                <div className='dashboard'>
                <header className='dashboard-heading'>
                    <h2>ACCOUNTS</h2>
                    <button className='dash-right' onClick={ () => {this.props.openModal('Create')}}>
                        <p>Add</p>
                        <BsPlusCircle />
                    </button>
                </header>
                <section className='dash-main'>
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
            </div>
            
        )
    }
}

export default Dash;