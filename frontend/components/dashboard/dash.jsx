import React from 'react';
import MainNavContainer from '../main_nav/main_nav_container'

class Dash extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAccounts();
    }

    render() {
        // let cashAccounts = this.props.accounts.map( account => {
        //     if(account.category === 'Cash') {
        //         return account.account_name
        //     }
        // })
        return (
            <div>
                <section className='main-nav'>
                    < MainNavContainer />
                </section>
                <section className='dash-main'>
                    <div>Cash</div>
                        <ul>
                        </ul>
                    <div>Loans</div>
                        <ul>
                        </ul>
                    <div>Investments</div>
                        <ul>
                        </ul>
                </section>
            </div>
            
        )
    }
}

export default Dash;