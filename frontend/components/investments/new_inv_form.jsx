import React from 'react';
import { AiOutlineCloseCircle, AiOutlineLoading } from 'react-icons/ai';
import SearchMatches from './ticker_search';

class NewInvestmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            investment: this.props.investment,
            stocks: this.props.stocks,
            loading: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSearch(e) {
        this.setState({investment: { ticker: e.currentTarget.value}})
    }

    handleSelect(value) {
        this.setState({investment: { ticker: value}})
    }

    handleChange(type) {
        return (e) =>  {
                return this.setState({ investment: { ...this.state.investment, [type]: e.currentTarget.value} });
            } 
    }

    handleSubmit() {
        let apikey = window.finnhubAPIKey;
        let ticker = this.state.investment.ticker;
        let weekday = new Date().getDay();

        if(weekday === 0 || weekday === 6) {
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


    render() {
        let defaultAccount = this.state.investment.account_id;
        let accountsDropdown = this.props.accounts.map( (account) => {
            return  <option 
                        key={account.id}
                        value={account.id}>
                        {account.account_name}
                    </option>
        })

        let loadingClass = this.state.loading ? 'wheel-loader': '';
        
            let matchingStocks = [];
                if(this.state.investment.ticker !== '') {
                    matchingStocks = this.props.stocks.filter( (stock) => {
                        return (
                            stock.name.toLowerCase().indexOf(this.state.investment.ticker.toLowerCase()) !== -1 ||
                            stock.ticker.toLowerCase().indexOf(this.state.investment.ticker.toLowerCase()) !== -1
                        )
                    })
                } 

            let matches;
            let hidden = '';
                if(matchingStocks.length > 5) {
                    matches = [];
                    for(let i = 0; i < 5; i++) {
                        let company = matchingStocks[i].name.split(' ').map( (word) => {
                            return word[0].toUpperCase() + word.slice(1).toLowerCase()
                        }).join(' ')
                        let ticker = matchingStocks[i].ticker
                        let tableRow = <tr onClick={() => this.handleSelect(ticker)} 
                                                key={matchingStocks[i].id} 
                                                className="search-result-item">
                                            <td className="search-list-symbol">
                                                {ticker}
                                            </td>
                                            <td className="search-list-description">
                                                {company}
                                            </td>
                                        </tr>
                        matches.push(tableRow)
                        };
                    } else if(matchingStocks.length === 0 && this.state.investment.ticker !== '') {
                    matches = <tr className="search-list-item">
                                    <td colSpan='2' className="search-list-description">
                                        No matching tickers
                                    </td>
                                </tr>   
                    } else if(matchingStocks.length === 0 && this.state.investment.ticker === '') {
                        matches = <tr className="hidden">
                                        <td colSpan='2' className="search-list-description">
                                        </td>
                                    </tr>
                        hidden = 'hidden'
                    }else {
                        matches = matchingStocks.map((stock) => {
                            let company = stock.name.split(' ').map( (word) => {
                                return word[0].toUpperCase() + word.slice(1).toLowerCase()
                            }).join(' ')
                        let ticker = matchingStocks[i].ticker
                        return (<tr onClick={() => this.handleSelect(ticker)}
                                    key={stock.id} className="search-result-item">
                            <td className="search-list-symbol">
                                {ticker}
                            </td>
                            <td className="search-list-description">
                                {company}
                            </td>
                        </tr>)
                    })
                }

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
                        <input id='investment-name' placeholder='Ex: Apple'
                            type="text" value={this.state.investment.inv_name}
                                onChange={this.handleChange('inv_name')}/>
                    </label>
                    <br/>
                    <label> Ticker Symbol
                        <div className="search-input-holder">
                            <input id='investment-ticker' 
                                type="text" 
                                placeholder='Search Company Name or Ticker'
                                value={this.state.investment.ticker}
                                onChange={this.handleSearch}
                            />
                        </div>
                        <table className={`search-result-table ${hidden}`}>
                            <tbody className="result-list">
                                {matches}
                            </tbody>
                        </table>
                    </label>
                    <br/>
                    <label id='investment-shares'> Shares
                        <input id='investment-shares' placeholder='Ex: 25' type="number" value={this.state.investment.shares}
                                onChange={this.handleChange('shares')}
                                />
                    </label>
                    <br/>
                    <label id='price-paid'> Price Paid
                        <input id='price-paid' type="number" placeholder='Ex: 77.77'
                            value={this.state.investment.price_paid}
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

export default NewInvestmentForm;