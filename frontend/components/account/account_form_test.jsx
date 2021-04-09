import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

class AccountFormTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.account;
        this.state[menu] = 'closed';
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState( this.state[menu] = 'open')
    }

    handleClick(type) {
        return (e) => (this.setState( { [type]: e.currentTarget.value} ) )
    }

    handleChange(type) {
        return (e) => (this.setState( {[type]: e.currentTarget.value} ) )
    }

    handleSubmit() {
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
                        <div onClick={this.handleToggle} className='custom-select-wrapper'>
                            <div className={`custom-select ${this.state.menu}`}>
                                <div className="custom-select__trigger"><span>---Please Select----</span>
                                    <div className="arrow"></div>
                                </div>
                                <div className="custom-options">
                                    <span onClick={this.handleClick('category')} className="custom-option selected" data-value="Cash">Cash</span>
                                    <span onClick={this.handleClick('category')} className="custom-option" data-value="Loan">Loan</span>
                                    <span onClick={this.handleClick('category')} className="custom-option" data-value="Investment">Investment</span>
                                </div>
                            </div>
                        </div>
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

export default AccountFormTest;