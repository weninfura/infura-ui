import React, { PureComponent } from 'react';
import { Form } from 'react-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Field from '../components/Field';
import PasswordStrengthMeter from '../components/forms/PasswordStrengthMeter';
import ServerError from '../components/ServerError';
import { clearAuthErrors as clearAuthErrorsAction, changePassword as changePasswordAction } from '../actions/auth';

const passwordConstraint = {
  presence: true,
  length: {
    minimum: 8,
    message: 'must be at least 8 characters',
  },
};

const constraints = {
  newPassword: passwordConstraint,
  confirmNewPassword: { ...passwordConstraint, equality: 'newPassword' },
};

class ResetPassForm extends PureComponent {
  constructor() {
    super();

    this.state = {
      errors: {},
      formSuccess: false,
      passwordFocused: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearAllErrors = this.clearAllErrors.bind(this);
  }

  clearAllErrors() {
    const { clearAuthErrors } = this.props;

    clearAuthErrors(); // clear server errors
    this.setState({ errors: {} }); // clear local errors
  }

  handleSubmit(values) {
    const { changePassword } = this.props;
    const errors = validate(values, constraints);

    this.clearAllErrors();

    if (errors) {
      return this.setState({ errors });
    }

    return changePassword({ ...values, reset: true });
  }

  render() {
    const { errors, formSuccess } = this.state;
    const { fetching, resetPass, authError } = this.props;

    return (
      <section className="card">
        {resetPass ? (
          <section className="card has-floating-shadow">
            <header className="auth-card-header">
              <span className="icon-circle has-margin-bottom-small">
                <FontAwesomeIcon icon={['fal', 'thumbs-up']} />
              </span>
              <h1 className="auth-header-title">Password Updated</h1>
            </header>
            <div className="card-main has-text-centered">
              <p>Your password has been successfully changed.</p>
              <div className="control has-text-centered form-submit">
                <Link to="/dashboard" className="button">
                  Visit dashboard
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <section className="card has-floating-shadow">
            <header className="auth-card-header">
              <h1 className="auth-header-title">Update Your Password</h1>
            </header>
            <div className="card-main">
              <Form onSubmit={this.handleSubmit}>
                {formApi => (
                  <form onSubmit={formApi.submitForm}>
                    <div className="auth-form-error">
                      <ServerError serverError={authError} />
                    </div>
                    <Field
                      name="newPassword"
                      label="New Password"
                      type="password"
                      errors={errors}
                      handleFocus={() => this.setState({ passwordFocused: true })}
                      handleBlur={() => this.setState({ passwordFocused: false })}
                    />
                    <PasswordStrengthMeter
                      passwordValue={formApi.values.newPassword || ''}
                      focused={this.state.passwordFocused}
                    />
                    <Field name="confirmNewPassword" label="Confirm New Password" type="password" errors={errors} />
                    <div className="control form-submit has-text-centered">
                      <button
                        type="submit"
                        className={classNames('button has-extra-padding', {
                          'is-loading': fetching,
                          'is-success': formSuccess,
                        })}
                      >
                        {formSuccess ? 'Success' : 'Save'}
                      </button>
                    </div>
                  </form>
                )}
              </Form>
            </div>
          </section>
        )}
      </section>
    );
  }
}

ResetPassForm.propTypes = {
  changePassword: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  resetPass: PropTypes.bool.isRequired,
  authError: PropTypes.string.isRequired,
  clearAuthErrors: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    fetching: state.auth.fetching,
    authError: state.auth.authError,
    resetPass: state.auth.resetPass,
  }),
  {
    changePassword: changePasswordAction,
    clearAuthErrors: clearAuthErrorsAction,
  },
)(ResetPassForm);
