import fetch from 'isomorphic-fetch';
import { API_URL, ONBOARDING_STEPS } from '../constants';

const flagApi = `${API_URL}features`;

export function showFlashMessage(message, messageType, onModal) {
  return {
    type: 'SHOW_FLASH_MESSAGE',
    message,
    messageType,
    onModal,
  };
}

export function hideFlashMessage() {
  return {
    type: 'HIDE_FLASH_MESSAGE',
  };
}

export function triggerFlashMessage(message, messageType, onModal = false) {
  return dispatch => {
    dispatch(showFlashMessage(message, messageType, onModal));

    setTimeout(() => {
      dispatch(hideFlashMessage());
    }, 3000);
  };
}

export function toggleModal(modalType = '', modalid = '', data = {}) {
  return {
    type: 'TOGGLE_MODAL',
    modalType,
    modalid,
    data,
  };
}

export function setCurrentDocContent(content = '') {
  return {
    type: 'SET_CURRENT_DOC_CONTENT',
    content,
  };
}

export function setOnboardingStep(stepCount = 0) {
  const setOnboardingAction = {
    type: 'SET_ONBOARDING_STEP',
    stepCount,
    coords: null,
  };

  const step = ONBOARDING_STEPS[stepCount];

  if (step && 'id' in step) {
    const el = document.getElementById(step.id);

    if (el instanceof Node) {
      return {
        ...setOnboardingAction,
        coords: el.getBoundingClientRect(),
      };
    }
  }

  return setOnboardingAction;
}

export function getFlag(namespace) {
  return dispatch => {
    dispatch({
      type: 'FETCHING_FEATURE_FLAGS',
      namespace,
    });

    fetch(`${flagApi}/payments`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(result => result.json())
      .then(resp => {
        dispatch({
          type: 'FEATURE_FLAG_SUCCESS',
          namespace,
          resp,
        });
      })
      .catch(() => {
        dispatch({
          type: 'FEATURE_FLAG_ERROR',
          namespace,
        });
      });
  };
}
