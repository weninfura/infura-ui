import React, { PureComponent } from 'react';
import { Form } from 'react-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import Field from '../components/Field';
import { API_URL } from '../constants';
import { triggerFlashMessage as triggerFlashMessageAction } from '../actions/ui';

const constraints = {
  feedback: { presence: true },
};

class FeedbackForm extends PureComponent {
  constructor() {
    super();

    this.state = {
      isFormOpen: false,
      submitting: false,
      submitted: false,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  handleSubmit(values, e, formApi) {
    const { triggerFlashMessage } = this.props;
    const errors = validate(values, constraints);

    this.setState({ errors: {} });

    if (errors) {
      return this.setState({ errors });
    }

    this.setState({ submitting: true });

    return fetch(`${API_URL}at/feedback`, {
      method: 'post',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        ...values,
        submittedBy: this.props.email,
        submittedFrom: this.props.from,
      }),
    })
      .then(() => {
        formApi.resetAll();

        this.setState({
          submitting: false,
          submitted: true,
          isFormOpen: false,
        });

        triggerFlashMessage('Feedback Successfully Sent. Thanks!', 'success');

        this.setState({ submitted: false });
      })
      .catch(err => {
        console.log('error', err);
      });
  }

  toggleForm() {
    this.setState({ isFormOpen: !this.state.isFormOpen });
  }

  render() {
    const { isFormOpen, submitted, submitting, errors } = this.state;

    return isFormOpen ? (
      <section className="card-floating">
        <header className="card-floating-header">
          <div className="card-floating-action">
            <FontAwesomeIcon icon={['fal', 'comment']} size="3x" />
            <span>
              Send us your feedback and feature requests. Looking for help?{' '}
              <Link to="/support/ticket">Submit a support ticket.</Link>
            </span>
          </div>
          <div
            className="button-close"
            onClick={this.toggleForm}
            onKeyDown={this.toggleDash}
            role="button"
            tabIndex={0}
          >
            <FontAwesomeIcon icon={['far', 'times']} size="lg" />
          </div>
        </header>
        <Form onSubmit={this.handleSubmit}>
          {formApi => (
            <form onSubmit={formApi.submitForm}>
              <Field name="feedback" type="text" errors={errors} />
              <div className="control modal-controls">
                <button
                  type="submit"
                  className={classNames('button', {
                    'is-loading': submitting,
                    '': !submitted,
                    'is-success': submitted,
                  })}
                >
                  {!submitted ? 'Send Us Feedback' : 'Successfully Submitted'}
                </button>
              </div>
            </form>
          )}
        </Form>
      </section>
    ) : (
      <React.Fragment>
        <button onClick={this.toggleForm} className="button is-floating-action">
          <FontAwesomeIcon icon={['fal', 'comment']} />
          Send Us Feedback
        </button>
      </React.Fragment>
    );
  }
}

FeedbackForm.propTypes = {
  email: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  triggerFlashMessage: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    email: state.auth.user.email,
  }),
  { triggerFlashMessage: triggerFlashMessageAction },
)(FeedbackForm);
