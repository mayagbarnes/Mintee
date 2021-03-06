import React from 'react';
import { AiOutlineCloseCircle, AiOutlineLoading } from 'react-icons/ai';

class InvestmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            investment: this.props.investment,
            keyPress: '',
            // stocks: this.props.stocks,
            loading: false,
            clicked: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        this.handleTicker = this.handleTicker.bind(this);
    }

    handleSearch(e) {
        this.setState({investment: { ticker: e.currentTarget.value}})
    }

    handleChange(type) {
        return (e) =>  {
                this.setState({ investment: { ...this.state.investment, [type]: e.currentTarget.value}})
            } 
    }

    handleTicker(e) {
        if(e.code) { this.setState({ show: true, keyPress: e.currentTarget.value})}
    }

    // handleClick(e) {
    //     this.setState({ clicked: true, investment: { ticker: e.currentTarget.value}})
    // }

    handleSubmit(e) {
        e.preventDefault();

        let form = document.getElementById('investment-form-body');
        let tags = form.getElementsByTagName('strong');
            for(let i = 0; i < tags.length; i++) {
                tags[i].textContent = ''
            }

        let apikey = window.finnhubAPIKey;
        let ticker = this.state.investment.ticker
        let marketOpen = this.testTime();

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

            this.setState({ loading: false, investment: { ...this.state.investment, prev_close: price, last_fetch: dateString} },
                () => this.props.action(this.state.investment)
                    .then(() => this.props.fetchAccounts())
                    .then(() =>this.props.closeModal())
                )
    }

    submitInvestment() {
        this.props.action(this.state.investment)
        .catch(() => this.setState({loading: false }))
    }

    renderErrors() {
        let errors = this.props.errors
        errors = errors.map( message => {
            if(message === "Inv name can't be blank") {
                return "Name can't be blank"
            } else if (message === "Account can't be blank") {
                 return "Select account from dropdown"
            } else if (message === "Prev close Invalid Ticker") {
                 return "Invalid Ticker - select from search options"
            } else if (message !== 'Account must exist') {
                return message
            }
        })
        let errorMessages = errors.map((error, i) => (
                        <li key={`error-${i}`}>
                            {error}
                        </li>
                    ))
        return errorMessages;
    }

    // Can add new errors, but does not remove old errors
    // renderErrors(field) {
    //     let errors = this.props.errors.filter(error => error.includes(field));
    //     if(errors.length > 0) {
    //         errors = errors.map( message => {
    //             if (message === "Account can't be blank") {
    //                 return "select from dropdown"
    //             } else if (message !== 'Account must exist') {
    //                 let num = field.length
    //                 return message.slice(num)
    //             }
    //         })

    //         let errorMessages = 
    //             <strong className='error-red' key={`error-${field}`}>
    //                 - {errors[0]}
    //             </strong>
    //         return errorMessages;
    //     } else {
    //         return '';
    //     }
    // }

    filterStocks() {
        let betterMatches = [];
        let anyMatches = 
            this.props.stocks.filter( (stock) => {
                if(this.state.investment.ticker.toLowerCase() === stock.ticker.toLowerCase()) {
                    betterMatches.unshift(stock)
                    return false;
                } else if(stock.name.toLowerCase().startsWith(this.state.investment.ticker.toLowerCase())) {
                    betterMatches.push(stock)
                    return false;
                } else {
                    return (stock.name.toLowerCase().includes(this.state.investment.ticker.toLowerCase()) ||
                    stock.ticker.toLowerCase().includes(this.state.investment.ticker.toLowerCase()))
                }
            })
        return betterMatches.concat(anyMatches)
    }

    makeMatches(allMatches) {
        let matching = allMatches.slice(0,4)
        let matches = matching.map((stock) => {
            let company = stock.name.split(' ').map( (word) => {
                return word[0].toUpperCase() + word.slice(1).toLowerCase()
            }).join(' ');
            return (
                    <option className='option' key={`${stock.ticker}`} value={`${stock.ticker}`}>{company}</option>
                    // <option onClick={this.handleClick} className='option' key={`${stock.ticker}`} value={`${stock.ticker}`}>{company}</option>
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
    
        let filteredStocks = [];
        let optionSelected = '';
            if((this.state.investment.ticker !== '') && (this.state.investment.ticker !== this.state.keyPress)) {
                optionSelected = 'hidden'
            } else if(this.props.stocks && this.state.investment.ticker !== '') {
                filteredStocks = this.filterStocks();
            } 

        let matches;
        let noResult = 'hidden';
        if(filteredStocks.length === 0 && this.state.investment.ticker !== ''){
            noResult = ''
        } else {
            matches = this.makeMatches(filteredStocks)
        }

        return (
            <section className='investment-form-holder'>
                <section className='investment-form-close'>
                        <button onClick={this.props.closeModal}> <AiOutlineCloseCircle/> </button>
                </section>
                <div className='investment-form'>
                    <h2>{this.props.formHeading}</h2>
                <form className='investment-form-body' id='investment-form-body'>
                    <ul>
                        {this.renderErrors()} 
                    </ul>
                    <label>Account 
                        {/* {this.renderErrors('Account')}  */}
                        <select defaultValue={defaultAccount} name="account_id" className="transaction-account" onChange={this.handleChange('account_id')} >
                            <option value='' disabled>---Please Select----</option>
                            {accountsDropdown}
                        </select>
                    </label>
                    <br/>
                    <label>Name/Description 
                        {/* {this.renderErrors('Inv name')}  */}
                        <input id='investment-name' type="text" value={this.state.investment.inv_name}
                                onChange={this.handleChange('inv_name')}/>
                    </label>
                    <br/>
                    <label>Ticker Symbol 
                        {/* {this.renderErrors('Prev close')}  */}
                         <input className='investment-ticker'
                                type="text" 
                                list='companies'
                                placeholder='Search Company Name or Ticker'
                                value={this.state.investment.ticker}
                                onChange={this.handleChange('ticker')}
                                onKeyUp={this.handleTicker}/> 
                                    <datalist className={optionSelected} id="companies">
                                        {matches}
                                    </datalist> 
                            <div className={`no-results ${optionSelected} ${noResult}`}>No Matches Found</div>
                    </label>
                    <br/>
                    <label id='investment-shares'> Shares 
                    {/* {this.renderErrors('Shares')}  */}
                        <input placeholder='ex: 20.0' id='investment-shares' type="number" value={this.state.investment.shares}
                                onChange={this.handleChange('shares')}
                                />
                    </label>
                    <br/>
                    <label id='price-paid'> Price Paid 
                    {/* {this.renderErrors('Price paid')}  */}
                        <input placeholder='ex: 150.25' id='price-paid' type="number" value={this.state.investment.price_paid}
                                onChange={this.handleChange('price_paid')}
                                />
                    </label>
                    <div className={this.state.loading ? 'loading-label': 'loading-label hidden'}> Fetching Current Price</div>
                    <div className={this.state.loading ? 'wheel-loader': ''}></div>
                    <div className='button-holder'>
                        <button onClick={this.handleSubmit}>{this.props.formType}</button>
                    </div>
                </form>
                </div>
            </section>
        )
    }

}

export default InvestmentForm;