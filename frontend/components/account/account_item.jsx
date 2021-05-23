import React from 'react';

const AccountItem = (props) => {
    let balance = parseFloat(props.account.balance);
    balance.toFixed(2);

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div>
            <div className='account-info-primary'>
                <h4 className='account-name' >{props.account.account_name}</h4>
                <h4 className='account-balance'>{formatter.format(balance)}</h4>
            </div>
            <div className='account-info-secondary'>
                <p className='account-institution'>{props.account.institution}</p>
                <div className='account-change-buttons'>
                    <button className='account-update' onClick={ () => {props.openModal('Update', props.account)}}>Update</button>
                    <button className='account-delete' onClick={ () => {props.openModal('Delete', props.account)}}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default AccountItem;