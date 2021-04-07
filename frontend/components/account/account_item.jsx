import React from 'React';

class AccountItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='account-item'>
                <p className='account-name' >{this.props.account.account_name}</p>
                <p className='account-institution'>{this.props.account.institution}</p>
                <p className='account-balance'>${this.props.account.balance}</p>
            </div>
        )
    }
}

export default AccountItem;