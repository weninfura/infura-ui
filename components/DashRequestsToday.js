import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getPercentage from '../utils/getPercentage';
import numberWithCommas from '../utils/numberWithCommas';

// eslint-disable-next-line arrow-parens
const DashRequestsToday = ({ usage, limit }) => (
  <section className="card has-floating-header">
    <header className="card-header dash-aside-top-header">
      <h2 className="card-title">Requests Today</h2>
      <div className="info-tooltip has-margin-left is-hidden-mobile">
        <FontAwesomeIcon icon={['fal', 'info-circle']} />
        <div className="tooltip is-right">Total requests sent today up to the previous hour.</div>
      </div>
    </header>
    <section className="card-main">
      <div className="progress-bar-wrapper">
        <header className="progress-bar-header">
          <span className="text-label has-no-margin-bottom">Total</span>
          {usage < limit ? (
            <span>
              <span className="has-color-secondary">{numberWithCommas(usage)}</span> of {numberWithCommas(limit)}
            </span>
          ) : (
            <span>
              <FontAwesomeIcon
                icon={['fal', 'exclamation-triangle']}
                className="has-margin-right-smallest has-color-primary"
              />
              <span className="has-color-primary">{numberWithCommas(usage)}</span> of {numberWithCommas(limit)}
            </span>
          )}
        </header>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${usage < limit ? Math.round(getPercentage(usage, limit)) : 100}%` }}
          />
        </div>
        {usage < limit ? (
          <span className="progress-bar-note">
            {Math.round(getPercentage(usage, limit))}% of total daily requests used
          </span>
        ) : (
          <span className="progress-bar-note warning">
            Exceeded total daily requests by {Math.round(getPercentage(usage, limit)) - 100}%
          </span>
        )}
      </div>
    </section>
  </section>
);

DashRequestsToday.propTypes = {
  usage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};

export default DashRequestsToday;
