import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import ccBrandStripeToFA from '../utils/ccBrandStripeToFA';
import { toggleModal as toggleModalAction } from '../actions/ui';

const CardDisplay = ({ user, toggleModal }) => {
  let categoryFA = 'fal';
  let iconNameFA = '';

  iconNameFA = ccBrandStripeToFA(get(user, 'payment_providers.stripe.card_brand'));
  if (iconNameFA !== 'credit-card-blank') {
    categoryFA = 'fab';
  }

  return (
    <section className="card has-floating-header">
      <header className="card-header">
        <h2 className="card-title">Payment Info</h2>
      </header>
      <section className="card-main billing-payment-method">
        <div className="billing-payment-card">
          <span className="billing-payment-icon">
            <FontAwesomeIcon icon={[categoryFA, iconNameFA]} size="3x" className="is-cc-blank" />
          </span>
          <span className="billing-payment-name is-flex">
            Card ending in {get(user, 'payment_providers.stripe.last_four')}
          </span>
        </div>
        <button
          className="button is-ghost-secondary billing-payment-change-btn"
          onClick={ev => {
            ev.preventDefault();
            toggleModal();
          }}
        >
          Change
        </button>
      </section>
    </section>
  );
};

CardDisplay.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: state.auth.user,
  }),
  {
    toggleModal: () => toggleModalAction('EDIT_PAYMENT'),
  },
)(CardDisplay);
