import { createSelector } from 'reselect';
import { get, keys, isEmpty, isArray } from 'lodash';
import getOffering from '../utils/getProductOfferings';
import { tierOfferings } from '../offerings';

/**
 * This makes an assumption that the projects field will always be an empty
 * array. This is the case when coming from the backend, but isn't very defensive
 * with bad input.
 */
export const userProjectCountSelector = createSelector(
  state => state.auth.user,
  user => keys(get(user, 'projects', {})).length,
);

export const getEthProducts = createSelector(
  state => state.auth.user,
  user => get(user, 'service_plan.infura_plus.products.eth', {}),
);

/**
 * Get just the tier from the user object.
 * The get + || handles the null case
 */
export const userSubTierSelector = createSelector(
  getEthProducts,
  products => get(products, 'tier', 'ethereum_base') || 'ethereum_base',
);

export const getUserAddonTypes = createSelector(
  getEthProducts,
  products => get(products, 'addons', []) || [],
);

export const getUserTier = createSelector(
  userSubTierSelector,
  tierType => getOffering(tierType),
);

/**
 * Returns true if the user has ever had information saved in billing field
 * of the user object.
 * TODO: Should this do deeper checking? See tests for the type of things this
 * will accept.
 */
export const userHasEverSubscribed = createSelector(
  state => state.auth.user,
  user => !isEmpty(get(user, 'service_plan.infura_plus.billing')),
);

export const userIsSubscribed = createSelector(
  [userSubTierSelector, state => get(state.auth.user, 'service_plan.infura_plus.products.eth.addons', []) || []],
  (tierType, addons) => tierType !== tierOfferings[0].type || addons.length > 0,
);

export const getUserAddons = createSelector(
  state => get(state.auth.user, 'service_plan.infura_plus.products.eth.addons', []),
  addons => (isArray(addons) ? addons.map(it => getOffering(it)) : []),
);
