import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteProject as deleteProjectAction } from '../actions/project';
import { toggleModal as toggleModalAction, triggerFlashMessage as triggerFlashMessageAction } from '../actions/ui';

class DeleteProjectForm extends PureComponent {
  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    const { toggleModal, deleteProject, projectid } = this.props;

    deleteProject(projectid);
    toggleModal();
  }

  handleCancel(e) {
    e.preventDefault();
    const { toggleModal, triggerFlashMessage, project } = this.props;

    triggerFlashMessage(`Canceled Deleting "${project.name}".`, 'standard');
    toggleModal();
  }

  render() {
    return (
      <div>
        <h3 className="empty-ui-title has-color-red">Are you sure you want to delete your project?</h3>
        <p>Deleting will remove access to Infura for this project immediately. This cannot be undone.</p>
        <div className="modal-controls">
          <button onClick={this.handleCancel} className="button is-ghost-secondary has-margin-right-base">
            Cancel
          </button>
          <button onClick={this.handleDelete} className="button">
            Delete
          </button>
        </div>
      </div>
    );
  }
}

DeleteProjectForm.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  triggerFlashMessage: PropTypes.func.isRequired,
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  projectid: PropTypes.string.isRequired,
};

export default connect(
  (state, props) => ({
    project: state.project.list[props.projectid],
  }),
  {
    deleteProject: deleteProjectAction,
    toggleModal: toggleModalAction,
    triggerFlashMessage: triggerFlashMessageAction,
  },
)(DeleteProjectForm);
