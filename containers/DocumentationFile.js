import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';
import Markdown from 'react-remarkable';
import { connect } from 'react-redux';
import { setCurrentDocContent as setCurrentDocContentAction } from '../actions/ui';

class DocumentationFile extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOnEnter = this.handleOnEnter.bind(this);
  }

  handleOnEnter() {
    const { name, setCurrentDocContent } = this.props;

    setCurrentDocContent(name);
  }

  render() {
    const { name, content } = this.props;
    return (
      <article id={name} className="doc-single">
        <Waypoint onEnter={this.handleOnEnter} />

        <Markdown source={content} />
      </article>
    );
  }
}

DocumentationFile.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  setCurrentDocContent: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  { setCurrentDocContent: setCurrentDocContentAction },
)(DocumentationFile);
