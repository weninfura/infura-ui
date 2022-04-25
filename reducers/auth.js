const initState = {
  changeEmailError: '',
  userid: null,
  user: null,
  fetching: false,
  verifyFetching: false,
  verified: false,
  resendVerifyFetching: false,
  resentVerify: false,
  resendVerifyError: false,
  resetPass: false,
  authError: '',
  mfaLink: null,
  mfaCode: '',
  mfaEnabled: false,
  mfaVerificationCode: '',
  mfaVerified: '',
  challengeValidated: false,
  hasLoginChallengeParam: false,
  loginChallenge: null,
  loginRedirectTo: '',
  consentData: null,
  challengeRedirectTo: '',
  noChallengePresent: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'CLEAR_AUTH_ERRORS':
      return {
        ...state,
        authError: '',
      };

    case 'AUTH_ATTEMPT':
      return {
        ...state,
        fetching: true,
        authError: '',
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.user,
        userid: action.user.id,
        fetching: false,
        authError: '',
        loginRedirectTo: state.loginRedirectTo ? state.loginRedirectTo : action.user.login_redirect_to,
      };

    case 'SET_USER_ID':
      return {
        ...state,
        userid: action.userid,
      };

    case 'AUTH_FAIL':
      return {
        ...state,
        fetching: false,
        authError: action.error,
      };

    case 'LOGOUT_ATTEMPT':
      return { ...initState };

    case 'VERIFY_TOKEN_ATTEMPT':
      return { ...state, verifyFetching: true };

    case 'VERIFY_TOKEN_SUCCESS':
      return {
        ...state,
        verifyFetching: false,
        verified: true,
        user: action.user,
        mfaVerified: initState.mfaVerified,
      };

    case 'VERIFY_TOKEN_FAIL':
      return { ...state, verifyFetching: false };

    case 'CHANGE_PASSWORD_ATTEMPT':
      return {
        ...state,
        fetching: true,
        authError: '',
      };

    case 'CHANGE_PASSWORD_FAIL':
      return {
        ...state,
        fetching: false,
        authError: action.error,
      };

    case 'CHANGE_PASSWORD_SUCCESS':
      return {
        ...state,
        user: action.data,
        fetching: false,
        resetPass: true,
        authError: '',
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'RESEND_VERIFICATION_ATTEMPT':
      return {
        ...state,
        resendVerifyFetching: true,
        resentVerify: false,
        resendVerifyError: false,
      };

    case 'RESEND_VERIFICATION_SUCCESS':
      return {
        ...state,
        resendVerifyFetching: false,
        resentVerify: true,
        resendVerifyError: false,
      };

    case 'RESEND_VERIFICATION_FAIL':
      return {
        ...state,
        resendVerifyFetching: false,
        resentVerify: false,
        resendVerifyError: true,
      };

    case 'RESET_RESEND_VALUES':
      return {
        resendVerifyFetching: false,
        resentVerify: false,
        resendVerifyError: false,
      };

    case 'CHANGE_EMAIL_ATTEMPT':
      return {
        ...state,
        fetching: true,
      };

    case 'CHANGE_EMAIL_FAIL':
      return {
        ...state,
        fetching: false,
        changeEmailError: action.data.error,
      };

    case 'ENABLE_MFA':
      return {
        ...state,
        mfaEnabled: true,
      };

    case 'DISABLE_MFA':
      return {
        ...state,
        mfaEnabled: false,
        mfaLink: initState.mfaLink,
      };

    case 'MFA_LINK_SUCCESS':
      return {
        ...state,
        mfaLink: action.data.link,
        mfaCode: action.data.code,
      };

    case 'MFA_VERIFY_UPDATE':
      return {
        ...state,
        mfaVerificationCode: action.data.token,
      };

    case 'MFA_VERIFY_SUCCESS':
      return {
        ...state,
        mfaVerified: action.data.user.mfa.enabled,
        mfaLink: initState.mfaLink,
        mfaCode: initState.mfaCode,
        user: action.data.user,
        userid: action.data.user.id,
        fetching: false,
        authError: '',
      };

    case 'VERIFY_LOGIN_CHALLENGE':
      return {
        ...state,
        hasLoginChallengeParam: true,
      };

    case 'VERIFY_LOGIN_CHALLENGE_SUCCESS':
      return {
        ...state,
        challengeValidated: true,
        loginChallenge: action.data.challenge,
      };

    case 'VERIFY_CONSENT_CHALLENGE_SUCCESS':
      return {
        ...state,
        challengeValidated: true,
        consentData: action.data,
      };

    case 'NO_CHALLENGE_PRESENT':
      return {
        ...state,
        noChallengePresent: true,
      };

    case 'ACCEPT_CONSENT_CHALLENGE_SUCCESS':
      return {
        ...state,
        challengeRedirectTo: action.data.challenge_redirect_to,
      };

    case 'REJECT_CONSENT_CHALLENGE_SUCCESS':
      return {
        ...state,
        challengeRedirectTo: action.data.challenge_redirect_to,
      };

    default:
      return state;
  }
};
