import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount as deleteAccountAction } from '../actions/auth';
import { toggleModal as toggleModalAction } from '../actions/ui';

const DeleteAccountForm = ({ deleteAccount, toggleModal }) => (
  <div>
    <h3 className="empty-ui-title has-color-red">Are you sure you want to delete your account?</h3>
    <p>Deleting your account will remove all of your info from our database. This cannot be undone.</p>
    <div className="modal-controls">
      <button onClick={() => toggleModal()} className="button is-ghost-secondary has-margin-right-base">
        Cancel
      </button>
      <button onClick={deleteAccount} className="button">
        Delete
      </button>
    </div>
  </div>
);

DeleteAccountForm.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  {
    deleteAccount: deleteAccountAction,
    toggleModal: toggleModalAction,
  },
)(DeleteAccountForm);
