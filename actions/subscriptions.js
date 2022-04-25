import { API_URL } from '../constants';
import apiRequest from '../utils/api';

/*
 * actions
 * INVOICE_FETCH_ATTEMPT
 * INVOICE_FETCH_SUCCESS
 * INVOICE_FETCH_FAIL
 * SUB_PREVIEW_FETCH_ATTEMPT
 * SUB_PREVIEW_SUCCESS
 * SUB_PREVIEW_FAIL
 * SUBCRIPTION_FETCH_ATTEMPT
 * SUBCRIPTION_SUCCESS
 * SUBCRIPTION_FAIL
 * PROMO_CODE_UPDATE
 */

export function getSubsHistory() {
  return async dispatch => {
    dispatch({ type: 'INVOICE_FETCH_ATTEMPT' });

    const response = apiRequest({
      url: 'payments/history',
      method: 'get',
    });

    if (response.success) {
      dispatch({
        type: 'INVOICE_FETCH_SUCCESS',
        data: response.data.map(i => {
          const [, file] = i.Key.split('/');
          const [ts] = file.split('-');

          return {
            id: ts,
            date: new Date(0).setUTCSeconds(ts / 1000),
            invoicePdf: `${API_URL}payments/invoice/${file}`,
          };
        }),
      });
    } else {
      dispatch({
        type: 'INVOICE_FETCH_FAIL',
        error: response.data || response.error,
      });
    }
  };
}

export function previewChange() {
  return async (dispatch, getState) => {
    const {
      checkout: { tierType, addons },
      subscription: { promoCode },
    } = getState();

    dispatch({ type: 'SUB_PREVIEW_FETCH_ATTEMPT' });

    const response = await apiRequest({
      url: 'payments/preview',
      method: 'post',
      data: {
        tierType,
        addons,
        promoCode,
      },
    });

    if (response.success) {
      dispatch({ type: 'SUB_PREVIEW_SUCCESS', response });
    } else {
      dispatch({ type: 'SUB_PREVIEW_FAIL', data: response.data });
    }
  };
}

export function getCoupon() {
  return async (dispatch, getState) => {
    const {
      subscription: { promoCode },
    } = getState();

    const response = await apiRequest({
      url: 'payments/coupon',
      method: 'get',
      params: { promoCode },
    });

    if (response.success) {
      dispatch({ type: 'COUPON_FETCH_SUCCESS', data: response.data });
    } else {
      dispatch({ type: 'COUPON_FETCH_FAIL' });
    }
  };
}

export function getSubscription() {
  return async dispatch => {
    dispatch({ type: 'SUBSCRIPTION_FETCH_ATTEMPT' });

    const response = await apiRequest({
      url: 'payments/subscription',
      method: 'get',
    });

    if (response.success) {
      dispatch({
        type: 'SUBSCRIPTION_FETCH_SUCCESS',
        data: response.data,
      });
    } else {
      dispatch({ type: 'SUBSCRIPTION_FETCH_FAIL' });
    }
  };
}

export function updatePromoCode(input) {
  return dispatch => {
    dispatch({ type: 'PROMO_CODE_UPDATE', data: input });
  };
}

export function clearCoupon() {
  return { type: 'PROMO_CODE_RESET' };
}
