import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { reverse, isString } from 'lodash';
import DashRequestLineItem from './DashRequestLineItem';
import { getDayTotal } from '../utils/getProjectUtils';

const DashRequestsAggregate = ({ userLimit, userProjects, totals }) => (
  <section className="card has-floating-header">
    <header className="card-header">
      <h2 className="card-title">Total Requests</h2>
      <div className="info-tooltip has-margin-left is-hidden-mobile">
        <FontAwesomeIcon icon={['fal', 'info-circle']} />
        <div className="tooltip is-right">Daily requests for each project.</div>
      </div>
      <div className="card-header-note">All times are in UTC</div>
    </header>
    <section className="card-main list-requests">
      {reverse(totals).map(item => (
        <DashRequestLineItem
          dateFor={new Date(item[0])}
          dayTotal={getDayTotal(item[1])}
          limit={userLimit}
          key={item[0]}
          projectUsage={item[1]}
          userProjects={userProjects}
        />
      ))}
    </section>
  </section>
);

DashRequestsAggregate.defaultProps = {
  totals: [],
  userProjects: {},
};

DashRequestsAggregate.propTypes = {
  userLimit: PropTypes.number.isRequired,
  userProjects: props => {
    if (Object.keys(props.userProjects).length > 0) {
      Object.entries(props.userProjects).forEach(([key, project]) => {
        if (!('name' in project && isString(key))) {
          throw new Error('user.projects not in a key:{name} form');
        }
      });
    }
  },

  totals: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(
          PropTypes.shape({
            projectId: PropTypes.string,
            value: PropTypes.number,
          }),
        ),
      ]),
    ),
  ),
};

export default DashRequestsAggregate;
