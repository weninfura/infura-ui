import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { resendVerification as resendVerificationAction } from '../actions/auth';

const ResendVerificationButton = ({ resendVerification, resendVerifyFetching, resentVerify, resendVerifyError }) => (
  <React.Fragment>
    {resendVerifyError && <div className="has-text-danger">There was an error resending your verification email.</div>}
    <button
      className={classNames('button', {
        'is-loading': resendVerifyFetching,
      })}
      onClick={resendVerification}
      disabled={resentVerify || resendVerifyFetching}
    >
      {resentVerify ? 'Success! Check your Email' : 'Re-send Email'}
    </button>
  </React.Fragment>
);

ResendVerificationButton.propTypes = {
  resendVerifyFetching: PropTypes.bool.isRequired,
  resentVerify: PropTypes.bool.isRequired,
  resendVerifyError: PropTypes.bool.isRequired,
  resendVerification: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    resendVerifyFetching: state.auth.resendVerifyFetching,
    resentVerify: state.auth.resentVerify,
    resendVerifyError: state.auth.resendVerifyError,
  }),
  { resendVerification: resendVerificationAction },
)(ResendVerificationButton);
