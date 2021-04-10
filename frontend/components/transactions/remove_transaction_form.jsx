import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';


class RemoveTransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.deleteTransaction(this.props.transaction.id)
            .then( () => this.props.closeModal());
    }

    render() {

        return (
            <section className='transaction-form-holder'>
                <section className='transaction-form-close'>
                        <button onClick={this.props.closeModal}> < AiOutlineCloseCircle /> </button>
                </section>
                <div className='transaction-delete-form'>
                    <h2>Delete this transaction?</h2>
                    <div className='transaction-form-body'>
                        <div className='transaction-action-buttons'>
                            <button className='transaction-action-confirm' onClick={this.handleDelete}>Yes</button>
                            <button className='transaction-action-back' onClick={this.props.closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}

export default RemoveTransactionForm;