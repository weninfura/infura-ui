import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TourCancel from './TourCancel';
import TourIntro from '../images/TourIntro.png';
import TourOutro from '../images/TourOutro.png';

const TourCard = ({ startOnboarding, completeOnboarding, toggleAskCancel, askCancel, finalCard }) => (
  <div className="modal is-active">
    <div className="modal-background" />

    <section className="card has-floating-shadow tour-card">
      {askCancel ? (
        <section className="card-main tour-exit">
          <TourCancel completeOnboarding={completeOnboarding} toggleAskCancel={toggleAskCancel} />
        </section>
      ) : (
        <React.Fragment>
          <header className="tour-card-header">
            <div
              className="button-close is-floating-close"
              role="button"
              tabIndex={0}
              onClick={!finalCard ? toggleAskCancel : completeOnboarding}
              onKeyDown={!finalCard ? toggleAskCancel : completeOnboarding}
            >
              <FontAwesomeIcon icon={['far', 'times']} size="lg" />
            </div>

            {!finalCard ? <img src={TourIntro} alt="" /> : <img src={TourOutro} alt="" />}
          </header>
          <section className="card-main">
            {!finalCard ? (
              <React.Fragment>
                <h1 className="tour-card-intro-title">Welcome to Infura</h1>
                <p className="has-no-margin-bottom">
                  Our API suite provides easy access to the Ethereum and IPFS networks. We are going to give you a short
                  tour of how things work.
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h1 className="tour-card-intro-title">You&#39;re All Set!</h1>
                <p>You&#39;re ready to connect your app and build with the power of the Ethereum network.</p>
                <ul className="tour-card-links">
                  <li>
                    <Link className="tour-card-link" to="/docs" target="blank">
                      <FontAwesomeIcon icon={['fal', 'books']} size="lg" />
                      Read Documentation
                    </Link>
                  </li>
                  <li>
                    <a className="tour-card-link" href="https://community.infura.io" target="blank">
                      <FontAwesomeIcon icon={['fal', 'comments']} size="lg" />
                      Visit Community
                    </a>
                  </li>
                  <li>
                    <a className="tour-card-link" href="https://twitter.com/infura_io" target="blank">
                      <FontAwesomeIcon icon={['fab', 'twitter']} size="lg" />
                      Follow Us
                    </a>
                  </li>
                </ul>
              </React.Fragment>
            )}
          </section>
          <footer className="tour-card-footer">
            {!finalCard ? (
              <React.Fragment>
                <button className="button" onClick={startOnboarding}>
                  Start Tour
                </button>
                <button className="button is-text" onClick={completeOnboarding}>
                  Skip
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button className="button has-extra-padding" onClick={completeOnboarding}>
                  OK
                </button>
              </React.Fragment>
            )}
          </footer>
        </React.Fragment>
      )}
    </section>
  </div>
);

TourCard.defaultProps = {
  startOnboarding: () => {},
  finalCard: false,
};

TourCard.propTypes = {
  startOnboarding: PropTypes.func,
  completeOnboarding: PropTypes.func.isRequired,
  toggleAskCancel: PropTypes.func.isRequired,
  askCancel: PropTypes.bool.isRequired,
  finalCard: PropTypes.bool,
};

export default TourCard;
