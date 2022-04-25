import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoData from './NoData';
import getTopValues from './getTopValues';
import numberWithCommas from '../../utils/numberWithCommas';
import getPercentage from '../../utils/getPercentage';

const TopMethodCalls = ({ data, period, project }) => {
  const total = data ? data.reduce((a, c) => a + parseInt(c.value, 10), 0) : 0;

  return (
    <section className="column is-6">
      <section className="card metric-card flex-card has-stretched-content has-floating-header">
        <header className="card-header">
          <h2 className="card-title">Top 10 Method Calls</h2>
          <div className="info-tooltip has-margin-left is-hidden-mobile">
            <FontAwesomeIcon icon={['fal', 'info-circle']} />
            <div className="tooltip is-right">
              Methods with the most requests to Infura from {project} over the&nbsp;
              <span className="is-lowercase">{period}</span>.
            </div>
          </div>
        </header>
        <section className="card-main">
          {data.length === 0 ? (
            <NoData />
          ) : (
            <ul className="graph-bar-horizontal">
              {getTopValues(data, 10).map(method => (
                <li className="bar-horizontal" key={method.label}>
                  <span className="bar-data-name">{method.label || '(blank)'}</span>
                  <div>
                    <span className="bar-data-item">{numberWithCommas(method.value)}</span>
                    <span className="bar-data-item">{getPercentage(method.value, total)}%</span>
                  </div>
                  <span className="bar-viz" style={{ width: `${getPercentage(method.value, total)}%` }} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </section>
  );
};

TopMethodCalls.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  period: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
};

export default TopMethodCalls;
