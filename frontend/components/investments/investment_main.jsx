import React from 'react';
import MainNavContainer from '../main_nav/main_nav_container';
import NavBar from '../nav_bar/nav_bar';
import InvestmentItem from './investment_item';
import SidebarContainer from '../sidebar/sidebar_container'
import { BsPlusCircle } from 'react-icons/bs';
import {BiDownArrow, BiUpArrow} from 'react-icons/bi'
import {FaSearchDollar} from 'react-icons/fa';

class Investments extends React.Component {
    constructor(props) {
        super(props);
        this.controller = new AbortController();
        this.signal = this.controller.signal;
        this.state = {
            mounted: true,
            tableLoading: true,
            stocksLoading: true,
            searchTerm: '',
            inv_name: 'default',
            // ticker: 'default',
            price: 'default',
            price_paid: 'default',
            shares: 'default',
            market_value: 'desc',
            change: 'default',
        };
        
        this.sortInvName = this.sortInvName.bind(this);
        // this.sortTicker = this.sortTicker.bind(this);
        this.sortPrice = this.sortPrice.bind(this);
        this.sortPricePaid = this.sortPricePaid.bind(this);
        this.sortShares = this.sortShares.bind(this);
        this.sortMarketValue = this.sortMarketValue.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.editSearchTerm = this.editSearchTerm.bind(this);
    }

    componentDidMount() {
        this.props.fetchInvestments(this.signal)
        // .then( () => this.setState({tableLoading: false}) )
        .then( () =>  {
            if(this.state.mounted) {
                this.setState({tableLoading: false})
            }
        })
        this.props.fetchStocks(this.signal)
        .then( () =>  {
            if(this.state.mounted) {this.setState({stocksLoading: false})}
        })
    }
    

    componentWillUnmount() {
        this.setState({mounted:false})
        this.controller.abort();
    }

    editSearchTerm(e) {
        this.setState({searchTerm: e.target.value}, this.dynamicSearch)
    }

    dynamicSearch() {
        this.props.fetchFilteredInvestments(this.state.searchTerm)
    }

    sortInvName() {
        // this.setState( {ticker: 'default'});
        this.setState( {price: 'default'});
        this.setState( {price_paid: 'default'});
        this.setState( {shares: 'default'});
        this.setState( {market_value: 'default'});
        this.setState( {change: 'default'});

        let func = (a,b) => { return a.inv_name < b.inv_name ? -1 
            : a.inv_name > b.inv_name ? 1 : 0 }
       
        if(this.state.inv_name === 'default'|| this.state.inv_name === 'asc') {
            func = (a,b) => { return a.inv_name > b.inv_name ? -1 
                : a.inv_name < b.inv_name ? 1 : 0 }
            this.setState( {inv_name: 'desc'});
        } else if (this.state.inv_name === 'desc') {
            this.setState( {inv_name: 'asc'});
        } 
        
        this.props.investments.sort(func)
    //    this.setState( {investments: this.state.investments.sort(func)})
    }

    // sortTicker() {
    //     this.setState( {inv_name: 'default'});
    //     this.setState( {price: 'default'});
    //     this.setState( {price_paid: 'default'});
    //     this.setState( {shares: 'default'});
    //     this.setState( {market_value: 'default'});

    //     let func = (a,b) => { return a.ticker < b.ticker ? -1 
    //         : a.ticker > b.ticker ? 1 : 0 }
       
    //     if(this.state.ticker === 'default'|| this.state.ticker === 'asc') {
    //         func = (a,b) => { return a.ticker > b.ticker ? -1 
    //             : a.ticker < b.ticker ? 1 : 0 }
    //         this.setState( {ticker: 'desc'});
    //     } else if (this.state.ticker === 'desc') {
    //         this.setState( {ticker: 'asc'});
    //     } 
        
    //    this.setState( {investments: this.state.investments.sort(func)})
    // }

