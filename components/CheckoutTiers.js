import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { tierOfferings } from '../offerings';

const getTierProjects = tier => get(tier, 'entitlements.projects.attributes.cap', 0);

const CheckoutTiers = ({ tier, setTier, toggleModal, projectCount }) => (
  <section className="card has-floating-header">
    <header className="card-header has-header-note">
      <h2 className="card-title">Plan</h2>
      <span className="card-header-note">
        Need a custom solution? <Link to="/contact">Get in touch</Link>
      </span>
    </header>
    <section className="card-main">
      <ul className="plan-options-list">
        {tierOfferings.map(plan => (
          <li className="plan-option" key={`tier-${plan.type}`}>
            <input
              className="radio-btn"
              name="radio-collection"
              id={`plan-option-${plan.type}`}
              type="radio"
              checked={plan.type === tier.type}
              onChange={ev => {
                if (projectCount > getTierProjects(plan)) {
                  toggleModal('OVER_PROJECT_LIMIT', '', { limit: 3, usage: projectCount });
                  ev.preventDefault();
                } else {
                  setTier(plan.type);
                }
              }}
            />
            <label className="radio-label" htmlFor={`plan-option-${plan.type}`}>
              <span className="plan-option-name">{plan.name}</span>
              <span className="plan-option-feature">{plan.requests}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  </section>
);

CheckoutTiers.propTypes = {
  tier: PropTypes.shape({
    type: PropTypes.string,
  }).isRequired,
  setTier: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  projectCount: PropTypes.number.isRequired,
};

export default CheckoutTiers;
