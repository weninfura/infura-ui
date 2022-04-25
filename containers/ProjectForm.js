import React, { PureComponent } from 'react';
import { Form } from 'react-form';
import classNames from 'classnames';
import { connect } from 'react-redux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import Field from '../components/Field';
import { createProject as createProjectAction, editProject as editProjectAction } from '../actions/project';
import { toggleModal as toggleModalAction } from '../actions/ui';
import { getUserSubscriptionTier } from '../utils/userUtils';
import getOffering from '../utils/getProductOfferings';
import { tierOfferings } from '../offerings';

const constraints = {
  name: { presence: true },
};

class ProjectForm extends PureComponent {
  constructor() {
    super();

    this.state = {
      errors: {},
      fetching: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  handleSubmit(values, e, formApi) {
    const { accountTier, createProject, editProject, toggleModal, projects, type, projectid, display } = this.props;
    const isCreate = type === 'CREATE';
    const isEdit = type === 'EDIT';

    if (!display) {
      return null;
    }

    const errors = validate(values, constraints);

    this.setState({ errors: {} });

    if (errors) {
      return this.setState({ errors });
    }

    // 10 max projects
    if (projects) {
      const projectKeys = Object.keys(projects);

      const { max_projects: maxProjects } = getOffering(accountTier);

      if (projectKeys.length >= maxProjects) {
        return this.setState({
          errors: { name: [`Cannot have more than ${maxProjects} projects.`] },
        });
      }

      const duplicateName = projectKeys.find(key => projects[key].name === values.name);

      if (duplicateName) {
        return this.setState({ errors: { name: ['Must have unique project name.'] } });
      }
    }

    const clearForm = () => {
      formApi.resetAll();
      toggleModal();
    };

    if (isCreate) {
      createProject(values, clearForm);
    } else if (isEdit) {
      editProject(projectid, values);
    }

    return this.setState({ fetching: true });
  }

  handleToggleModal() {
    this.props.toggleModal();
  }

  render() {
    const { project, type, display } = this.props;
    const { errors, fetching } = this.state;

    const defaultValues = project ? { name: project.name } : {};

    return (
      <Form onSubmit={this.handleSubmit} defaultValues={defaultValues}>
        {formApi => (
          <form onSubmit={formApi.submitForm} className={display ? '' : 'is-hidden'}>
            <Field name="name" type="text" errors={errors} />

            {type === 'EDIT' && (
              <div className="control form-submit">
                <button className="button">Save Changes</button>
              </div>
            )}

            {type === 'CREATE' && (
              <div className="modal-controls">
                <button
                  type="button"
                  className="button is-ghost-secondary has-margin-right-base"
                  onClick={this.handleToggleModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={classNames('button', {
                    'is-loading': fetching,
                  })}
                >
                  Create
                </button>
              </div>
            )}
          </form>
        )}
      </Form>
    );
  }
}

ProjectForm.defaultProps = {
  projectid: '',
  project: null,
  display: false,
};

ProjectForm.propTypes = {
  accountTier: PropTypes.string.isRequired,
  createProject: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  projects: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  type: PropTypes.string.isRequired,
  projectid: PropTypes.string,
  display: PropTypes.bool,
};

export default connect(
  (state, props) => ({
    projects: state.project.list,
    project: props.projectid ? state.project.list[props.projectid] : null,
    accountTier: getUserSubscriptionTier(state.auth.user) || tierOfferings[0].type,
  }),
  {
    editProject: editProjectAction,
    createProject: createProjectAction,
    toggleModal: toggleModalAction,
  },
)(ProjectForm);
