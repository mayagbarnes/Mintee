import React from 'react';

class SidebarAccountItem extends React.Component {
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
                <div className='sidebar-account-primary'>
                    <h4 className='account-name' >{this.props.account.account_name}</h4>
                    <h4 className='sidebar-account-balance'>{formatter.format(balance)}</h4>
                </div>
                <p className='sidebar-account-institution'>{this.props.account.institution}</p>
            </div>
        )
    }
}

export default SidebarAccountItem;