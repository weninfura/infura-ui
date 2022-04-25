import { createSelector } from 'reselect';
import { get } from 'lodash';
import getOffering from '../utils/getProductOfferings';
import { tierOfferings } from '../offerings';

export const getTier = createSelector(
  state => state.checkout.tierType,
  tierType => getOffering(tierType),
);

export const getTotal = createSelector(
  state => ({
    tierType: state.checkout.tierType,
    addons: state.checkout.addons,
  }),
  ({ tierType, addons }) =>
    get(getOffering(tierType), 'price', 0) +
    addons.reduce((acc, it) => {
      const addon = getOffering(it);
      return get(addon, 'price', 0) + acc;
    }, 0),
);

export const getPriceOverage = createSelector(
  state => state.checkout.tierType,
  tierType => {
    const tier = getOffering(tierType);
    return get(tier, 'entitlements.req.attributes.overage_mil', -1);
  },
);

export const isPayingSubscription = createSelector(
  state => ({
    tierType: state.checkout.tierType,
    addons: state.checkout.addons,
  }),
  ({ tierType, addons }) => tierType !== tierOfferings[0].type || addons.length > 0,
);
