import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.transaction
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(type) {
        return (e) => (this.setState( {[type]: e.currentTarget.value} ) )
    }

    handleSubmit() {
        let accountId = this.state.account_id
        this.props.action(this.state)
            .then(() => this.props.fetchAccount(accountId))
            .then( () => this.props.closeModal());
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
        let defaultVal = this.state.category;
        let defaultAccount = this.state.account_id;
        let accountsDropdown = this.props.accounts.map( (account) => {
            return  <option 
                        key={account.id}
                        value={account.id}>
                        {account.account_name}
                    </option>
        })
        
        return (
            <section className='transaction-form-holder'>
                <section className='transaction-form-close'>
                        <button onClick={this.props.closeModal}> < AiOutlineCloseCircle /> </button>
                </section>
                <div className='transaction-form'>
                    <h2>{this.props.formHeading}</h2>
                <div className='transaction-form-body'>
                    {this.renderErrors()} 
                    <label>Account
                        <br/>
                        <select defaultValue={defaultAccount} name="account_id" className="transaction-account" onChange={this.handleChange('account_id')} >
                            <option value='' disabled>---Please Select----</option>
                            {accountsDropdown}
                        </select>
                    </label>
                    <br/>
                    <label> Date
                        <input id='transaction-date' type="date" value={this.state.date}
                                onChange={this.handleChange('date')}
                                />
                    </label>
                    <label> Description
                        <input id='transaction-description' type="text" value={this.state.description}
                                onChange={this.handleChange('description')}
                                />
                    </label>
                    <label>Category
                         <br/>
                        <div className='custom-select-wrapper'>
                        <select defaultValue={defaultVal} name="category" className="transaction-category" onChange={this.handleChange('category')} >
                            <option value='' disabled>---Please Select----</option>
                            <option value="Bills and Utilities">Bills and Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Food and Dining">Food and Dining</option>
                            <option value="Health and Fitness">Health and Fitness</option>
                            <option value="Home">Home</option>
                            <option value="Income">Income</option>
                            <option value="Personal Care">Personal Care</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Misc Expenses">Misc Expenses</option>
                            <option value="Other">Other</option>
                        </select>
                        </div>
                    </label>
                    <label> Amount
                        <input type="number" value={this.state.amount}
                                onChange={this.handleChange('amount')}
                                />
                    </label>
                    <div className='button-holder'>
                        <button onClick={this.handleSubmit}>{this.props.formType}</button>
                    </div>
                </div>
                </div>
            </section>
        )
    }

}

export default TransactionForm;