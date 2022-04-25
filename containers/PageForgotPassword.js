import React, { PureComponent } from 'react';
import { Form } from 'react-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import validate from 'validate.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Field from '../components/Field';
import LogoStackedSvg from '../svgs/LogoStackedSvg';
import Footer from '../components/Footer';
import { API_URL } from '../constants';

const constraints = {
  email: { presence: true, email: true },
};

const resendErrorState = {
  submitting: false,
  submitted: false,
  errors: { email: 'Please check your email' },
};

class ForgetPassword extends PureComponent {
  constructor() {
    super();

    this.state = {
      submitting: false,
      submitted: false,
      email: null,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, e, formApi) {
    const errors = validate(values, constraints);

    this.setState({ errors: {} });

    if (errors) {
      return this.setState({ errors });
    }

    this.setState({ submitting: true, email: values.email });

    return fetch(`${API_URL}user/resetpassemail`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ ...values }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          formApi.resetAll();

          return this.setState({
            submitting: false,
            submitted: true,
          });
        }

        return this.setState(resendErrorState);
      })
      .catch(() => this.setState(resendErrorState));
  }

  render() {
    const { submitted, submitting, errors, email } = this.state;

    return (
      <div className="site-wrapper has-bg-primary has-no-nav">
        <section className="site-content has-bg-primary">
          <div className="container">
            <header className="section is-medium has-text-centered">
              <Link to="/">
                <LogoStackedSvg />
              </Link>
            </header>
            <div className="section columns has-no-padding-top">
              <div className="column is-4 is-offset-4">
                {!submitted ? (
                  <section className="card  has-floating-shadow">
                    <header className="auth-card-header">
                      <h1 className="auth-header-title">Reset Password</h1>
                    </header>
                    <div className="card-main">
                      <Form onSubmit={this.handleSubmit}>
                        {formApi => (
                          <form onSubmit={formApi.submitForm}>
                            <Field name="email" type="email" errors={errors} />
                            <div className="control form-submit has-text-centered">
                              <button
                                type="submit"
                                className={classNames('button', {
                                  'is-loading': submitting,
                                  '': !submitted,
                                  'is-success': submitted,
                                })}
                              >
                                Reset My Password
                              </button>
                            </div>
                          </form>
                        )}
                      </Form>
                    </div>
                  </section>
                ) : (
                  <section className="card has-floating-shadow">
                    <header className="auth-card-header">
                      <span className="icon-circle has-margin-bottom-small">
                        <FontAwesomeIcon icon={['fal', 'envelope']} />
                      </span>
                      <h1 className="auth-header-title">Check Your Email</h1>
                      <span className="auth-confirmation-email">{email}</span>
                    </header>
                    <div className="card-main has-text-centered">
                      <p>We&apos;ve sent an email to you. Click the link in the email to reset your password.</p>
                      <p className="has-no-margin-bottom">If you don&apos;t see the email, check your junk folder.</p>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default ForgetPassword;
