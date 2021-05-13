import React from 'react';
import { AiOutlineCloseCircle, AiOutlineLoading } from 'react-icons/ai';
import SearchMatches from './ticker_search';

class InvestmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            investment: this.props.investment,
            stocks: this.props.stocks,
            loading: false,
            clicked: true,
            show: true,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTicker = this.handleTicker.bind(this);
        this.handleCloseOptions = this.handleCloseOptions.bind(this);
    }

    handleSearch(e) {
        e.preventDefault();
        this.setState({investment: { ticker: e.currentTarget.value}})
    }

    handleChange(type) {
        return (e) =>  {
                // if(type === 'ticker') {this.setState({ clicked: false}, () => console.log(this.state.clicked))} 
                this.setState({ investment: { ...this.state.investment, [type]: e.currentTarget.value} })
            } 
    }

    handleTicker() {
        console.log('HIT')
        this.setState({ show: true })
    }

    handleCloseOptions() {
        console.log('CLOSE')
        this.setState({ show: false })
    }

    handleClick(e) {
        console.log('clicked')
        console.log(e.currentTarget.value)
        this.setState({ clicked: true}, () => console.log(this.state.clicked))
        this.setState({investment: { ticker: e.currentTarget.value}})
    }

    handleSubmit() {
        let apikey = window.finnhubAPIKey;
        let ticker = this.state.investment.ticker;
        let marketOpen = this.testTime();

        if(ticker === '') {
            this.props.receiveInvestmentErrors(["Ticker Symbol cannot be blank"]); 
        } else {
            if(!marketOpen) {
                this.setState( {loading: true }, () => { 
                    fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apikey}`)
                        .then(response => response.json())
                        .then(quote => this.validateTicker(quote["c"]))
                    });
            } else {
                this.setState( {loading: true }, () => { 
                    fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apikey}`)
                        .then(response => response.json())
                        .then(quote => this.validateTicker(quote["pc"]))
                    });
            }
        }
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

    validateTicker(price) {
        let dateString = this.buildDateString();
        let accountId = this.state.investment.account_id
        if(price === 0) {
            this.setState({loading: false })
            this.props.receiveInvestmentErrors(["Invalid Ticker"]); 
        } else {
            this.setState({ investment: { ...this.state.investment, prev_close: price, last_fetch: dateString} },
                () => this.props.action(this.state.investment)
                .then(() => this.props.fetchAccount(accountId))
                .then( () => this.setState({loading: false }))
                .then(this.props.closeModal))
        }
    }

    renderErrors() {
        let errors = <ul>
                {this.props.errors.map((error, i) => (
                <li key={`error-${i}`}>
                    {error}
                </li>
                ))}
            </ul>
        return errors;
    }

    makeMatches(allMatches) {
        let matching = allMatches.slice(0,5)
        let matches = matching.map((stock) => {
            let company = stock.name.split(' ').map( (word) => {
                return word[0].toUpperCase() + word.slice(1).toLowerCase()
            }).join(' ');
            return (
                    <option onClick={this.handleClick} key={`${stock.ticker}`} value={`${stock.ticker}`}>{company}</option>
            )
        })
        return matches;
    }

    render() {
        let defaultAccount = this.state.investment.account_id;
        let accountsDropdown = this.props.accounts.map( (account) => {
            return  <option 
                        key={account.id}
                        value={account.id}>
                        {account.account_name}
                    </option>
        })
    
        let betterMatches = [];
        let anyMatches = [];
            if(this.props.stocks && this.state.investment.ticker !== '') {
                anyMatches = this.props.stocks.filter( (stock) => {
                        if(this.state.investment.ticker.toLowerCase() === stock.ticker.toLowerCase()) {
                            betterMatches.push(stock)
                            return false;
                        } else if(this.state.investment.ticker.toLowerCase() === stock.name.toLowerCase()) {
                            betterMatches.push(stock)
                            return false;
                        } else {
                            return (stock.name.toLowerCase().includes(this.state.investment.ticker.toLowerCase()) ||
                            stock.ticker.toLowerCase().includes(this.state.investment.ticker.toLowerCase()))
                        }
                })
            } 

    
        let allMatches = betterMatches.concat(anyMatches)
        let matches;
        let noResult = 'hidden';
        if(allMatches.length === 0 && this.state.investment.ticker !== '') {
            noResult = ''
        } else {
            matches = this.makeMatches(allMatches)
        }
       
        let loadingClass = this.state.loading ? 'wheel-loader': '';
        // let listClass = this.state.clicked ? 'hidden': '';

        return (
            <section className='investment-form-holder'>
                <section className='investment-form-close'>
                        <button onClick={this.props.closeModal}> < AiOutlineCloseCircle /> </button>
                </section>
                <div className='investment-form'>
                    <h2>{this.props.formHeading}</h2>
                <div className='investment-form-body'>
                    {this.renderErrors()} 
                    <label>Account
                        <br/>
                        <select defaultValue={defaultAccount} name="account_id" className="transaction-account" onChange={this.handleChange('account_id')} >
                            <option value='' disabled>---Please Select----</option>
                            {accountsDropdown}
                        </select>
                    </label>
                    <br/>
                    <label> Name/Description
                        <input id='investment-name' type="text" value={this.state.investment.inv_name}
                                onChange={this.handleChange('inv_name')}/>
                    </label>
                    <br/>
                    <label> Ticker Symbol
                         <input className='investment-ticker'
                                type="text" 
                                list='companies'
                                placeholder='Search Company or Ticker'
                                value={this.state.investment.ticker}
                                onChange={this.handleChange('ticker')}
                                onKeyPress={this.handleTicker}/> 
                            <div onClick={this.handleCloseOptions}>
                                {this.state.show && <datalist id="companies">
                                    {matches}
                                </datalist> }
                            </div>
                            <div className={`no-results ${noResult}`}>No Matches Found</div>
                    </label>
                    <br/>
                    <label id='investment-shares'> Shares
                        <input placeholder='ex: 20.0' id='investment-shares' type="number" value={this.state.investment.shares}
                                onChange={this.handleChange('shares')}
                                />
                    </label>
                    <br/>
                    <label id='price-paid'> Price Paid
                        <input placeholder='ex: 150.25' id='price-paid' type="number" value={this.state.investment.price_paid}
                                onChange={this.handleChange('price_paid')}
                                />
                    </label>
                    <div className={`${loadingClass}`}></div>
                    <div className='button-holder'>
                        <button onClick={this.handleSubmit}>{this.props.formType}</button>
                    </div>
                </div>
                </div>
            </section>
        )
    }

}

export default InvestmentForm;