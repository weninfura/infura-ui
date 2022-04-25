import { createSelector } from 'reselect';

const MFACodeSelector = createSelector(
  state => state.auth.mfaVerificationCode,
  code => {
    const sanitized = code.replace(/[^0-9]/gi, '');
    return `${sanitized.slice(0, 3)} ${sanitized.slice(3)}`.trim();
  },
);

export default MFACodeSelector;
