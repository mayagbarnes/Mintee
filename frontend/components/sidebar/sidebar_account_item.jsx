import React from 'react';

const SidebarAccountItem = (props) => {
    let balance = parseFloat(props.account.balance);
    balance.toFixed(2);

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div>
            <div className='sidebar-account-primary'>
                <h4 className='account-name' >{props.account.account_name}</h4>
                <h4 className='sidebar-account-balance'>{formatter.format(balance)}</h4>
            </div>
            <p className='sidebar-account-institution'>{props.account.institution}</p>
        </div>
    )

}

export default SidebarAccountItem;