import React from 'react';
import MainNavContainer from '../main_nav/main_nav_container';
import NavBar from '../nav_bar/nav_bar';
import TransactionItem from './transaction_item';
import SidebarContainer from '../sidebar/sidebar_container'
import { BsPlusCircle } from 'react-icons/bs';


class Transactions extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTransactions();
    }

    render() {
        let transactionItems = this.props.transactions.map( transaction => {
                            return < TransactionItem
                                transaction={transaction} 
                                openModal={this.props.openModal}/>
                            })
        return (
            <div>
                <section className='main-nav'>
                    {< MainNavContainer />}
                    {< NavBar page='Transactions'/>}
                </section>
                <section className='main-body'>
                    <section className='sidebar-leftside'>
                        {< SidebarContainer />}
                    </section>
                    <section className='transactions-rightside'>
                    <div className='transactions'>
                        <header className='trans-heading'>
                            <h2>TRANSACTIONS</h2>
                            <button className='trans-right' onClick={ () => {this.props.openModal('Add')}}>
                                <p> Add </p>
                                <BsPlusCircle />
                            </button>
                        </header>
                        <table className='transaction-table'>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                               {transactionItems}
                            </tbody>
                        </table>
                    </div>
                    </section>
                </section>
            </div>
            
        )
    }
}

export default Transactions;