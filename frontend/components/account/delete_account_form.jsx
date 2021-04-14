import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';


class DeleteAccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.deleteAccount(this.props.account.id)
            .then( () => this.props.closeModal());
    }

    render() {

        return (
            <section className='account-form-holder'>
                <section className='account-form-close'>
                        <button onClick={this.props.closeModal}> < AiOutlineCloseCircle /> </button>
                </section>
                <div className='account-form'>
                    <h2>Delete this account?</h2>
                    <div className='account-form-body'>
                        <div className='account-change-buttons'>
                            <button className='account-delete' onClick={this.handleDelete}>Yes</button>
                            <button className='account-confirm' onClick={this.props.closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}

export default DeleteAccountForm;