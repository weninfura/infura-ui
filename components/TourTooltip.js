import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TourCancel from './TourCancel';

const TourTooltip = ({
  side,
  titleCopy,
  bodyCopy,
  nextFunc,
  prevFunc,
  completeOnboarding,
  stepAmount,
  currentStepCount,
  buttonCopy,
  toggleAskCancel,
  askCancel,
}) => (
  <div className={`tooltip is-arrow-top is-${side} tour-tooltip`}>
    {askCancel ? (
      <section className="tour-tooltip-main tour-exit">
        <TourCancel completeOnboarding={completeOnboarding} toggleAskCancel={toggleAskCancel} />
      </section>
    ) : (
      <React.Fragment>
        <header className="tour-tooltip-header">
          <h2 className="tour-tooltip-title">{titleCopy}</h2>
          <div
            className="tooltip-close"
            role="button"
            tabIndex={0}
            onClick={toggleAskCancel}
            onKeyDown={toggleAskCancel}
          >
            <FontAwesomeIcon icon={['far', 'times']} size="lg" />
          </div>
        </header>
        <section className="tour-tooltip-main">
          <p>{bodyCopy}</p>
        </section>
        <footer className="tour-tooltip-footer">
          <ul>
            {new Array(stepAmount).fill().map((v, idx) => {
              const key = `step-bubble-${idx}`;
              const classes = `tour-step-indicator ${currentStepCount === idx ? 'is-active' : ''}`;
              return (
                <div
                  key={key}
                  idx={key}
                  className={classes}
                  role="button"
                  tabIndex={idx}
                  onClick={() => (currentStepCount > idx ? prevFunc(idx) : null)}
                  onKeyDown={() => (currentStepCount > idx ? prevFunc(idx) : null)}
                  style={currentStepCount > idx ? { cursor: 'pointer' } : {}}
                >
                  <span className="is-hidden">Step {idx}</span>
                </div>
              );
            })}
          </ul>
          <button className="button is-text tour-action" onClick={nextFunc}>
            {buttonCopy}
          </button>
        </footer>
      </React.Fragment>
    )}
  </div>
);

TourTooltip.propTypes = {
  side: PropTypes.string.isRequired,
  titleCopy: PropTypes.string.isRequired,
  bodyCopy: PropTypes.string.isRequired,
  nextFunc: PropTypes.func.isRequired,
  prevFunc: PropTypes.func.isRequired,
  completeOnboarding: PropTypes.func.isRequired,
  stepAmount: PropTypes.number.isRequired,
  currentStepCount: PropTypes.number.isRequired,
  buttonCopy: PropTypes.string.isRequired,
  toggleAskCancel: PropTypes.func.isRequired,
  askCancel: PropTypes.bool.isRequired,
};

export default TourTooltip;
