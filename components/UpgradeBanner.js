import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoonIconSvg from '../svgs/MoonIconSvg';
import { canGetTrial } from '../utils/userUtils';

const UpgradeBanner = ({ closeBanner, user }) => (
  <section className="section banner-upgrade">
    <div className="container">
      <div className="columns">
        <div className="column is-1 is-2-tablet is-1-widescreen banner-icons">
          <MoonIconSvg />
        </div>
        <div className="column is-7-tablet is-9-widescreen banner-content">
          <span className="banner-label">Infura+</span>
          <span className={canGetTrial(user) ? 'is-hidden banner-copy' : 'banner-copy'}>
            Upgrade to Plus for more services to grow your application.
          </span>
          <span className={canGetTrial(user) ? 'banner-copy' : 'is-hidden banner-copy'}>
            Thanks for being a loyal Infura user, upgrade your account and receive a free 3 month trial!
          </span>
        </div>
        <div className="column is-3-tablet is-2-widescreen banner-actions">
          {closeBanner && (
            <div
              className="button-close is-floating-close"
              role="button"
              tabIndex={0}
              onClick={closeBanner}
              onKeyDown={closeBanner}
            >
              <FontAwesomeIcon icon={['far', 'times']} />
            </div>
          )}
          <a className="button is-secondary banner-button-upgrade" href="/upgrade">
            Upgrade
          </a>
        </div>
      </div>
    </div>
  </section>
);

UpgradeBanner.propTypes = {
  closeBanner: PropTypes.func.isRequired,
  user: PropTypes.shape({
    created: PropTypes.number,
  }).isRequired,
};

export default UpgradeBanner;
