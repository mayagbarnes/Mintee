import React from 'react';
import { closeModal } from '../../actions/account_modal_actions';
import { connect } from 'react-redux';
import CreateAccountContainer from '../../components/account/create_account_form_container';
import UpdateAccountContainer from '../../components/account/update_account_form_container';
import DeleteAccountContainer from '../account/delete_account_container';
import AddTransactionContainer from '../transactions/add_transaction_container';
import EditTransactionContainer from '../transactions/edit_transaction_container';
import RemoveTransactionContainer from '../transactions/remove_transaction_container';

function Modal({modal, itemId, closeModal}) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'Create':
      component = <CreateAccountContainer />;
      break;
    case 'Update':
      component = <UpdateAccountContainer accountId={itemId} />;
      break;
    case 'Delete':
      component = <DeleteAccountContainer accountId={itemId}/> 
      break;
    case 'Add':
      component = <AddTransactionContainer transactionId={itemId}/> 
      break;
    case 'Edit':
      component = <EditTransactionContainer transactionId={itemId}/> 
      break;
    case 'Remove':
      component = <RemoveTransactionContainer transactionId={itemId}/> 
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal.type,
    itemId: state.ui.modal.itemId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
