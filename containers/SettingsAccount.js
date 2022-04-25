import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ServerError from '../components/ServerError';
import AccountLevelBanner from '../components/AccountLevelBanner';
import ChangePassForm from './ChangePassForm';
import ChangeEmailForm from './ChangeEmailForm';
import MfaCard from '../components/MfaCard';
import { toggleModal as toggleModalAction } from '../actions/ui';
import { userIsSubscribed, getUserAddons, getUserTier } from '../selectors/user';
import { userMFAActivated } from '../selectors/mfa';
import MFACodeSelector from '../selectors/auth';
import { getRenewalDate } from '../selectors/subscription';
import {
  toggleMFA as toggleMFAAction,
  enableMFA as enableMFAAction,
  updateVerificationCode as updateVerificationCodeAction,
} from '../actions/auth';

const SettingsAccount = ({
  addons,
  authError,
  enableMFA,
  isSubscribed,
  mfaCode,
  mfaEnabled,
  mfaLink,
  MFAVerificationCode,
  mfaVerified,
  renewalDate,
  tier,
  toggleMFA,
  toggleModal,
  user,
  updateVerificationCode,
}) => (
  <section className="section has-padding-bottom-app">
    <div className="container">
      <div className="columns">
        <section className="column is-8 is-offset-2">
          {isSubscribed && (
            <AccountLevelBanner isSubscribed={isSubscribed} tier={tier} addons={addons} renewalDate={renewalDate} />
          )}
          <section className="card has-floating-header">
            <header className="card-header">
              <h2 className="card-title">Account Details</h2>
            </header>
            <section className="card-main">
              {false && (
                <div className="account-gravatar">
                  <span className="account-gravatar-image is-hidden">
                    <img src="https://fillmurray.com/60/60" alt="Placeholder" />
                  </span>
                </div>
              )}
              <ChangeEmailForm currentEmail={user.email} />
            </section>
          </section>

          <section className="card has-floating-header">
            <header className="card-header">
              <h2 className="card-title">Password</h2>
            </header>
            <section className="card-main">
              <ServerError serverError={authError} />
              <ChangePassForm />
            </section>
          </section>

          <section className="card has-floating-header">
            <header className="card-header">
              <h2 className="card-title">2-Factor Authentication</h2>
            </header>
            <section className="card-main">
              <MfaCard
                authError={authError}
                toggleMFA={toggleMFA}
                mfaEnabled={mfaEnabled}
                mfaCode={mfaCode}
                mfaLink={mfaLink}
                mfaVerified={mfaVerified}
                verifyMFA={enableMFA}
                changeHandler={updateVerificationCode}
                value={MFAVerificationCode}
              />
            </section>
          </section>

          <button onClick={toggleModal} className="button is-text account-delete">
            Delete Account
          </button>
        </section>
      </div>
    </div>
  </section>
);

SettingsAccount.defaultProps = {
  addons: [],
  mfaCode: '',
  mfaLink: '',
  MFAVerificationCode: '',
  mfaVerified: '',
};

SettingsAccount.propTypes = {
  addons: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  authError: PropTypes.string.isRequired,
  enableMFA: PropTypes.func.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  renewalDate: PropTypes.string.isRequired,
  mfaCode: PropTypes.string,
  mfaEnabled: PropTypes.bool.isRequired,
  mfaLink: PropTypes.string,
  MFAVerificationCode: PropTypes.string,
  mfaVerified: PropTypes.string,
  tier: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  toggleMFA: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  updateVerificationCode: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    addons: getUserAddons(state),
    authError: state.auth.authError,
    isSubscribed: userIsSubscribed(state),
    mfaCode: state.auth.mfaCode,
    mfaEnabled: state.auth.mfaEnabled,
    mfaLink: state.auth.mfaLink,
    MFAVerificationCode: MFACodeSelector(state),
    mfaVerified: userMFAActivated(state),
    renewalDate: getRenewalDate(state),
    tier: getUserTier(state),
    user: state.auth.user,
  }),
  {
    toggleMFA: toggleMFAAction,
    toggleModal: () => toggleModalAction('DELETE_ACCOUNT'),
    updateVerificationCode: updateVerificationCodeAction,
    enableMFA: enableMFAAction,
  },
)(SettingsAccount);
