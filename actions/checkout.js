import getOffering from '../utils/getProductOfferings';
import { tierOfferings } from '../offerings';
import apiRequest from '../utils/api';
/**
 * Actions
 * CHECKOUT_START
 * CREATE_STRIPE_SOURCE_ATTEMPT
 * CREATE_STRIPE_SOURCE_SUCCESSFUL
 * CREATE_STRIPE_SOURCE_ERROR
 * CREATE_SUBSCRIPTION_ATTEMPT
 * CREATE_SUBSCRIPTION_SUCCESSFUL
 * CHECKOUT_RESET
 * PREVIEW_COUPON_ATTEMPT
 * PREVIEW_COUPON_SUCCESS
 * PREVIEW_COUPON_ERROR
 */

export function setTier(tierType) {
  return {
    type: 'CHECKOUT_SET_TIER',
    data: tierType,
  };
}

export function setAddon(addon) {
  return {
    type: 'CHECKOUT_SET_ADDON',
    data: addon,
  };
}

export function toggleAddon(addon) {
  return {
    type: 'CHECKOUT_TOGGLE_ADDON',
    data: addon,
  };
}

export function checkoutHandler() {
  return {
    type: 'CHECKOUT_START',
  };
}

export function checkoutReset() {
  return {
    type: 'CHECKOUT_RESET',
  };
}

export function saveSubscription(subscriptionId, tierType, entitlements, addons, promoCode, freeTrial) {
  return async dispatch => {
    dispatch({ type: 'CREATE_SUBSCRIPTION_ATTEMPT' });
    // Tiers are entitlements !
    const mergedTierAndEntitlements = [...addons, tierType];

    const stripeSubscriptionItems = mergedTierAndEntitlements.reduce((acc, cur) => {
      const offering = getOffering(cur);
      if (offering === undefined) {
        // don't include free tier in entitlements or entitlements included with the plan
        return acc;
      }

      // get offering, remove data we don't need on backend
      const { name, blurb, link, price, requests, ...rest } = getOffering(cur);

      return { ...acc, [cur]: rest };
    }, {});

    // To be paying, one must buy addOn entitlements OR select a paying tier
    const isPayingPlan = addons.length > 0 || tierType !== tierOfferings[0].type;

    let subRequest = null;

    if (!subscriptionId) {
      // CREATE subscription
      subRequest = {
        url: 'payments/subscription',
        method: 'post',
        data: {
          stripeSubscriptionItems,
          entitlements,
          addons,
          promoCode,
          freeTrial,
        },
      };
    }

    if (isPayingPlan && subscriptionId) {
      // UPDATE subscription
      subRequest = {
        url: 'payments/subscription',
        method: 'put',
        data: {
          stripeSubscriptionItems,
          entitlements,
          addons,
          promoCode,
          subscriptionId,
        },
      };
    }

    if (!isPayingPlan && subscriptionId) {
      // DELETE subscription
      subRequest = {
        url: 'payments/subscription',
        method: 'delete',
        data: { subscriptionId },
      };
    }

    if (subRequest) {
      // make subscription request
      const response = await apiRequest(subRequest);

      dispatch({
        type: response.success ? 'CREATE_SUBSCRIPTION_SUCCESSFUL' : 'CREATE_SUBSCRIPTION_FAILED',
        data: response.data,
      });
    }
  };
}

export function saveCard(stripe, custData) {
  return async dispatch => {
    dispatch({
      type: 'CREATE_STRIPE_SOURCE_ATTEMPT',
      stripe,
    });
    const source = await stripe.createToken({
      name: custData.name,
      address_line1: custData.address1,
      address_city: custData.city,
      address_state: custData.state,
      address_zip: custData.zip,
      address_country: custData.country,
    });

    if ('error' in source) {
      dispatch({
        type: 'CREATE_STRIPE_SOURCE_ERROR',
        data: source.error,
      });
    } else {
      // add source to user
      const response = await apiRequest({
        url: 'payments/card',
        method: 'post',
        data: {
          ...source,
          ...custData,
        },
      });

      if (response.success) {
        dispatch({
          type: 'CREATE_STRIPE_SOURCE_SUCCESSFUL',
          data: response.data,
        });
      } else {
        dispatch({
          type: 'CREATE_STRIPE_SOURCE_ERROR',
          data: response.data || response.error,
        });
      }
    }
  };
}
