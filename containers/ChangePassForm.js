import React, { PureComponent } from 'react';
import { Form } from 'react-form';
import classNames from 'classnames';
import { connect } from 'react-redux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import Field from '../components/Field';
import PasswordStrengthMeter from '../components/forms/PasswordStrengthMeter';
import { changePassword as changePasswordAction } from '../actions/auth';

const passwordConstraint = {
  presence: true,
  length: {
    minimum: 8,
    message: 'must be at least 8 characters',
  },
};

const constraints = {
  oldPassword: passwordConstraint,
  newPassword: passwordConstraint,
  confirmNewPassword: { ...passwordConstraint, equality: 'newPassword' },
};

class ChangePassForm extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.resetForm && !nextProps.fetching && !nextProps.authError) {
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
      passwordFocused: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, e, formApi) {
    const { changePassword } = this.props;
    const errors = validate(values, constraints);

    this.setState({ errors: {} });

    if (errors) {
      return this.setState({ errors });
    }

    changePassword(values);

    return this.setState({ resetForm: formApi.resetAll });
  }

  render() {
    const { errors, formSuccess } = this.state;
    const { fetching } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {formApi => (
          <form onSubmit={formApi.submitForm} className="change-pw">
            <Field name="oldPassword" label="Old Password" type="password" errors={errors} />
            <Field
              name="newPassword"
              label="New Password"
              type="password"
              className="has-margin-top-base"
              handleFocus={() => this.setState({ passwordFocused: true })}
              handleBlur={() => this.setState({ passwordFocused: false })}
              errors={errors}
            />
            <PasswordStrengthMeter
              passwordValue={formApi.values.newPassword || ''}
              focused={this.state.passwordFocused}
            />
            <Field name="confirmNewPassword" label="Confirm New Password" type="password" errors={errors} />
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
    );
  }
}

ChangePassForm.propTypes = {
  changePassword: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    fetching: state.auth.fetching,
    authError: state.auth.authError,
  }),
  {
    changePassword: changePasswordAction,
  },
)(ChangePassForm);
