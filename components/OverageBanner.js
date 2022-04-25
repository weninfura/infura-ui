import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import numberWithComans from '../utils/numberWithCommas';

const OverageBanner = ({ limit }) => (
  <section className="section banner-overage has-text-centered">
    <FontAwesomeIcon icon={['fal', 'exclamation-triangle']} size="lg" className="has-margin-right-smallest" />
    You have hit your {numberWithComans(limit)} requests per day. <a href="/upgrade">Upgrade now</a> for more requests
    and features.
  </section>
);

OverageBanner.propTypes = {
  limit: PropTypes.number.isRequired,
};

export default OverageBanner;
