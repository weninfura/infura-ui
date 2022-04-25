import Cookies from 'js-cookie';
import { has } from 'lodash';
import { addProjectList } from './project';
import { toggleModal } from './ui';
import apiRequest from '../utils/api';

const AUTH_URL = 'user/';

export function clearAuthErrors() {
  return {
    type: 'CLEAR_AUTH_ERRORS',
  };
}

export function authSuccess(user) {
  return (dispatch, getState) => {
    const {
      auth: { loginRedirectTo },
    } = getState();

    Cookies.set('USER_ID', user.id);

    // oAuth login flow
    // Check the user in the response and redirect to consent page
    if (user.verified && has(user, 'login_redirect_to') && !has(user, 'mfa')) {
      window.location = user.login_redirect_to;
      return;
    }

    // oAuth user signup flow
    // Check if the user email has been verified then redirect to consent page
    if (user.verified && loginRedirectTo) {
      window.location = loginRedirectTo;
      return;
    }

    // Normal login flow
    dispatch(addProjectList(user.projects));
    dispatch({
      type: 'AUTH_SUCCESS',
      user,
    });
  };
}

export function authFail(error) {
  return {
    type: 'AUTH_FAIL',
    error,
  };
}

function auth(user, endpoint) {
  return async dispatch => {
    dispatch({ type: 'AUTH_ATTEMPT' });

    const response = await apiRequest({
      url: `${AUTH_URL}${endpoint}`,
      method: 'post',
      data: user,
    });

    if (response.success) {
      if (has(response.data, 'user')) {
        dispatch(authSuccess(response.data.user));
      }
      dispatch(authFail('unknown'));
    }

    dispatch(authFail(response.error));
  };
}

export function register(user) {
  return auth(user, 'register');
}

export function login(user) {
  return auth(user, 'login');
}

export function logout() {
  return async dispatch => {
    dispatch({ type: 'LOGOUT_ATTEMPT' });

    const response = await apiRequest({
      url: `${AUTH_URL}logout`,
      method: 'get',
    });

    if (response.success) {
      Cookies.remove('USER_ID');
      dispatch({ type: 'LOGOUT_SUCCESS' });
    } else {
      dispatch({ type: 'LOGOUT_FAIL' });
    }
  };
}

export function getCurrentUser() {
  return async dispatch => {
    const response = await apiRequest({
      url: AUTH_URL,
      method: 'get',
    });

    Cookies.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFmZTJhYTVkODFmMzRmNTI5ZDViM2UwZTk3NDk0ZTFkIiwibm9uY2UiOiIxN2I2YmVhZS1kZGM0LTRiZWEtOTQ0NS1iMTBjMmRiOTNlOWEiLCJtZmEiOjAsImlhdCI6MTU3MTQ1MTQyNX0.q99n-lPN-yq36m7HzAvfqfDAuLpeMKO_Xq1SbOS8bik');


    if (response.success && has(response.data, 'user')) {
      dispatch(authSuccess(response.data.user));
    } else {
      dispatch(logout());
    }
  };
}

export function setUserID(userid) {
  return {
    type: 'SET_USER_ID',
    userid,
  };
}

export function verifyToken(token) {
  return async dispatch => {
    dispatch({ type: 'VERIFY_TOKEN_ATTEMPT' });

    const response = await apiRequest({
      url: `${AUTH_URL}verify`,
      method: 'post',
      data: { token },
    });

    if (response.success && has(response.data, 'user')) {
      dispatch({ type: 'VERIFY_TOKEN_SUCCESS', user: response.data.user });
      dispatch(authSuccess(response.data.user));
    } else {
      dispatch({ type: 'VERIFY_TOKEN_FAIL' });
    }
  };
}

export function changePasswordFail(error) {
  return {
    type: 'CHANGE_PASSWORD_FAIL',
    error,
  };
}

export function changePassword(values) {
  return async dispatch => {
    dispatch({ type: 'CHANGE_PASSWORD_ATTEMPT' });

    const isReset = 'reset' in values;

    const response = await apiRequest({
      url: `${AUTH_URL}${isReset ? 'resetpassword' : 'changepassword'}`,
      method: 'put',
      data: values,
    });

    if (response.success) {
      dispatch({ type: 'CHANGE_PASSWORD_SUCCESS', data: response.data.user });
    } else {
      dispatch(changePasswordFail(response.error));
    }
  };
}

export function changeEmail({ newEmail }) {
  return async dispatch => {
    dispatch({ type: 'CHANGE_EMAIL_ATTEMPT' });
    const response = await apiRequest({
      url: `${AUTH_URL}change-email`,
      method: 'put',
      data: { email: newEmail },
    });
    if (response.success) {
      dispatch({ type: 'CHANGE_EMAIL_SUCCESS' });
      dispatch(getCurrentUser());
    } else {
      dispatch({ type: 'CHANGE_EMAIL_FAIL', data: response });
    }
  };
}

export function resendVerification() {
  return async dispatch => {
    dispatch({ type: 'RESEND_VERIFICATION_ATTEMPT' });

    const response = await apiRequest({
      url: `${AUTH_URL}resendverification`,
      method: 'post',
    });

    if (response.success) {
      dispatch({ type: 'RESEND_VERIFICATION_SUCCESS' });
    } else {
      dispatch({ type: 'RESEND_VERIFICATION_FAIL' });
    }
  };
}

export function updateUser(user) {
  // TODO check if user has projects attached
  return {
    type: 'UPDATE_USER',
    user,
  };
}

