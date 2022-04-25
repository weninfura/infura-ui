import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SignupCta = ({ isAuthenticated }) => (
  <React.Fragment>
    {!isAuthenticated && (
      <section className="section is-large signup-cta has-arrow-bg">
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-offset-2 has-text-centered">
              <h2 className="section-header-title has-color-black has-margin-bottom-base">
                Connect to Ethereum and IPFS now
              </h2>
              <a className="button is-floating is-secondary is-large" href="/register">
                Get Started for Free
              </a>
            </div>
          </div>
        </div>
      </section>
    )}
  </React.Fragment>
);

SignupCta.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(
  state => ({ isAuthenticated: !!state.auth.userid }),
  {},
)(SignupCta);
