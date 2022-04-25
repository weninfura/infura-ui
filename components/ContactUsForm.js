import React, { PureComponent } from 'react';
import { Form } from 'react-form';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import Field from '../components/Field';
import { API_URL } from '../constants';

const successMessageDuration = 3000;

const constraints = {
  name: { presence: true },
  email: { presence: true, email: true },
  subject: { presence: true },
  message: { presence: true },
};

class ContactUsForm extends PureComponent {
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
    const errors = validate(values, constraints);

    this.setState({ errors: {} });

    if (errors) {
      return this.setState({ errors });
    }

    this.setState({ submitting: true });

    return fetch(`${API_URL}contact`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ ...values, type: 'general' }),
    })
      .then(() => {
        formApi.resetAll();

        this.setState({
          submitting: false,
          submitted: true,
        });

        setTimeout(() => this.setState({ submitted: false }), successMessageDuration);
      })
      .catch(err => {
        console.log('error', err);
      });
  }

  render() {
    const { submitted, submitting, errors } = this.state;
    const { textareaHeader, submitButtonText, successButtonText } = this.props;

    return (
      <section className="section is-medium">
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <section className="card flex-card">
                <section className="card-main">
                  <Form onSubmit={this.handleSubmit}>
                    {formApi => (
                      <form onSubmit={formApi.submitForm}>
                        <Field name="name" type="text" errors={errors} />
                        <Field name="email" type="email" errors={errors} />
                        <Field name="subject" type="text" errors={errors} />
                        <Field name="message" label={textareaHeader} type="textarea" errors={errors} />
                        <div className="control form-submit has-text-centered">
                          <button
                            type="submit"
                            className={classNames('button is-large', {
                              'is-loading': submitting,
                              'is-black': !submitted,
                              'is-success': submitted,
                            })}
                          >
                            {!submitted ? submitButtonText : successButtonText}
                          </button>
                        </div>
                      </form>
                    )}
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

ContactUsForm.propTypes = {
  textareaHeader: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  successButtonText: PropTypes.string.isRequired,
};

export default ContactUsForm;
