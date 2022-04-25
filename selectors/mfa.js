import { createSelector } from 'reselect';
import moment from 'moment';
import { get, isEmpty } from 'lodash';

/**
 * Null checks on the mfa block is used in dependent selector functions.
 * Use of this selector should take care to check null output.
 */
export const userMFABlock = createSelector(
  state => state.auth.user,
  user => get(user, 'mfa'),
);

export const userHasMFA = createSelector(
  userMFABlock,
  mfa => mfa !== null && mfa !== undefined && !isEmpty(mfa),
);

/**
 * There is an intermediate state where we are looking at the user profile just after enabling MFA
 * and the user object is out of date (has not yet been reloaded). In those cases we fall back
 * to the reducer state to display the date of activation. Once a user has logged in with MFA,
 * the server will set the `verified` field on the mfa block to indicate the user has successfully
 * verified his mfa code.
 */
export const userMFAActivated = createSelector(
  [userMFABlock, state => state.auth.mfaVerified],
  (mfa, verified) => {
    const enableDate = get(mfa, 'enabled') || verified;
    return enableDate ? moment(enableDate, 'X').format('MMM Do YYYY') : null;
  },
);

/**
 * Helper for the ui to figure out if it needs to show the MFA verification form during login
 */
export const userNeedsMFA = createSelector(
  [userMFABlock, userHasMFA],
  (MFABlock, hasMFA) => hasMFA && get(MFABlock, 'verified', 0) === 0,
);
