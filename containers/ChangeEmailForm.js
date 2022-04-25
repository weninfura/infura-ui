import React, { PureComponent } from 'react';
import { has } from 'lodash';
import { Form } from 'react-form';
import classNames from 'classnames';
import { connect } from 'react-redux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import Field from '../components/Field';
import { toggleModal as toggleModalAction } from '../actions/ui';
import { changeEmail as changeEmailAction } from '../actions/auth';
import errorCodeToCopy from '../utils/errorCodeToCopy';

const emailConstraint = {
  presence: true,
  email: true,
};

const constraints = {
  newEmail: emailConstraint,
};

class ChangeEmailForm extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.resetForm && !nextProps.fetching && !nextProps.changeEmailError) {
      prevState.resetForm();

      return { formSuccess: true, resetForm: null };
    }
    return null;
  }

  constructor() {
    super();

    this.state = {
      errors: {},
      resetForm: null,
      formSuccess: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, e, formApi) {
    const { changeEmail } = this.props;
    const errors = validate(values, constraints);

    this.setState({ errors: {} });

    if (errors) {
      return this.setState({ errors });
    }

    changeEmail(values);

    return this.setState({ resetForm: formApi.resetAll });
  }

  render() {
    const { errors, formSuccess } = this.state;
    const { fetching, currentEmail, changeEmailError, toggleModal } = this.props;

    if (!has(errors, 'newEmail') && changeEmailError) {
      errors.newEmail = errorCodeToCopy(changeEmailError);
    }

    return (
      <>
        <div className="field">
          <span className="text-label has-color-black">Current Email</span>
          {currentEmail}
        </div>
        <Form
          onSubmit={(values, e, formApi) =>
            toggleModal({
              title: 'Change Email',
              line1: 'Are you sure you want to change your email?',
              line2: `This will change your email to ${values.newEmail}. Check your email to verify your new address.`,
              onConfirm: () => this.handleSubmit(values, e, formApi),
            })
          }
        >
          {formApi => (
            <form onSubmit={formApi.submitForm}>
              <Field name="newEmail" label="New Email" type="text" errors={errors} />
              <div className="control form-submit">
                <button
                  type="submit"
                  className={classNames('button', {
                    'is-loading': fetching,
                    'is-success': formSuccess,
                  })}
                >
                  {formSuccess ? 'Success' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </Form>
      </>
    );
  }
}

ChangeEmailForm.propTypes = {
  changeEmail: PropTypes.func.isRequired,
  changeEmailError: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  currentEmail: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    fetching: state.auth.fetching,
    changeEmailError: state.auth.changeEmailError,
  }),
  {
    changeEmail: changeEmailAction,
    toggleModal: opts => toggleModalAction('CONFIRMATION', '', opts),
  },
)(ChangeEmailForm);
