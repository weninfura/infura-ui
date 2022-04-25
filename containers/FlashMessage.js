import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FlashMessage = ({ message, type, showing, onModal }) => {
  const showingClass = showing ? 'is-visible' : 'is-invisible';
  let typeClass;

  switch (type) {
    case 'success':
      typeClass = 'is-success';
      break;
    case 'error':
      typeClass = 'is-error';
      break;
    default:
      typeClass = 'is-standard';
  }

  return (
    <div className={`flash-message ${typeClass} ${showingClass} ${onModal}`}>
      <span className={type === 'success' ? '' : 'is-hidden'}>
        <FontAwesomeIcon icon={['fal', 'check-circle']} size="2x" className="flash-icon" />
      </span>
      <span className={type === 'error' ? '' : 'is-hidden'}>
        <FontAwesomeIcon icon={['fal', 'exclamation-triangle']} size="2x" className="flash-icon" />
      </span>
      <span className={type === 'standard' ? '' : 'is-hidden'}>
        <FontAwesomeIcon icon={['fal', 'info-circle']} size="2x" className="flash-icon" />
      </span>
      <span>{message}</span>
    </div>
  );
};

FlashMessage.defaultProps = {
  message: '',
  type: 'standard',
};

FlashMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  showing: PropTypes.bool.isRequired,
  onModal: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    message: state.ui.flashMessage,
    type: state.ui.flashMessageType,
    showing: state.ui.flashMessageShowing,
    onModal: state.ui.flashMessageOnModal,
  }),
  {},
)(FlashMessage);
