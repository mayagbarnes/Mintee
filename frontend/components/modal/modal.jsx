import React from 'react';
import { closeModal } from '../../actions/account_modal_actions';
import { connect } from 'react-redux';
import CreateAccountContainer from '../../components/account/create_account_form_container';
import UpdateAccountContainer from '../../components/account/update_account_form_container';
import DeleteAccountContainer from '../account/delete_account_container';

function Modal({modal, accountId, closeModal}) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'Create':
      component = <CreateAccountContainer />;
      break;
    case 'Update':
      component = <UpdateAccountContainer accountId={accountId} />;
      break;
    case 'Delete':
      component = <DeleteAccountContainer accountId={accountId}/> 
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
    accountId: state.ui.modal.accountId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
