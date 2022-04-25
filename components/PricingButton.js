import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PricingButton = ({ isCurrent, chosenPlan, toggleModal, projectCount }) =>
  isCurrent ? (
    <button className="button is-ghost-secondary plan-button" disabled>
      Current Plan
    </button>
  ) : (
    <Link
      to={{
        pathname: '/payment',
        state: { chosenPlan },
      }}
      onClick={ev => {
        if (projectCount > 3) {
          ev.preventDefault();
          toggleModal('OVER_PROJECT_LIMIT', '', { limit: 3, usage: projectCount });
        }
      }}
      className="button plan-button"
    >
      Select Plan
    </Link>
  );

PricingButton.defaultProps = {
  toggleModal: () => {},
  projectCount: 0,
};

PricingButton.propTypes = {
  isCurrent: PropTypes.bool.isRequired,
  chosenPlan: PropTypes.string.isRequired,
  toggleModal: PropTypes.func,
  projectCount: PropTypes.number,
};

export default PricingButton;
