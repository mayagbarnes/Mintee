import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

class InvestmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.investment
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(type) {
        return (e) =>  {
             let value = ''
                if(type === 'ticker') {
                    value = e.currentTarget.value.toUpperCase()
                } else {
                    value = e.currentTarget.value
                };
                return this.setState( {[type]: value} )
            } 
    }

    handleSubmit() {
        let apikey = window.finnhubAPIKey;
        let ticker = this.state.ticker;

        fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apikey}`)
            .then(response => response.json())
            .then(quote => {this.validateTicker(quote["c"])})
    }

    validateTicker(price) {
        if(price === 0) {
            alert("Invalid Ticker"); 
        } else {
            this.props.action(this.state)
            .then( () => this.props.closeModal());
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
        let defaultAccount = this.state.account_id;
        let accountsDropdown = this.props.accounts.map( (account) => {
            return  <option 
                        key={account.id}
                        value={account.id}>
                        {account.account_name}
                    </option>
        })
        
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
                        <input id='investment-name' type="text" value={this.state.inv_name}
                                onChange={this.handleChange('inv_name')}/>
                    </label>
                    <br/>
                    <label> Ticker Symbol
                        <input id='investment-ticker' type="text" value={this.state.ticker}
                                onChange={this.handleChange('ticker')}
                                />
                    </label>
                    <br/>
                    <label> Shares
                        <input type="number" value={this.state.shares}
                                onChange={this.handleChange('shares')}
                                />
                    </label>
                    <br/>
                    <label> Price Paid
                        <input type="number" value={this.state.price_paid}
                                onChange={this.handleChange('price_paid')}
                                />
                    </label>
                    <br/>
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