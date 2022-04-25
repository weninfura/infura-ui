import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isString } from 'lodash';
import numberWithCommas from '../utils/numberWithCommas';
import { getProjectName } from '../utils/getProjectUtils';

// eslint-disable-next-line object-curly-newline
const DashRequestLineItem = ({ dateFor, dayTotal, limit, projectUsage, userProjects }) => (
  <div className="request-group">
    <header className="request-group-header">
      <div>
        <FontAwesomeIcon icon={['fal', 'calendar-alt']} className="has-margin-right-smallest has-color-secondary" />
        <span className="request-meta">
          {dateFor.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' })}
        </span>
      </div>
      {dayTotal < limit ? (
        <div>
          <span className="request-number has-color-secondary">{numberWithCommas(dayTotal)}</span>
        </div>
      ) : (
        <div>
          <FontAwesomeIcon
            icon={['fal', 'exclamation-triangle']}
            className="has-margin-right-smallest has-color-primary"
          />
          <span className="request-number has-color-primary">{numberWithCommas(dayTotal)}</span>
        </div>
      )}
    </header>
    {projectUsage.length > 1 && dayTotal > 0 && (
      <ul className="request-group-list">
        {projectUsage.map(
          ({ projectId, value }) =>
            value > 0 && (
              <li className="request-group-item" key={projectId}>
                <div className="request-info">
                  <span className="request-project">{getProjectName(userProjects, projectId)}</span>
                </div>
                <span className="request-number">{numberWithCommas(value)}</span>
              </li>
            ),
        )}
      </ul>
    )}
  </div>
);

DashRequestLineItem.defaultProps = {
  projectUsage: [],
  userProjects: {},
};

DashRequestLineItem.propTypes = {
  dateFor: PropTypes.instanceOf(Date).isRequired,
  dayTotal: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  projectUsage: PropTypes.arrayOf(
    PropTypes.shape({
      projectId: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ),
  userProjects: props => {
    if (Object.keys(props.userProjects).length > 0) {
      Object.entries(props.userProjects).forEach(([key, project]) => {
        if (!('name' in project && isString(key))) {
          throw new Error('user.projects not in a key:{name} form');
        }
      });
    }
  },
};

export default DashRequestLineItem;
