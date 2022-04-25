import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AccountLevelBanner = ({ addons, isSubscribed, renewalDate, tier }) =>
  isSubscribed && (
    <section className="columns banner-account">
      <div className="column is-3 banner-icons">
        <FontAwesomeIcon icon={['fal', 'rocket']} className="banner-rocket" />
        <FontAwesomeIcon icon={['fal', 'moon-stars']} className="banner-moon has-color-primary" />
      </div>
      <div className="column is-6">
        <h2 className="banner-account-level">
          {tier.name}
          {addons.length > 0 && <span> + {addons.map(it => it.name).join()}</span>}
        </h2>
        {renewalDate !== 0 && <span className="banner-account-renewal">{renewalDate}</span>}
        <Link className="button is-text" to="/payment">
          Change Plan
        </Link>
      </div>
    </section>
  );

AccountLevelBanner.propTypes = {
  addons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  renewalDate: PropTypes.string.isRequired,
  tier: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default AccountLevelBanner;
