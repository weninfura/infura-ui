import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { editProject as editProjectAction } from '../actions/project';

class ProjectSecurityForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.project.private_only,
      submitting: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    if (this.state.submitting) {
      return;
    }
    const { editProject, project } = this.props;

    this.setState({ value: event.target.checked });

    editProject(project.id, { private_only: event.target.checked });
  }

  render() {
    return (
      <div className="project-security-field">
        <span className="text-label is-black">
          Private Secret Required
          <div className="info-tooltip is-hidden-mobile">
            <FontAwesomeIcon icon={['fal', 'info-circle']} />
            <div className="tooltip is-right">
              Restrict API usage to requests that include both the Project ID AND Project Secret.
            </div>
          </div>
        </span>
        <div className="control has-no-bottom-margin">
          <input
            type="checkbox"
            field="private_only"
            id="private_only"
            className="checkbox-input"
            onChange={this.handleSubmit}
            checked={this.state.value}
          />
          <label htmlFor="private_only" className="">
            Require project secret for all requests
          </label>
        </div>
      </div>
    );
  }
}

ProjectSecurityForm.propTypes = {
  editProject: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    private_only: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(
  () => ({}),
  {
    editProject: editProjectAction,
  },
)(ProjectSecurityForm);
