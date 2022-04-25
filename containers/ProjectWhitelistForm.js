import React, { PureComponent } from 'react';
import { Form } from 'react-form';
import { connect } from 'react-redux';
// import validate from 'validate.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Field from '../components/Field';
import { updateSecurity as updateSecurityAction } from '../actions/project';

class ProjectWhitelistForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      submitting: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, e, formApi) {
    const { securityType, updateSecurity, project } = this.props;

    if (this.state.submitting || values[securityType] === '') {
      return;
    }

    this.setState({ submitting: true });

    updateSecurity(project.id, values, () => {
      formApi.resetAll();
      this.setState({ submitting: false });
    });
  }

  render() {
    const { errors } = this.state;
    const { securityType, securityCopy } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="project-whitelist-add">
        {formApi => (
          <form onSubmit={formApi.submitForm}>
            <div className="field is-combo">
              <Field
                name={securityType}
                type="text"
                errors={errors}
                placeholder={`Whitelist ${securityCopy}...`}
                labelIsHidden
              />
              <button type="submit" className={classNames('button is-tertiary', {})}>
                Add
              </button>
            </div>
          </form>
        )}
      </Form>
    );
  }
}

ProjectWhitelistForm.propTypes = {
  updateSecurity: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  securityType: PropTypes.string.isRequired,
  securityCopy: PropTypes.string.isRequired,
};

export default connect(
  () => ({}),
  {
    updateSecurity: updateSecurityAction,
  },
)(ProjectWhitelistForm);
