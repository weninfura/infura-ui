import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-form';
import validate from 'validate.js';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import ServerError from './ServerError';
import Field from './Field';

const constraints = {
  email: { presence: true, email: true },
  password: {
    presence: true,
    length: {
      minimum: 8,
      message: 'must be at least 8 characters',
    },
  },
};

class Login extends PureComponent {
  constructor() {
    super();

    this.state = {
      errors: {},
      challenge: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { action: login } = this.props;

    const errors = validate(values, constraints) || {};

    this.setState({ errors });

    if (this.props.loginChallenge) {
      values = { ...values, challenge: this.props.loginChallenge };
    }

    if (Object.keys(errors).length === 0) {
      login(values);
    }
  }

  render() {
    const { errors } = this.state;
    const { authError, hasUser, fetching } = this.props;

    return (
      <div>
        <section className="card has-floating-shadow">
          <header className="auth-card-header">
            <h1 className="auth-header-title">Log In to Your Account</h1>
          </header>
          <div className="card-main">
            <Form className="auth-form" onSubmit={this.handleSubmit}>
              {formApi => (
                <form onSubmit={formApi.submitForm} autoComplete="on" data-testid="auth-form">
                  <div className="auth-form-error">
                    <ServerError serverError={authError} />
                  </div>
                  <Field name="email" type="email" errors={errors} />
                  <Field name="password" type="password" errors={errors} />
                  <div className="control form-submit has-text-centered">
                    <button
                      type="submit"
                      className={classNames('button has-extra-padding auth-button', {
                        'is-loading': fetching,
                        'is-success': hasUser,
                      })}
                      data-testid="auth-button"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              )}
            </Form>
            <footer className="auth-card-footer has-text-centered">
              <Link to="/forgotpassword">Forgot your Password?</Link>
            </footer>
          </div>
        </section>
        <div className="auth-sub-footer has-text-centered">
          Not a member yet?{' '}
          <Link to="/register" onClick={this.clearAllErrors} className="is-link-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  action: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }).isRequired,
  authError: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  hasUser: PropTypes.bool.isRequired,
  loginChallenge: PropTypes.string,
};

export default Login;
