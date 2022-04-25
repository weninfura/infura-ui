const initState = {
  flashMessage: '',
  flashMessageType: 'standard',
  flashMessageShowing: false,
  flashMessageOnModal: false,
  showModal: '',
  modalid: '',
  data: {},
  feature: {},
  currentDocContent: '',
  currentOnboardingStep: -1,
  currentOnboardingCoordinates: {
    top: -1000,
    right: -1000,
    left: -1000,
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'SHOW_FLASH_MESSAGE':
      return {
        ...state,
        flashMessage: action.message,
        flashMessageType: action.messageType,
        flashMessageShowing: true,
        flashMessageOnModal: action.onModal,
      };

    case 'HIDE_FLASH_MESSAGE':
      return {
        ...state,
        flashMessageShowing: false,
      };

    case 'TOGGLE_MODAL':
      return {
        ...state,
        showModal: action.modalType,
        modalid: action.modalid,
        data: action.data,
      };

    case 'SET_CURRENT_DOC_CONTENT':
      return {
        ...state,
        currentDocContent: action.content,
      };

    case 'SET_ONBOARDING_STEP':
      return {
        ...state,
        currentOnboardingStep: action.stepCount,
        currentOnboardingCoordinates: action.coords ? action.coords : initState.currentOnboardingCoordinates,
      };

    case 'FEATURE_FLAG_SUCCESS':
      return {
        ...state,
        feature: {
          [action.namespace]: action.resp.result,
        },
      };

    default:
      return state;
  }
};
