import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { removeWhitelistItem as removeWhitelistItemAction } from '../actions/project';

class SecurityWhitelistItem extends PureComponent {
  constructor() {
    super();

    this.state = {
      attemptingRemoval: false,
    };

    this.handleRemoveWhitelistItem = this.handleRemoveWhitelistItem.bind(this);
  }

  handleRemoveWhitelistItem(e) {
    e.preventDefault();

    const { item, projectid, type, removeWhitelistItem } = this.props;

    this.setState({ attemptingRemoval: true });

    removeWhitelistItem(projectid, item, type);
  }

  render() {
    const { item } = this.props;
    const { attemptingRemoval } = this.state;

    return (
      <li className="project-contract">
        <div className="contract-id">{item}</div>
        <button
          type="button"
          onClick={this.handleRemoveWhitelistItem}
          className={classNames('button is-text contract-remove', {
            'is-loading': attemptingRemoval,
          })}
        >
          Remove
        </button>
      </li>
    );
  }
}

SecurityWhitelistItem.propTypes = {
  item: PropTypes.string.isRequired,
  projectid: PropTypes.string.isRequired,
  removeWhitelistItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default connect(
  () => ({}),
  { removeWhitelistItem: removeWhitelistItemAction },
)(SecurityWhitelistItem);
