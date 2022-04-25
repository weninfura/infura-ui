import React, { useEffect, useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import { delay } from 'lodash';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResendVerificationButton from './ResendVerificationButton';
import LogoStackedSvg from '../svgs/LogoStackedSvg';
import Footer from '../components/Footer';
import { getCurrentUser } from '../actions/auth';

const PageResendVerify = ({ user }) => {
  const dispatch = useDispatch();

  const getUser = useCallback(() => {
    if (!user.verified) {
      delay(() => {
        dispatch(getCurrentUser());
      }, 5000);
    }
  }, [dispatch, user]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="site-wrapper has-bg-primary has-no-nav">
      <section className="site-content has-bg-primary">
        <div className="container">
          <header className="section is-medium has-text-centered">
            <LogoStackedSvg />
          </header>
          <div className="section columns has-padding-bottom-app has-no-padding-top">
            <div className="column is-4 is-offset-4">
              <section className="card has-floating-shadow">
                <header className="auth-card-header">
                  <span className="icon-circle has-margin-bottom-small">
                    <FontAwesomeIcon icon={['fal', 'envelope']} />
                  </span>
                  <h1 className="auth-header-title">Verify your Account</h1>
                </header>
                <div className="card-main has-text-centered">
                  <p>A verification email was sent to {user.email}.</p>
                  <p>Please check your email and confirm your account by clicking the verification link.</p>
                  <p>
                    If you missed it check your spam folder, or click below to resend your verification email. If you
                    continue to have trouble, please <a href="mailto:support@infura.io">email support</a>.
                  </p>
                  <div className="control has-text-centered form-submit">
                    <ResendVerificationButton />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

PageResendVerify.defaultProps = {
  user: {},
};

PageResendVerify.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

export default connect(state => ({
  user: state.auth.user,
}))(PageResendVerify);
