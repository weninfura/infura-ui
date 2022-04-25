import React, { PureComponent } from 'react';
import { Form, Radio, RadioGroup } from 'react-form';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import Field from '../components/Field';
import { API_URL } from '../constants';
import { tierOfferings } from '../offerings';
import { getUserSubscriptionTier } from '../utils/userUtils';

const constraints = {
  name: { presence: true },
  subject: { presence: true },
  message: { presence: true },
};

class MailboxForm extends PureComponent {
  constructor() {
    super();

    this.state = {
      submitting: false,
      submitted: false,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, e, formApi) {
    const { mailbox, user, getCurrentUser } = this.props;
    const errors = validate(values, constraints);
    const subscriptionTier = getUserSubscriptionTier(user);
    this.setState({ errors: {} });

    if (errors) {
      return this.setState({ errors });
    }

    this.setState({ submitting: true });
    return fetch(`${API_URL}contact`, {
      method: 'post',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        email: user.email,
        ...values,
        mailbox,
        subscriptionTier,
      }),
    })
      .then(async result => {
        const resp = await result.json();

        formApi.resetAll();
        this.setState({
          submitting: false,
          submitted: true,
        });

        // Update the user.
        // But the problem is that updating the user won't rerender the form
        getCurrentUser();

        // Forwards to the dashboard with some state to show a flash message
        this.props.history.push('/dashboard', {
          submit: {
            status: 'is-success',
            message: `Ticket #${resp.data.id} successfully submitted`,
          },
        });
      })
      .catch(() => {
        this.props.history.push('/dashboard', {
          submit: {
            status: 'is-error',
            message: 'Ticket failed to successfully submit. Please try again later',
          },
        });
      });
  }

  render() {
    const { textareaHeader, submitButtonText, successButtonText, toggleModalAction, user } = this.props;

    const { submitted, submitting, errors } = this.state;
    const subscriptionTier = getUserSubscriptionTier(user);
    // const criticalRemaining = getCriticalRemaining(user);

    return (
      <section className="section is-large">
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <section className="card flex-card has-floating-light-shadow">
                <section className="card-main card-support">
                  <div
                    className={`support-upgrade-overlay ${
                      subscriptionTier && subscriptionTier !== tierOfferings[0].type ? 'is-hidden' : ''
                    }`}
                  >
                    <div className="support-upgrade">
                      <h3 className="support-upgrade-cta">Need direct customer support? Upgrade your plan!</h3>
                      <p className="support-upgrade-copy">
                        Starting at $50/mo you can get access to our expert support team!
                      </p>
                      <a href="/upgrade" className="button has-extra-padding">
                        Upgrade
                      </a>
                    </div>
                  </div>

                  <Form onSubmit={this.handleSubmit}>
                    {user &&
                      (formApi => (
                        <form onSubmit={formApi.submitForm}>
                          <Field name="name" type="text" errors={errors} />
                          <Field name="subject" type="text" errors={errors} />
                          <Field name="message" label={textareaHeader} type="textarea" errors={errors} />

                          <label className="label" htmlFor="radio-options-list">
                            Ticket Level
                          </label>
                          <RadioGroup field="priority">
                            <ul
                              className="radio-options-list
                            has-margin-bottom-base"
                            >
                              {subscriptionTier === tierOfferings[1].type && (
                                <li className="radio-option">
                                  <div className="radio-option-inner">
                                    <Radio
                                      className="radio-btn"
                                      name="support-priority"
                                      id="support-option-1"
                                      value="low"
                                    />
                                    <label className="radio-label" htmlFor="support-option-1">
                                      <span className="radio-option-name">Tier 1</span>
                                      <span className="radio-option-feature">Public Queue</span>
                                    </label>
                                  </div>
                                </li>
                              )}
                              <li className="radio-option">
                                <div className="radio-option-inner">
                                  <Radio
                                    className="radio-btn"
                                    name="support-priority"
                                    id="support-option-2"
                                    disabled={subscriptionTier === tierOfferings[1].type ? 'disabled' : false}
                                    value="normal"
                                  />
                                  <label className="radio-label" htmlFor="support-option-2">
                                    <span className="radio-option-name">
                                      <span>Tier 2</span>
                                    </span>
                                    <span className="radio-option-feature">24hr response</span>
                                    {subscriptionTier === tierOfferings[1].type && (
                                      <div>
                                        <a
                                          href="/upgrade"
                                          className="is-uppercase is-small radio-option-link"
                                          onClick={ev => {
                                            ev.preventDefault();
                                            toggleModalAction('UPGRADE_SUBSCRIPTION', 'sub_tier_2');
                                          }}
                                        >
                                          Upgrade
                                        </a>
                                        <span className="radio-option-upgrade">Upgrade</span>
                                      </div>
                                    )}
                                  </label>
                                </div>
                              </li>
                              <li className="radio-option">
                                <div className="radio-option-inner">
                                  <Radio
                                    className="radio-btn"
                                    name="support-priority"
                                    id="support-option-3"
                                    disabled={subscriptionTier !== tierOfferings[3].type ? 'disabled' : false}
                                    value="high"
                                  />
                                  <label className="radio-label" htmlFor="support-option-3">
                                    <span className="radio-option-name">
                                      <span>Tier 3</span>
                                    </span>
                                    <span className="radio-option-feature">8hr response</span>
                                    {subscriptionTier !== tierOfferings[3].type && (
                                      <div>
                                        <a
                                          href="/upgrade"
                                          className="is-uppercase is-small radio-option-link"
                                          onClick={ev => {
                                            ev.preventDefault();
                                            toggleModalAction('UPGRADE_SUBSCRIPTION', 'sub_tier_3');
                                          }}
                                        >
                                          Upgrade
                                        </a>
                                        <span className="radio-option-upgrade">Upgrade</span>
                                      </div>
                                    )}
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </RadioGroup>

                          <div className="control form-submit">
                            <button
                              type="submit"
                              className={classNames('button', {
                                'is-loading': submitting,
                                '': !submitted,
                                'is-success': submitted,
                              })}
                            >
                              {!submitted ? submitButtonText : successButtonText}
                            </button>
                          </div>
                        </form>
                      ))}
                  </Form>
                </section>
              </section>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

MailboxForm.propTypes = {
  mailbox: PropTypes.string.isRequired,
  textareaHeader: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  successButtonText: PropTypes.string.isRequired,
  toggleModalAction: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    service_plan: PropTypes.shape({
      infura_plus: PropTypes.object,
    }),
  }),
  getCurrentUser: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

MailboxForm.defaultProps = {
  user: null,
};

export default withRouter(MailboxForm);
