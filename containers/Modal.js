import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Elements } from 'react-stripe-elements';
import { toggleModal as toggleModalAction } from '../actions/ui';
import ProjectForm from './ProjectForm';
import DeleteAccountForm from './DeleteAccountForm';
import DeleteProjectForm from './DeleteProjectForm';
import StripeFormModal from './StripeFormModal';

/*
Modal Types:

ADD_PROJECT
DELETE_ACCOUNT
DELETE_PROJECT
EDIT_PAYMENT
UPGRADE_SUBSCRIPTION
OVER_PROJECT_LIMIT
*/
const SUB_TIER_2_MESSAGE =
  'Tier 2 support tickets are answered ahead of common tickets for users needing a fast answer.';

const SUB_TIER_3_MESSAGE = 'Tier 3 support tickets are answered first for users needing an urgent answer.';

const Modal = ({ modalid, toggleModal, showModal, extraData }) => (
  <React.Fragment>
    {showModal && (
      <div className="modal is-active">
        <div className="modal-background" />

        <section className="card is-narrow-modal has-floating-shadow">
          <header className="card-header is-structured-header">
            <h2 className="card-title">
              {showModal === 'ADD_PROJECT' && 'Create New Project'}
              {showModal === 'DELETE_ACCOUNT' && 'Delete Account'}
              {showModal === 'DELETE_PROJECT' && 'Delete Project'}
              {showModal === 'EDIT_PAYMENT' && 'Change Payment'}
              {showModal === 'UPGRADE_SUBSCRIPTION' && 'Upgrade'}
              {showModal === 'OVER_PROJECT_LIMIT' && 'Over Project Limit'}
              {showModal === 'CONFIRMATION' && extraData.title}
            </h2>
            <div className="button-close" onClick={toggleModal} onKeyDown={toggleModal} role="button" tabIndex={0}>
              <FontAwesomeIcon icon={['far', 'times']} size="lg" />
            </div>
          </header>
          <section className="card-main">
            <ProjectForm type="CREATE" display={showModal === 'ADD_PROJECT'} />
            {showModal === 'DELETE_ACCOUNT' && <DeleteAccountForm />}
            {showModal === 'DELETE_PROJECT' && <DeleteProjectForm projectid={modalid} />}
            {showModal === 'EDIT_PAYMENT' && (
              <Elements
                fonts={[
                  {
                    src: 'url(https://s3.amazonaws.com/infura-fonts/lineto-akkurat-regular.woff)',
                    family: 'Lineto Akkuratmono Regular',
                  },
                ]}
              >
                <StripeFormModal triggerSuccess={toggleModal} type="MODIFY" />
              </Elements>
            )}
            {showModal === 'CONFIRMATION' && (
              <div>
                <h3 className="empty-ui-title has-color-red">{extraData.line1}</h3>
                <p>{extraData.line2}</p>
                <div className="modal-controls ">
                  <button onClick={() => toggleModal()} className="button is-ghost-secondary has-margin-right-m">
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      extraData.onConfirm();
                      toggleModal();
                    }}
                    className="button"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
            {showModal === 'UPGRADE_SUBSCRIPTION' && (
              <div>
                <h2 className="modal-header">
                  Upgrade your account for {modalid === 'sub_tier_2' ? 'Tier 2' : 'Tier 3'} support
                </h2>
                <p>{modalid === 'sub_tier_2' ? SUB_TIER_2_MESSAGE : SUB_TIER_3_MESSAGE}</p>
                <div className="modal-controls ">
                  <button onClick={() => toggleModal()} className="button is-ghost-secondary has-margin-right-base">
                    Cancel
                  </button>
                  <a href="/payment" className="button">
                    Upgrade
                  </a>
                </div>
              </div>
            )}
            {showModal === 'OVER_PROJECT_LIMIT' && (
              <div>
                <h2 className="modal-header">Delete extra projects to downgrade</h2>
                <p>
                  You are trying to downgrade to a tier that only offers {extraData.limit}
                  free projects. You currently have {extraData.usage} projects in your account. To continue please
                  delete extra projects first
                </p>
                <div className="modal-controls">
                  <button onClick={() => toggleModal()} className="button is-ghost-secondary has-margin-right-base">
                    Cancel
                  </button>
                  <a href="/dashboard" className="button">
                    Dashboard
                  </a>
                </div>
              </div>
            )}
          </section>
        </section>
      </div>
    )}
  </React.Fragment>
);

Modal.defaultProps = {
  extraData: {},
};

Modal.propTypes = {
  modalid: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
  extraData: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  state => ({
    showModal: state.ui.showModal,
    modalid: state.ui.modalid,
    extraData: state.ui.data,
  }),
  {
    toggleModal: () => toggleModalAction('', ''),
  },
)(Modal);
