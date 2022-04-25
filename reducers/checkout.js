import update from 'immutability-helper';

const initialState = {
  submitting: false,
  validCard: false,
  tierType: 'ethereum_base',
  addons: [],
  cardErrors: {},
  source: null,
  entitlements: [],
  needsPaymentMethod: false,
  readyToSubscribe: false,
  subscribeSuccess: false,
};

/**
 * Actions
 * CHECKOUT_START
 * CREATE_STRIPE_SOURCE_ATTEMPT
 * CREATE_STRIPE_SOURCE_SUCCESSFUL
 * CREATE_STRIPE_SOURCE_ERROR
 * CREATE_SUBSCRIPTION_ATTEMPT
 * CREATE_SUBSCRIPTION_SUCCESSFUL
 * CHECKOUT_SUCCESSFUL
 */

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHECKOUT_SET_TIER':
      return update(state, { tierType: { $set: action.data } });

    case 'CHECKOUT_SET_ADDON': {
      const idx = state.addons.findIndex(e => e === action.data);
      if (idx < 0) {
        return update(state, {
          addons: { $push: [action.data] },
        });
      }
      return state;
    }

    case 'CHECKOUT_TOGGLE_ADDON': {
      const idx = state.addons.findIndex(e => e === action.data);
      return update(state, {
        addons: idx >= 0 ? { $splice: [[idx, 1]] } : { $push: [action.data] },
      });
    }

    case 'CHECKOUT_START':
      return update(state, {
        submitting: { $set: true },
        needsPaymentMethod: { $set: action.data.needsPaymentMethod },
        readyToSubscribe: { $set: !action.data.needsPaymentMethod },
        subscribeSuccess: { $set: false },
      });

    case 'CREATE_STRIPE_SOURCE_SUCCESSFUL':
      return update(state, {
        source: { $set: action.data },
        validCard: { $set: true },
        needsPaymentMethod: { $set: false },
        readyToSubscribe: { $set: true },
      });

    case 'CREATE_STRIPE_SOURCE_ERROR':
      return update(state, {
        submitting: { $set: false },
        cardErrors: { $set: action.data },
      });

    case 'CREATE_SUBSCRIPTION_SUCCESSFUL':
      return update(state, {
        readyToSubscribe: { $set: false },
        submitting: { $set: false },
        subscribeSuccess: { $set: true },
      });

    case 'CREATE_SUBSCRIPTION_FAILED':
      return update(state, {
        readyToSubscribe: { $set: true },
        submitting: { $set: false },
        subscribeSuccess: { $set: false },
      });

    case 'CHECKOUT_RESET':
      return update(state, {
        readyToSubscribe: { $set: false },
        subscribeSuccess: { $set: false },
        submitting: { $set: false },
      });

    case 'LOGOUT_ATTEMPT':
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
