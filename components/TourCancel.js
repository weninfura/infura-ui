import React from 'react';
import PropTypes from 'prop-types';

const TourCancel = ({ completeOnboarding, toggleAskCancel }) => (
  <React.Fragment>
    <span className="tour-exit-title">Are you sure you want to exit the tour?</span>
    <div className="tour-exit-actions">
      <button className="button is-small is-ghost-primary" onClick={completeOnboarding}>
        Exit
      </button>
      <button className="button is-small is-ghost-dark" onClick={toggleAskCancel}>
        Cancel
      </button>
    </div>
  </React.Fragment>
);

TourCancel.propTypes = {
  completeOnboarding: PropTypes.func.isRequired,
  toggleAskCancel: PropTypes.func.isRequired,
};

export default TourCancel;
