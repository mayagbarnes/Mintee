import React from 'react';
import {MdDeleteForever} from 'react-icons/md';
import {GrEdit} from 'react-icons/gr';

class TransactionItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let amount = parseFloat(this.props.transaction.amount);
            amount.toFixed(2);
          var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });

        let amountClass = amount > 0 ? 'change-green' : '';
        
        return (
            <tr className='transaction-info'>
                <td className='transaction-date'>{this.props.transaction.date}</td>
                <td className='transaction-desc'>{this.props.transaction.description}</td>
                <td className='transaction-category'>{this.props.transaction.category}</td>
                <td className={`transaction-amount ${amountClass}`}>{formatter.format(amount)}</td>
                <td className='transaction-change-buttons'>
                    <button className='transaction-update' onClick={ () => {this.props.openModal('Edit', this.props.transaction)}}> < GrEdit /> </button>
                    <button className='transaction-delete' onClick={ () => {this.props.openModal('Remove', this.props.transaction)}}><MdDeleteForever /></button>
                </td>
            </tr>
        )
    }
}

export default TransactionItem;