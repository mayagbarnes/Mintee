import React from 'react';
import MainNavContainer from '../main_nav/main_nav_container';
import AccountItem from '../account/account_item';

class Dash extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAccounts();
    }

    render() {
        let accounts = this.props.accounts.map( account => {
            return < AccountItem key={account.id}
            account={account} 
            updateAccount={this.props.updateAccount}
            deleteAccount={this.props.deleteAccount} />
        });

        return (
            <div>
                <section className='main-nav'>
                    {< MainNavContainer />}
                </section>
                <section className='dash-main'>
                    <div className='category'>Cash</div>
                        <ul>
                            {accounts}
                        </ul>
                    <div className='category'>Loans</div>
                        <ul>
                        </ul>
                    <div className='category'>Investments</div>
                        <ul>
                        </ul>
                </section>
            </div>
            
        )
    }
}

export default Dash;