import { tierOfferings, entitlementOfferings } from '../offerings';

export default type => [...tierOfferings, ...entitlementOfferings].find(t => t.type === type);
