export default errorCode => {
  let serverErrorCopy = '';
  switch (errorCode) {
    case 'not_found':
      serverErrorCopy = 'No Account was found with that email.';
      break;

    case 'invalid_email':
      serverErrorCopy = 'Failed to verify email, make sure your email is formatted correctly.';
      break;

    case 'auth_fail':
      serverErrorCopy = 'We failed to authenticate you with those credentials.';
      break;

    case 'invalid_password':
      serverErrorCopy = 'Your password was incorrect.';
      break;

    case 'email_in_use':
      serverErrorCopy = 'Email is already in use.';
      break;

    case 'invalid_data':
      serverErrorCopy = 'Invalid data.';
      break;

    case 'password_short':
      serverErrorCopy = 'Your password was too short';
      break;

    case 'password_match':
      serverErrorCopy = 'Your passwords did not match';
      break;

    case 'blank_fields':
      serverErrorCopy = 'Some of the values are missing or blank.';
      break;

    case 'expired_token':
      serverErrorCopy = 'Your access token has expired.';
      break;

    case 'expected_address':
      serverErrorCopy = 'Must be an address.';
      break;

    case 'expected_contract':
      serverErrorCopy = 'Must be a contract address.';
      break;

    case 'cannot_update_field':
      serverErrorCopy = 'You cannot update certain fields.';
      break;

    case 'unknown':
      serverErrorCopy = 'Sorry, something unexpected went wrong.';
      break;

    case 'mfa_token_not_valid':
      serverErrorCopy = 'Authenticator token is not valid';
      break;

    default:
      serverErrorCopy = '';
  }

  return serverErrorCopy;
};
