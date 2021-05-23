import React from 'react';
import {MdDeleteForever} from 'react-icons/md';
import {GrEdit} from 'react-icons/gr';

const TransactionItem = (props) => {

    let amount = parseFloat(props.transaction.amount);
    amount.toFixed(2);

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    let amountClass = amount > 0 ? 'change-green' : '';

    return (
        <tr className='transaction-info'>
            <td className='transaction-date'>{props.transaction.date}</td>
            <td className='transaction-desc'>{props.transaction.description}</td>
            <td className='transaction-category'>{props.transaction.category}</td>
            <td className={`transaction-amount ${amountClass}`}>{formatter.format(amount)}</td>
            <td className='transaction-change-buttons'>
                <button className='transaction-update' onClick={ () => {props.openModal('Edit', props.transaction)}}> < GrEdit /> </button>
                <button className='transaction-delete' onClick={ () => {props.openModal('Remove', props.transaction)}}><MdDeleteForever /></button>
            </td>
        </tr>
    )
}

export default TransactionItem;