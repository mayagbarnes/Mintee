import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

class AccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.account
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(type) {
        return (e) => (
            this.setState({[type]: e.currentTarget.value}) 
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        this.props.action(this.state)
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
        let menu = false;

        return (
            <section className='account-form-holder'>
                <section className='account-form-close'>
                        <button onClick={this.props.closeModal}> < AiOutlineCloseCircle /> </button>
                </section>
                <div className='account-form'>
                    <h2>{this.props.formHeading}</h2>
                <div className='account-form-body'>
                    {this.renderErrors()}
                    <label> Account Name
                        <input id='account-name' type="text" value={this.state.account_name}
                                onChange={this.handleChange('account_name')}
                                />
                    </label>
                    <br/>
                    <label> Institution (Bank)
                        <input id='account-institution' type="text" value={this.state.institution}
                                onChange={this.handleChange('institution')}
                                />
                    </label>
                      <br/>
                    <label>Account Category
                         <br/>
                         <select defaultValue={defaultVal} name="category" className="account-category" onChange={this.handleChange('category')} >
                            <option value='' disabled>---Please Select----</option>
                            <option value="Cash">Cash</option>
                            <option value="Loan">Loan</option>
                            <option value="Investment">Investment</option>
                         </select> 
                    </label>
                    <br/>
                    <label> Balance
                        <input type="number" value={this.state.balance}
                                onChange={this.handleChange('balance')}
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

export default AccountForm;