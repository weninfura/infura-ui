import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-form';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import validate from 'validate.js';
import ServerError from './ServerError';
import Field from './Field';
import PasswordStrengthMeter from '../components/forms/PasswordStrengthMeter';
import VerifyEmail from './VerifyEmail';

const constraints = {
  email: { presence: true, email: true },
  password: {
    presence: true,
    length: {
      minimum: 8,
      message: 'must be at least 8 characters',
    },
  },
  name: { presence: true },
};

export default class Register extends PureComponent {
  constructor() {
    super();
    this.state = {
      errors: {},
      passwordFocused: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearAllErrors = this.clearAllErrors.bind(this);
  }

  handleSubmit(values) {
    const { handler, loginChallenge } = this.props;

    this.clearAllErrors();

    const errors = validate(values, constraints) || {};

    this.setState({ errors });

    if (loginChallenge) {
      values = { ...values, challenge: loginChallenge };
    }

    if (Object.keys(errors).length === 0) {
      handler(values);
    }
  }

  clearAllErrors() {
    const { clearAuthErrors } = this.props;

    clearAuthErrors(); // clear server errors
    this.setState({ errors: {} }); // clear local errors
  }

  render() {
    const { errors } = this.state;
    const { fetching, hasUser, email, authError } = this.props;

    return hasUser ? (
      <VerifyEmail email={email} />
    ) : (
      <div>
        <section className="card has-floating-shadow">
          <header className="auth-card-header">
            <h1 className="auth-header-title">Get Started for Free</h1>
          </header>
          <div className="card-main">
            <Form className="auth-form" onSubmit={this.handleSubmit}>
              {formApi => (
                <form onSubmit={formApi.submitForm} autoComplete="on" data-testid="auth-form">
                  <div className="auth-form-error">
                    <ServerError serverError={authError} />
                  </div>
                  <Field name="name" type="text" errors={errors} />
                  <Field name="email" type="email" errors={errors} />
                  <Field
                    name="password"
                    type="password"
                    errors={errors}
                    handleFocus={() => this.setState({ passwordFocused: true })}
                    handleBlur={() => this.setState({ passwordFocused: false })}
                  />
                  <PasswordStrengthMeter
                    passwordValue={formApi.values.password || ''}
                    focused={this.state.passwordFocused}
                  />
                  
                  <div className="control form-submit has-text-centered">
                    <button
                      type="submit"
                      className={classNames('button has-extra-padding auth-button', {
                        'is-loading': fetching,
                        'is-success': hasUser,
                      })}
                      data-testid="auth-button"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              )}
            </Form>
            <footer className="auth-card-footer has-text-centered">
              Signing up signifies you have read and agree to the
              <br />
              <Link to="/terms">Terms of Service</Link> and&nbsp;
              <Link to="/privacy">Privacy Policy</Link>.
            </footer>
          </div>
        </section>
        <div className="auth-sub-footer has-text-centered">
          Already have an account? &nbsp;
          <Link to="/login" onClick={this.clearAllErrors} className="is-link-secondary">
            Log In
          </Link>
        </div>
      </div>
    );
  }
}

Register.defaultProps = {
  email: '',
};

Register.propTypes = {
  action: PropTypes.shape({
    register: PropTypes.func.isRequired,
  }).isRequired,
  authError: PropTypes.string.isRequired,
  clearAuthErrors: PropTypes.func.isRequired,
  email: PropTypes.string,
  fetching: PropTypes.bool.isRequired,
  hasUser: PropTypes.bool.isRequired,
  loginChallenge: PropTypes.string,
};