    sortPrice() {
        this.setState( {inv_name: 'default'});
        // this.setState( {ticker: 'default'});
        this.setState( {price_paid: 'default'});
        this.setState( {shares: 'default'});
        this.setState( {market_value: 'default'});
        this.setState( {change: 'default'});


        let func = (a,b) => a.prev_close - b.prev_close;
        if(this.state.price === 'default' || this.state.price === 'asc') {
            func = (a,b) => b.prev_close - a.prev_close;
            this.setState( {price: 'desc'});
        } else if(this.state.price === 'desc') {
            this.setState( {price: 'asc'});
        } 

        this.props.investments.sort(func)
    //    this.setState( {investments: this.state.investments.sort(func)})
    }

    sortPricePaid() {
        this.setState( {inv_name: 'default'});
        // this.setState( {ticker: 'default'});
        this.setState( {price: 'default'});
        this.setState( {shares: 'default'});
        this.setState( {market_value: 'default'});
        this.setState( {change: 'default'});

        let func = (a,b) => a.price_paid - b.price_paid;
        if(this.state.price_paid === 'default' || this.state.price_paid === 'asc') {
            func = (a,b) => b.price_paid - a.price_paid;
            this.setState( {price_paid: 'desc'});
        } else if(this.state.price_paid === 'desc') {
            this.setState( {price_paid: 'asc'});
        } 

        this.props.investments.sort(func)
        // this.setState( {investments: this.state.investments.sort(func)})
    }

    sortShares() {
        this.setState( {inv_name: 'default'});
        // this.setState( {ticker: 'default'});
        this.setState( {price: 'default'});
        this.setState( {price_paid: 'default'});
        this.setState( {market_value: 'default'});
        this.setState( {change: 'default'});

        let func = (a,b) => a.shares - b.shares;
        if(this.state.shares === 'default' || this.state.shares === 'asc') {
            func = (a,b) => b.shares - a.shares;
            this.setState( {shares: 'desc'});
        } else if(this.state.shares === 'desc') {
            this.setState( {shares: 'asc'});
        } 

        this.props.investments.sort(func)
        // this.setState( {investments: this.state.investments.sort(func)})
    }

    sortMarketValue() {
        this.setState( {inv_name: 'default'});
        // this.setState( {ticker: 'default'});
        this.setState( {price: 'default'});
        this.setState( {price_paid: 'default'});
        this.setState( {shares: 'default'});
        this.setState( {change: 'default'});

        let func = (a,b) => (a.prev_close * a.shares) - (b.prev_close * b.shares);
        if(this.state.market_value === 'default' || this.state.market_value === 'asc') {
            func = (a,b) => (b.prev_close * b.shares) - (a.prev_close * a.shares);
            this.setState( {market_value: 'desc'});
        } else if(this.state.market_value === 'desc') {
            this.setState( {market_value: 'asc'});
        } 

        this.props.investments.sort(func)
        // this.setState( {investments: this.state.investments.sort(func)})
    }

    sortChange() {
        this.setState( {inv_name: 'default'});
        // this.setState( {ticker: 'default'});
        this.setState( {price: 'default'});
        this.setState( {price_paid: 'default'});
        this.setState( {shares: 'default'});
        this.setState( {market_value: 'default'});

        let func = (a,b) => ( (a.prev_close * a.shares - a.price_paid * a.shares) - (b.prev_close * b.shares - b.price_paid * b.shares) );
        if(this.state.change === 'default' || this.state.change === 'asc') {
            func = (a,b) => ( (b.prev_close * b.shares - b.price_paid * b.shares) - (a.prev_close * a.shares - a.price_paid * a.shares) );
            this.setState( {change: 'desc'});
        } else if(this.state.change === 'desc') {
            this.setState( {change: 'asc'});
        } 

        this.props.investments.sort(func)
        // this.setState( {investments: this.state.investments.sort(func)})
    }


