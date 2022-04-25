import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResendVerificationButton from '../containers/ResendVerificationButton';

const VerifyEmail = ({ email }) => (
  <section className="card has-floating-shadow">
    <header className="auth-card-header">
      <span className="icon-circle has-margin-bottom-small">
        <FontAwesomeIcon icon={['fal', 'envelope']} />
      </span>
      <h1 className="auth-header-title">Check Your Email</h1>
      <span className="auth-confirmation-email">{email}</span>
    </header>
    <div className="card-main has-text-centered">
      <p>
        Thank you for signing up for Infura!
        <br />
        We&apos;ve sent an email to you. Click the link in the email to confirm your account.
      </p>
      <p>If you don&apos;t see the email, check your junk folder.</p>
      <div className="control has-text-centered form-submit">
        <ResendVerificationButton />
      </div>
    </div>
  </section>
);

VerifyEmail.propTypes = {
  email: PropTypes.string.isRequired,
};

export default VerifyEmail;
