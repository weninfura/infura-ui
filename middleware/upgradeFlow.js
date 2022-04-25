import { get, set, isEmpty } from 'lodash';
import { tierOfferings } from '../offerings';

/**
 * This is a bit of middleware to interupt the checkout process
 * in case the user has not yet setup a payment source.
 * Below is a diagram that illustrates the process injection.
 *
 *        Checkout Start
 *               +
 *               |
 *   Y           v                N
 * +---+Already Has Card saved?+-----+
 * |                                 |
 * |                                 |
 * |                                 v
 * |                           Validate Form
 * |                                 +
 * |                                 |
 * |                                 v
 * |                            Save Stripe
 * |                                 +
 * |                                 |
 * |                                 v
 * |                            Save User data
 * |                                 +
 * |                                 |
 * |                                 |
 * +----------->Subscribe<-----------+
 *                 +
 *                 |
 *                 v
 *               Done
 */
const upgradeFlow = store => next => action => {
  // Hook interested action types
  const currentState = store.getState();

  switch (action.type) {
    case 'CHECKOUT_START': {
      const userSource = get(currentState, 'auth.user.payment_providers', null);
      return next(
        set(
          action,
          'data.needsPaymentMethod',
          isEmpty(userSource) &&
            (currentState.checkout.tierType !== tierOfferings[0].type || currentState.checkout.addons.length > 0),
        ),
      );
    }
    default:
      return next(action);
  }
};

export default upgradeFlow;