    render() {
        let nameSymbol = this.state.inv_name === 'desc' ? <BiDownArrow/> : this.state.inv_name === 'asc' ? <BiUpArrow/> : '';
        // let tickerSymbol = this.state.ticker === 'desc' ? <BiDownArrow/> : this.state.ticker === 'asc' ? <BiUpArrow/> : '';
        let priceSymbol = this.state.price === 'desc' ? <BiDownArrow/> : this.state.price === 'asc' ? <BiUpArrow/> : '';
        let costSymbol = this.state.price_paid === 'desc' ? <BiDownArrow/> : this.state.price_paid === 'asc' ? <BiUpArrow/> : '';
        let sharesSymbol = this.state.shares === 'desc' ? <BiDownArrow/> : this.state.shares === 'asc' ? <BiUpArrow/> : '';
        let valueSymbol = this.state.market_value === 'desc' ? <BiDownArrow/> : this.state.market_value === 'asc' ? <BiUpArrow/> : '';
        let changeSymbol = this.state.change === 'desc' ? <BiDownArrow/> : this.state.change === 'asc' ? <BiUpArrow/> : '';


        let investmentItems = []
        let loadingClass = this.state.tableLoading ? 'loading': '';
        if(this.state.tableLoading) {
             investmentItems = 
                <tr className='results-loading'>
                    <td colSpan='7'>
                        <div className='loader'></div>
                    </td>
                </tr>
        } else {
            if(this.state.searchTerm === '') {
                investmentItems = this.props.investments.map( investment => {
                                return < InvestmentItem key={investment.id}
                                    investment={investment} 
                                    updateInvestment={this.props.updateInvestment}
                                    receiveInvestment = {this.props.receiveInvestment}
                                    openModal={this.props.openModal}/>
                                })
            } else {
                let matches = this.props.filtered.map( investment => investment.id)

                investmentItems = this.props.investments
                    .filter(investment => matches.includes(investment.id))
                    .map( investment => {
                                return < InvestmentItem key={investment.id}
                                    investment={investment} 
                                    receiveInvestment = {this.props.receiveInvestment}
                                    openModal={this.props.openModal}/>
                                })
            }
        }

        if (investmentItems.length === 0) {
            investmentItems = 
                <tr className='no-results'>
                    <td colSpan='7'>No Investments To Display</td>
                </tr>
        }

        let addLoadingClass = this.state.stocksLoading ? 'wheel-loader': '';
        let addButtonClass = this.state.stocksLoading ? 'hidden': '';

        return (
            <div>
                <section className='main-nav'>
                    {< MainNavContainer />}
                    {< NavBar page='Investments'/>}
                </section>
                <section className='main-body'>
                    <section className='sidebar-leftside'>
                        {< SidebarContainer />}
                    </section>
                    <section className='investments-rightside'>
                    <div className='investments'>
                        <header className='inv-heading'>
                            <h2>INVESTMENTS</h2>
                            { this.state.stocksLoading ? <div className={addLoadingClass}></div> : 
                            <button className='inv-right' onClick={ () => {this.props.openModal('AddInv')}}>
                                <p> Add </p>
                                <BsPlusCircle />
                            </button>}
                        </header>
                        <div className='transactions-search-bar'>
                            <label> <FaSearchDollar /> Search:
                            <input type="text" onChange={this.editSearchTerm} placeholder='Enter Investment Name or Ticker'/>
                            </label>
                        </div>
                        <table className={`investment-table ${loadingClass}`}>
                            <thead>
                                <tr>
                                    <th className={`${this.state.inv_name}`} >
                                        <button onClick={this.sortInvName}> 
                                        <div className='investment-svg-holder'> Name {nameSymbol}</div>
                                        </button>
                                    </th>
                                    {/* <th className={`${this.state.ticker}`} > <button onClick={this.sortTicker}>Ticker {tickerSymbol}</button></th> */}
                                    <th className={`${this.state.price}`} > <button onClick={this.sortPrice}>Price {priceSymbol}</button></th>
                                    <th className={`${this.state.shares}`} > <button onClick={this.sortShares}>Shares {sharesSymbol}</button></th>
                                    <th className={`${this.state.price_paid}`} > <button onClick={this.sortPricePaid}>Price Paid {costSymbol}</button></th>
                                    <th className={`${this.state.market_value}`} > <button onClick={this.sortMarketValue}>Mkt. Value{valueSymbol}</button></th>
                                    <th className={`${this.state.change}`} > <button onClick={this.sortChange}>Change{changeSymbol}</button></th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                               {investmentItems}
                            </tbody>
                        </table>
                    </div>
                    </section>
                </section>
            </div>
            
        )
    }
}

export default Investments;

