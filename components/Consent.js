import React, { useCallback, useEffect, memo } from 'react';
import classNames from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import LogoSvg from '../svgs/LogoSvg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import {
  verifyConsentChallenge,
  acceptConsentChallenge,
  noChallengePresent,
  rejectConsentChallenge,
} from '../actions/auth';
import { SCOPE_MAP } from '../constants';
import LoaderSvg from '../svgs/LoaderSvg';

const Consent = () => {
  const dispatch = useDispatch();
  const noChallenge = useSelector(state => state.auth.noChallengePresent);
  const isValidated = useSelector(state => state.auth.challengeValidated);
  const consentData = useSelector(state => state.auth.consentData);

  const handleAuthorize = useCallback(() => {
    dispatch(acceptConsentChallenge(consentData.challenge, consentData.requested_scope));
  }, [dispatch, consentData]);

  const handleNoAuthorize = useCallback(() => {
    dispatch(rejectConsentChallenge(consentData.challenge));
  }, [dispatch, consentData]);

  useEffect(() => {
    const parsedParams = queryString.parse(window.location.search);
    const challenge = parsedParams.consent_challenge;

    if (challenge) {
      dispatch(verifyConsentChallenge(challenge));
    } else {
      dispatch(noChallengePresent());
    }
  }, [dispatch]);

  if (noChallenge) {
    return <Redirect to="/" />;
  }

  if (!isValidated) {
    return (
      <section className="loading-content">
        <LoaderSvg stopColor="#000000" />
      </section>
    );
  }

  return (
    <div>
      <section className="card has-floating-shadow">
        <header className="auth-card-header is-consent">
          <div className="consent-logos">
            <div className="consent-logo">
              <LogoSvg width="40" height="35" fill="#ff6b4a" />
            </div>
            <FontAwesomeIcon icon={['fal', 'plus']} />
            <div className="consent-logo">
              <img alt={`${consentData.client.client_name} logo`} src={consentData.client.logo_uri} />
            </div>
          </div>
          <div className="consent-message">Connect your Infura account and {consentData.client.client_name}</div>
        </header>
        <div className="card-main">
          <div className="consent is-uppercase">Authorizing will allow {consentData.client.client_name} to:</div>
          <ul className="consent-scopes-list">
            {consentData.requested_scope.map(scope => {
              return (
                <li className="scope" key={scope}>
                  <div className="scope-logo">
                    <img alt={`${consentData.client.client_name} logo`} src={consentData.client.logo_uri} />
                  </div>
                  {SCOPE_MAP[scope]}
                </li>
              );
            })}
          </ul>
          <footer className="auth-card-footer is-consent">
            This will connect your accounts. By doing this you authorize to access your Infura account per our{' '}
            <Link to="/terms">Terms of Service</Link> and <Link to="/policy">Privacy Policy</Link>
          </footer>
          <div className="control form-submit is-consent has-text-right">
            <button className={classNames('button is-ghost-secondary')} onClick={handleNoAuthorize}>
              Cancel
            </button>
            <button className={classNames('button auth-button')} onClick={handleAuthorize}>
              Authorize
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Consent);
