import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ServerError from './ServerError';

const MfaCard = ({
  authError,
  changeHandler,
  mfaCode,
  mfaEnabled,
  mfaLink,
  mfaVerified,
  toggleMFA,
  value,
  verifyMFA,
}) => (
  <div>
    {mfaVerified ? (
      <span className="settings-input-desc">2-Factor Authentication enabled on: {mfaVerified}</span>
    ) : (
      <React.Fragment>
        <div className="settings-input-wrapper is-single">
          <div className="settings-input">
            <input
              name="mfa-enable"
              id="mfa-enable"
              type="checkbox"
              className="checkbox-input"
              onClick={() => {
                toggleMFA();
              }}
              enabled={mfaEnabled ? 'enabled' : null}
            />
          </div>
          <div className="settings-input-main">
            <label htmlFor="mfa-enable" className="settings-input-name">
              Enable Two-Factor Authentication
            </label>
            <span className="settings-input-desc">
              We all know the benefits of 2FA so please go ahead and enable it.
            </span>
          </div>
        </div>
      </React.Fragment>
    )}

    {mfaLink && (
      <div className="account-2fa-wrapper columns">
        <div className="account-2fa-code column is-one-quarter">
          <img alt="Auth QR Code" src={mfaLink} />
        </div>
        <div className="account-2fa-verification column is-three-quarters">
          <form
            className="account-2fa-code-form"
            onSubmit={ev => {
              ev.preventDefault();
              verifyMFA();
            }}
          >
            <div className="auth-form-error">
              <ServerError serverError={authError} />
            </div>
            <label htmlFor="mfa-verify" className="label">
              Verify your code
            </label>
            <div className="field is-combo">
              <input
                type="text"
                name="mfa-verify"
                id="mfa-verify"
                onChange={ev => changeHandler(ev.currentTarget.value)}
                className="input"
                value={value}
              />
              <button className="button">Verify</button>
            </div>
          </form>
          <span className="text-label has-color-black">MFA Code</span>
          <span className="account-2fa-mfa">{mfaCode}</span>
          <span className="account-2fa-mfa-note">
            <FontAwesomeIcon
              icon={['fal', 'exclamation-circle']}
              size="lg"
              className="has-margin-right-smallest has-color-primary"
            />
            Be sure to write this down to recover your account
          </span>
        </div>
      </div>
    )}
  </div>
);

MfaCard.defaultProps = {
  authError: '',
  mfaCode: '',
  mfaLink: '',
  mfaVerified: '',
  value: '',
};

MfaCard.propTypes = {
  authError: PropTypes.string,
  changeHandler: PropTypes.func.isRequired,
  mfaCode: PropTypes.string,
  mfaEnabled: PropTypes.bool.isRequired,
  mfaLink: PropTypes.string,
  mfaVerified: PropTypes.string,
  toggleMFA: PropTypes.func.isRequired,
  value: PropTypes.string,
  verifyMFA: PropTypes.func.isRequired,
};

export default MfaCard;
