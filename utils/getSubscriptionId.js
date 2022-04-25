import { get, find } from 'lodash';

export default user => {
  const userSubscriptions = get(user, 'service_plan.infura_plus.billing');
  return get(find(userSubscriptions, { active: true }), 'stripe_subscription_id', null);
};
