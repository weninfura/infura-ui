import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import MailboxForm from '../components/MailboxForm';
import SupportResources from '../components/SupportResources';
import { toggleModal as toggleModalAction } from '../actions/ui';
import { getCurrentUser as getCurrentUserAction } from '../actions/auth';
import { getUserSubscriptionTier } from '../utils/userUtils';
import { tierOfferings } from '../offerings';

const PageSupportTicket = ({ user, toggleModal, getCurrentUser }) => (
  <Page>
    <main className="site-content">
      <header className="section is-large page-header">
        <div className="container">
          <div className="columns">
            <section className="column is-6 is-offset-3 has-text-centered">
              <h1 className="header-title">Submit a Ticket</h1>
              <p className="header-subhead has-color-white">
                Need help? Submit a support ticket and a team member will get back to you.
              </p>
            </section>
          </div>
        </div>
      </header>

      <MailboxForm
        mailbox="134639"
        textareaHeader="describe your issue"
        submitButtonText="Submit Ticket"
        successButtonText="Ticket Successfully Sent"
        getCurrentUser={getCurrentUser}
        toggleModalAction={toggleModal}
        user={user}
      />

      <SupportResources
        isSubscriber={getUserSubscriptionTier(user) && getUserSubscriptionTier(user) !== tierOfferings[0].type}
      />
    </main>
  </Page>
);

PageSupportTicket.defaultProps = {
  user: {},
};

PageSupportTicket.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    service_plan: PropTypes.shape({
      infura_plus: PropTypes.object,
    }),
  }),
  toggleModal: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: state.auth.user,
  }),
  {
    toggleModal: toggleModalAction,
    getCurrentUser: getCurrentUserAction,
  },
)(PageSupportTicket);
