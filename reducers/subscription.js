import update from 'immutability-helper';

const initialState = {
  invoices: [],
  subscription: {},
  promoCode: '',
  coupon: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INVOICE_FETCH_SUCCESS':
      return update(state, { invoices: { $set: action.data } });
    case 'SUBSCRIPTION_FETCH_SUCCESS':
      return update(state, { subscription: { $set: action.data } });
    case 'PROMO_CODE_UPDATE':
      return update(state, { promoCode: { $set: action.data } });
    case 'COUPON_FETCH_SUCCESS':
      return update(state, {
        coupon: {
          percentOff: { $set: action.data.percent_off },
          amountOff: { $set: action.data.amount_off },
        },
      });
    case 'PROMO_CODE_RESET':
      return update(state, { coupon: { $set: initialState.coupon } });
    default:
      return state;
  }
};
