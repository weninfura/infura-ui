import { createSelector } from 'reselect';
import { get } from 'lodash';

export const getPaymentProviders = createSelector(
  state => get(state, 'auth.user', {}),
  user => get(user, 'payment_providers', {}),
);

export const isStripe = createSelector(
  getPaymentProviders,
  providers =>
    'stripe' in providers && typeof providers.stripe === 'object' && Object.keys(providers.stripe).length > 0,
);
