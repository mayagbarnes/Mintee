import React from 'React';

class AccountItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let balance = parseFloat(this.props.account.balance);
            balance.toFixed(2);
          var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        
        return (
            <div>
                <div className='account-info-primary'>
                    <h4 className='account-name' >{this.props.account.account_name}</h4>
                    <h4 className='account-balance'>{formatter.format(balance)}</h4>
                </div>
                <p className='account-institution'>{this.props.account.institution}</p>
                <div className='account-change-buttons'>
                    <button className='account-update' onClick={ () => {this.props.openModal('Update', this.props.account)}}>Update</button>
                    <button className='account-delete' onClick={ () => {this.props.openModal('Delete', this.props.account)}}>Delete</button>
                    {/* <button className='account-delete' onClick={ () => {this.props.deleteAccount(this.props.account.id)}}>Delete</button> */}
                </div>
            </div>
        )
    }
}

export default AccountItem;