import React from 'react';
import PropTypes from 'prop-types';
import errorCodeToCopy from '../utils/errorCodeToCopy';

const ServerError = ({ serverError }) => {
  const copy = errorCodeToCopy(serverError);
  return <span>{copy && <div className="has-text-danger">{copy}</div>}</span>;
};

ServerError.propTypes = {
  serverError: PropTypes.string.isRequired,
};

export default ServerError;
