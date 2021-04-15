import React from 'react';
import MainNavContainer from '../main_nav/main_nav_container';
import NavBar from '../nav_bar/nav_bar';
import TransactionItem from './transaction_item';
import SidebarContainer from '../sidebar/sidebar_container'
import { BsPlusCircle } from 'react-icons/bs';
import {BiDownArrow, BiUpArrow} from 'react-icons/bi'
import {FaSearchDollar} from 'react-icons/fa';

class Transactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            date: 'desc',
            description: 'default',
            category: 'default',
            amount: 'default'
        };
        this.sortAmount = this.sortAmount.bind(this);
        this.sortCategory = this.sortCategory.bind(this);
        this.sortDescription = this.sortDescription.bind(this);
        this.sortDate = this.sortDate.bind(this);
        this.editSearchTerm = this.editSearchTerm.bind(this);
    }

    editSearchTerm(e) {
        this.setState({searchTerm: e.target.value}, this.dynamicSearch)
    }

    dynamicSearch() {
        this.props.fetchFilteredTransactions(this.state.searchTerm)
    }

    componentDidMount() {
        this.props.fetchTransactions();
    }

    sortAmount() {
        this.setState( {date: 'default'});
        this.setState( {description: 'default'});
        this.setState( {category: 'default'});

        let func = (a,b) => a.amount - b.amount;
        if(this.state.amount === 'default' || this.state.amount === 'asc') {
            func = (a,b) => b.amount - a.amount;
            this.setState( {amount: 'desc'});
        } else if(this.state.amount === 'desc') {
            this.setState( {amount: 'asc'});
        } 
        if(this.state.searchTerm === '') {this.props.transactions.sort(func)} 
        else {this.props.filtered.sort(func)}
    }

    sortCategory() {
        this.setState( {date: 'default'});
        this.setState( {description: 'default'});
        this.setState( {amount: 'default'});

        let func = (a,b) => { return a.category < b.category ? -1 
            : a.category > b.category ? 1 : 0 }
       
        if(this.state.category === 'default'|| this.state.category === 'asc') {
            func = (a,b) => { return a.category > b.category ? -1 
                : a.category < b.category ? 1 : 0 }
            this.setState( {category: 'desc'});
        } else if (this.state.category === 'desc') {
            this.setState( {category: 'asc'});
        } 
        if(this.state.searchTerm === '') {this.props.transactions.sort(func)} 
        else {this.props.filtered.sort(func)}
    }

    sortDescription() {
        this.setState( {date: 'default'});
        this.setState( {category: 'default'});
        this.setState( {amount: 'default'});
        let func = (a,b) => { return a.description < b.description ? -1 
            : a.description > b.description ? 1 : 0 }
       
        if(this.state.description === 'default' || this.state.description === 'asc') {
            func = (a,b) => { return a.description > b.description ? -1 
                : a.description < b.description ? 1 : 0 }
            this.setState( {description: 'desc'});
        } else if (this.state.description === 'desc') {
            this.setState( {description: 'asc'});
        } 
        if(this.state.searchTerm === '') {this.props.transactions.sort(func)} 
        else {this.props.filtered.sort(func)}
    }

    sortDate() {
        this.setState( {description: 'default'});
        this.setState( {category: 'default'});
        this.setState( {amount: 'default'});
        let func = (a,b) => { return a.date < b.date ? -1 
            : a.date > b.date ? 1 : 0 }
       
        if(this.state.date === 'default'|| this.state.date === 'asc') {
            func = (a,b) => { return a.date > b.date ? -1 
                : a.date < b.date ? 1 : 0 }
            this.setState( {date: 'desc'});
        } else if (this.state.date === 'desc') {
            this.setState( {date: 'asc'});
        }
        if(this.state.searchTerm === '') {this.props.transactions.sort(func)} 
        else {this.props.filtered.sort(func)}
    }

    render() {
        let dateSymbol = this.state.date === 'desc' ? <BiDownArrow/> : this.state.date === 'asc' ? <BiUpArrow/> : '';
        let categorySymbol = this.state.category === 'desc' ? <BiDownArrow/> : this.state.category === 'asc' ? <BiUpArrow/> : '';
        let amountSymbol = this.state.amount === 'desc' ? <BiDownArrow/> : this.state.amount === 'asc' ? <BiUpArrow/> : '';
        let descriptionSymbol = this.state.description === 'desc' ? <BiDownArrow/> : this.state.description === 'asc' ? <BiUpArrow/> : '';

        let transactionItems = []
        if(this.state.searchTerm === '') {
            transactionItems = this.props.transactions.map( transaction => {
                            return < TransactionItem key={transaction.id}
                                transaction={transaction} 
                                openModal={this.props.openModal}/>
                            })
            if(transactionItems.length === 0) {
                transactionItems = <tr className='no-results'><td colSpan='5'>No Transactions To Display</td></tr>
            }
        } else {
            transactionItems = this.props.filtered.map( transaction => {
                            return < TransactionItem key={transaction.id}
                                transaction={transaction} 
                                openModal={this.props.openModal}/>
                            })
            if(transactionItems.length === 0) {
                transactionItems = <tr className='no-results'><td colSpan='5'>No Results</td></tr>
            }
        }
        
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
                        <div className='transactions-search-bar'>
                            <label> <FaSearchDollar /> Search:
                            <input type="text" onChange={this.editSearchTerm} placeholder='Enter Transaction Description'/>
                            </label>
                        </div>
                        <table className='transaction-table'>
                            <thead>
                                <tr>
                                    <th className={`${this.state.date}`} >
                                        <button onClick={this.sortDate}> 
                                        <div className='transaction-svg-holder'> Date {dateSymbol}</div>
                                        </button>
                                    </th>
                                    <th className={`${this.state.description}`} > <button onClick={this.sortDescription}>Description {descriptionSymbol}</button></th>
                                    <th  className={`${this.state.category}`} > <button onClick={this.sortCategory}>Category {categorySymbol}</button></th>
                                    <th className={`${this.state.amount}`} > <button onClick={this.sortAmount}>Amount {amountSymbol}</button></th>
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