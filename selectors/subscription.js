import { createSelector } from 'reselect';
import moment from 'moment';
import { get } from 'lodash';
import { getTotal } from './checkout';

export const getRenewalDate = createSelector(
  state => state.subscription.subscription,
  subscription => {
    if (subscription && subscription.status) {
      return subscription.status === 'canceled'
        ? `Your subscription cancels on ${moment(subscription.current_period_end, 'X').format('MMMM Do')}`
        : `Your subscription renews on ${moment(subscription.current_period_end, 'X').format('MMMM Do')}`;
    }
    return '';
  },
);

export const getCouponDiscount = createSelector(
  [getTotal, state => get(state, 'subscription.coupon')],
  (total, { percentOff, amountOff }) => {
    if (percentOff) {
      return Math.round(total * (percentOff / 100.0), 2);
    } else if (amountOff) {
      return Math.round(amountOff / 100.0, 2);
    }
    return 0;
  },
);

export const getAdjustedTotal = createSelector(
  [getTotal, getCouponDiscount],
  (total, discount) => total - discount,
);
export default getRenewalDate;
