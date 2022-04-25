import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import LogoStackedSvg from '../svgs/LogoStackedSvg';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Register from '../components/Register';
import Consent from '../components/Consent';
import MFACodeSelector from '../selectors/auth';
import {
  clearAuthErrors as clearAuthErrorsAction,
  register as registerAction,
  login as loginAction,
  verifyMFA as verifyMFAAction,
  updateVerificationCode as updateVerificationCodeAction,
} from '../actions/auth';
import { userHasMFA } from '../selectors/mfa';
import MFAVerification from '../components/MFAVerification';

class PageAuth extends PureComponent {
  render() {
    const {
      authError,
      clearAuthErrors,
      email,
      fetching,
      hasMFA,
      hasUser,
      login,
      MFAVerificationCode,
      register,
      type,
      updateVerificationCode,
      verifyMFA,
      hasLoginChallengeParam,
      loginChallenge,
    } = this.props;

    const isOAuth = hasLoginChallengeParam || type === 'CONSENT';

    return (
      <div className="site-wrapper has-bg-primary has-no-nav">
        <section className="site-content has-bg-primary">
          <div className="container">
            <header className="section is-medium has-text-centered">
              {!isOAuth && (
                <Link to="/">
                  <LogoStackedSvg />
                </Link>
              )}
            </header>
            <div className="section columns has-no-padding-top has-padding-bottom-app">
              <div className="column is-4 is-offset-4">
                {type === 'LOGIN' && (
                  <Login
                    action={login}
                    authError={authError}
                    clearErrors={clearAuthErrors}
                    hasUser={hasUser}
                    hasMFA={hasMFA}
                    fetching={fetching}
                    loginChallenge={loginChallenge}
                  />
                )}
                {type === 'REGISTER' && (
                  <Register
                    handler={register}
                    authError={authError}
                    clearAuthErrors={clearAuthErrors}
                    email={email}
                    fetching={fetching}
                    loginChallenge={loginChallenge}
                  />
                )}
                {type === 'MFA' && (
                  <MFAVerification
                    authError={authError}
                    MFAVerificationCode={MFAVerificationCode}
                    updateVerificationCode={updateVerificationCode}
                    verifyMFA={verifyMFA}
                  />
                )}
                {type === 'CONSENT' && <Consent authError={authError} />}
              </div>
            </div>
          </div>
        </section>
        {!isOAuth && <Footer />}
      </div>
    );
  }
}

PageAuth.propTypes = {
  authError: PropTypes.string.isRequired,
  clearAuthErrors: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  hasMFA: PropTypes.bool.isRequired,
  hasUser: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
  MFAVerificationCode: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  updateVerificationCode: PropTypes.func.isRequired,
  verifyMFA: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    state => ({
      authError: state.auth.authError,
      email: state.auth.user ? state.auth.user.email : '',
      fetching: state.auth.fetching,
      hasMFA: userHasMFA(state),
      hasUser: !!state.auth.user,
      MFAVerificationCode: MFACodeSelector(state),
      hasLoginChallengeParam: state.auth.hasLoginChallengeParam,
      loginChallenge: state.auth.loginChallenge,
    }),
    {
      clearAuthErrors: clearAuthErrorsAction,
      register: registerAction,
      login: loginAction,
      updateVerificationCode: updateVerificationCodeAction,
      verifyMFA: verifyMFAAction,
    },
  )(PageAuth),
);
