import React from 'react';

class ItemsContainer extends React.Component {

    render() {
        return (
            <div>
                {this.props.transactions.map( transaction => 
                    < TransactionItem key={transaction.id}
                        transaction={transaction} 
                        openModal={this.props.openModal}/>
                    )}
            </div>
        )
    }
}


export default ItemsContainer;