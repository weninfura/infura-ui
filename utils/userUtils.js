import { get, set, toNumber, find } from 'lodash';
import { freeTrialDate } from '../offerings';
const ethPath = 'service_plan.infura_plus.products.eth';
const entitlementPath = `${ethPath}.entitlements`;

export const getCriticalRemaining = user => Number(get(user, `${entitlementPath}.support.monthly_usage.remaining`, 0));

// TODO: Refactor uses of this into the selector version
export const getUserSubscriptionTier = user => get(user, 'service_plan.infura_plus.products.eth.tier');

export const updateCriticalCount = (user, count) =>
  set(user, `${entitlementPath}.support.monthly_usage.remaining`, count);

export const getProjectEntitlements = user => toNumber(get(user, `${entitlementPath}.projects.attributes.cap`, 3));

export const canGetTrial = user =>
  user.created < freeTrialDate && !find(get(user, 'service_plan.infura_plus.billing'), { active: false });
