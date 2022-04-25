import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ServerError from './ServerError';

export default class MFAVerification extends PureComponent {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.verifyMFA();
  }

  render() {
    const { authError, MFAVerificationCode, updateVerificationCode } = this.props;
    return (
      <div>
        <section className="card has-floating-shadow">
          <header className="auth-card-header">
            <h1 className="auth-header-title">Enter your Auth Token</h1>
          </header>
          <div className="card-main">
            <div className="auth-form-error">
              <ServerError serverError={authError} />
            </div>
            <form className="auth-form" onSubmit={this.handleSubmit}>
              <div className="field">
                <label htmlFor="mfa-verify" className="label">
                  Verify your code
                </label>
                <input
                  type="text"
                  name="mfa-verify"
                  id="mfa-verify"
                  value={MFAVerificationCode}
                  onChange={ev => updateVerificationCode(ev.currentTarget.value)}
                  className="input"
                />
              </div>
              <div className="control form-submit has-text-centered">
                <button
                  type="submit"
                  className={classNames('button has-extra-padding auth-button', {
                    'is-loading': false, // fetching,
                    'is-success': false, // hasUser,
                  })}
                  data-testid="verify-button"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

MFAVerification.propTypes = {
  authError: PropTypes.string.isRequired,
  MFAVerificationCode: PropTypes.string.isRequired,
  updateVerificationCode: PropTypes.func.isRequired,
  verifyMFA: PropTypes.func.isRequired,
};