export function setOnboardingFlag(userid) {
  return async dispatch => {
    dispatch({ type: 'ONBOARDING_FLAG_ATTEMPT' });

    const response = await apiRequest({
      url: `${AUTH_URL}${userid}`,
      method: 'put',
      data: { onboarded: true },
    });

    if (response.success && has(response.data, 'user')) {
      dispatch(updateUser(response.data.user));
    } else {
      dispatch({ type: 'ONBOARDING_FLAG_FAIL' });
    }
  };
}

export function deleteAccount() {
  return async (dispatch, getState) => {
    dispatch({ type: 'DELETE_ACCOUNT_ATTEMPT' });

    const response = await apiRequest({
      url: `${AUTH_URL}${getState().auth.userid}`,
      method: 'delete',
    });

    if (response.success) {
      dispatch(toggleModal());
      dispatch({ type: 'DELETE_ACCOUNT_SUCCESS' });
      dispatch(logout());
    } else {
      dispatch({ type: 'DELETE_ACCOUNT_FAILURE' });
    }
  };
}

export function toggleMFA() {
  return async (dispatch, getState) => {
    const {
      auth: { mfaEnabled },
    } = getState();

    if (mfaEnabled) {
      dispatch({ type: 'DISABLE_MFA' });
    } else {
      dispatch({ type: 'ENABLE_MFA' });
      dispatch({ type: 'MFA_LINK_ATTEMPT' });

      const response = await apiRequest({
        url: `${AUTH_URL}mfa/link`,
        method: 'get',
      });

      if (response.success) {
        dispatch({
          type: 'MFA_LINK_SUCCESS',
          data: response.data,
        });
      } else {
        dispatch({ type: 'MFA_LINK_ERROR', data: response.error });
      }
    }
  };
}

export function updateVerificationCode(token) {
  return {
    type: 'MFA_VERIFY_UPDATE',
    data: { token },
  };
}

export function mfaSuccess(data) {
  return (dispatch, getState) => {
    const {
      auth: { loginRedirectTo },
    } = getState();

    // If we have a login redirect url in the store
    // This is an oAuth request and we need to redirect
    if (loginRedirectTo) {
      window.location = loginRedirectTo;
    } else {
      dispatch({
        type: 'MFA_VERIFY_SUCCESS',
        data,
      });
    }
  };
}

export function enableMFA() {
  return async (dispatch, getState) => {
    const {
      auth: { mfaVerificationCode, mfaCode },
    } = getState();
    const body = { mfaVerificationCode, formattedKey: mfaCode };

    const response = await apiRequest({
      url: `${AUTH_URL}mfa/enable`,
      method: 'post',
      data: body,
    });

    if (response.success) {
      dispatch(mfaSuccess(response.data));
    } else {
      dispatch(authFail(response.error));
    }
  };
}

export function verifyMFA() {
  return async (dispatch, getState) => {
    const {
      auth: { mfaVerificationCode },
    } = getState();

    const response = await apiRequest({
      url: `${AUTH_URL}mfa/verify`,
      method: 'post',
      data: { mfaVerificationCode },
    });

    if (response.success) {
      dispatch(mfaSuccess(response.data));
    } else {
      dispatch(authFail(response.error));
    }
  };
}

export function verifyLoginChallenge(challenge) {
  return async dispatch => {
    dispatch({ type: 'VERIFY_LOGIN_CHALLENGE' });

    const response = await apiRequest({
      url: `${AUTH_URL}oauth/login/verify`,
      method: 'post',
      data: { challenge },
    });

    if (response.success) {
      dispatch({ type: 'VERIFY_LOGIN_CHALLENGE_SUCCESS', data: { ...response.data } });
    }
  };
}

export function verifyConsentChallenge(challenge) {
  return async dispatch => {
    dispatch({ type: 'VERIFY_CONSENT_CHALLENGE' });

    const response = await apiRequest({
      url: `${AUTH_URL}oauth/consent/verify`,
      method: 'post',
      data: { challenge },
    });

    if (response.success) {
      dispatch({ type: 'VERIFY_CONSENT_CHALLENGE_SUCCESS', data: { ...response.data } });
    }
  };
}

export function noChallengePresent() {
  return async dispatch => {
    dispatch({ type: 'NO_CHALLENGE_PRESENT' });
  };
}

export function acceptConsentChallenge(challenge, scopes) {
  return async dispatch => {
    dispatch({ type: 'ACCEPT_CONSENT_CHALLENGE' });

    const response = await apiRequest({
      url: `${AUTH_URL}oauth/consent/accept`,
      method: 'post',
      data: {
        challenge,
        grant_scope: scopes,
      },
    });

    if (response.success) {
      dispatch({ type: 'ACCEPT_CONSENT_CHALLENGE_SUCCESS', data: { ...response.data } });

      window.location = response.data.challenge_redirect_to;
    }
  };
}

export function rejectConsentChallenge(challenge) {
  return async dispatch => {
    dispatch({ type: 'REJECT_CONSENT_CHALLENGE' });

    const response = await apiRequest({
      url: `${AUTH_URL}oauth/consent/reject`,
      method: 'post',
      data: {
        challenge,
      },
    });

    if (response.success) {
      dispatch({ type: 'REJECT_CONSENT_CHALLENGE_SUCCESS', data: { ...response.data } });

      window.location = response.data.challenge_redirect_to;
    }
  };
}
