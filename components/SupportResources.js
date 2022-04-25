import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SupportResources = ({ isSubscriber }) => (
  <section className={`section support-resources ${isSubscriber ? 'is-hidden' : ''}`}>
    <div className="container">
      <div className="columns support-resources-cards">
        <div className="column is-3 is-offset-3">
          <a className="card-resource has-bg-primary" href="https://community.infura.io">
            <div className="card-resource-content">
              <FontAwesomeIcon icon={['fab', 'discourse']} size="3x" className="card-resource-icon" />
              <span className="text-label has-color-white has-no-margin-bottom">Community</span>
              <div className="card-resource-cta">
                <span>Ask experts your questions</span>
                <FontAwesomeIcon icon={['fal', 'arrow-right']} size="lg" />
              </div>
            </div>
          </a>
        </div>
        <div className="column is-3">
          <Link className="card-resource has-bg-secondary" to="/docs">
            <div className="card-resource-content">
              <FontAwesomeIcon icon={['fal', 'books']} size="3x" className="card-resource-icon" />
              <span className="text-label has-color-white has-no-margin-bottom">Documentation</span>
              <div className="card-resource-cta">
                <span>Learn how to use Infura</span>
                <FontAwesomeIcon icon={['fal', 'arrow-right']} size="lg" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

SupportResources.propTypes = {
  isSubscriber: PropTypes.bool,
};

SupportResources.defaultProps = {
  isSubscriber: false,
};

export default SupportResources;
