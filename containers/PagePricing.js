import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Page from '../components/Page';
import SignupCta from '../components/SignupCta';
import PricingButton from '../components/PricingButton';
import { getUserSubscriptionTier } from '../utils/userUtils';
import { tierOfferings } from '../offerings';
import { toggleModal as toggleModalAction } from '../actions/ui';
import { getProjectCount } from '../utils/getProjectUtils';

const PagePricing = ({ isAuthenticated, user, toggleModal }) => (
  <Page>
    <header className="section is-large page-header has-no-padding-bottom">
      <div className="container">
        <div className="columns">
          <section className="column is-6 is-offset-3 has-text-centered">
            <h1 className="header-title">Pricing that scales</h1>
            <p className="header-subhead has-color-white">Just like our infrastructure, our prices fit your apps.</p>
          </section>
        </div>
        <section className={`columns pricing-plans ${isAuthenticated ? 'has-upgrade-buttons' : ''}`}>
          <section className="column is-3">
            <div className="card has-padding has-floating-light-shadow has-no-border-radius pricing-plan-tier">
              <h2 className="plan-title">Core</h2>
              <h3 className="plan-subhead">Free</h3>
              <hr className="plan-h-divider" />
              <ul>
                <li className="plan-feature">
                  <FontAwesomeIcon
                    icon={['far', 'check']}
                    size="lg"
                    className="has-color-secondary has-margin-right-smallest"
                  />
                  Ethereum Mainnet and Testnets
                </li>
                <li className="plan-feature">
                  <FontAwesomeIcon
                    icon={['far', 'check']}
                    size="lg"
                    className="has-color-secondary has-margin-right-smallest"
                  />
                  100,000 Requests/Day
                </li>
                <li className="plan-feature">
                  <FontAwesomeIcon
                    icon={['far', 'check']}
                    size="lg"
                    className="has-color-secondary has-margin-right-smallest"
                  />
                  3 Projects
                </li>
                <li className="plan-feature">
                  <FontAwesomeIcon
                    icon={['far', 'check']}
                    size="lg"
                    className="has-color-secondary has-margin-right-smallest"
                  />
                  Community Support Forum
                </li>
              </ul>
              {isAuthenticated && (
                <PricingButton
                  isCurrent={getUserSubscriptionTier(user) === tierOfferings[0].type}
                  chosenPlan={tierOfferings[0].type}
                  toggleModal={toggleModal}
                  projectCount={getProjectCount(user)}
                />
              )}
            </div>
          </section>
          <section className="column is-9 infura-plus-plans">
            <header className="pricing-card-header">
              <span className="text-label has-color-white">Infura+</span>
            </header>
            <section className="card has-padding has-floating-light-shadow has-no-border-radius">
              <div className="columns">
                <div className="column pricing-plan-tier">
                  <h2 className="plan-title">Developer</h2>
                  <h3 className="plan-subhead">$50/mo</h3>
                  <hr className="plan-h-divider" />
                  <ul>
                    <li className="plan-feature">
                      <FontAwesomeIcon
                        icon={['far', 'check']}
                        size="lg"
                        className="has-color-secondary has-margin-right-smallest"
                      />
                      All core tier benefits, plus:
                    </li>
                    <li className="plan-feature">
                      <FontAwesomeIcon
                        icon={['far', 'check']}
                        size="lg"
                        className="has-color-secondary has-margin-right-smallest"
                      />
                      200,000 Requests/Day
                    </li>
                    <li className="plan-feature">
                      <FontAwesomeIcon
                        icon={['far', 'check']}
                        size="lg"
                        className="has-color-secondary has-margin-right-smallest"
                      />
                      10 Projects
                    </li>
                    <li className="plan-feature">
                      <FontAwesomeIcon
                        icon={['far', 'check']}
                        size="lg"
                        className="has-color-secondary has-margin-right-smallest"
                      />
                      Direct Customer Support
                    </li>
                  </ul>
                  {isAuthenticated && (
                    <PricingButton
                      isCurrent={getUserSubscriptionTier(user) === tierOfferings[1].type}
                      chosenPlan={tierOfferings[1].type}
                    />
                  )}
                </div>
                <div className="column pricing-plan-tier">
                  <h2 className="plan-title">Team</h2>
                  <h3 className="plan-subhead">$225/mo</h3>
                  <hr className="plan-h-divider" />
                  <ul>
                    <li className="plan-feature">
                      <FontAwesomeIcon
                        icon={['far', 'check']}
                        size="lg"
                        className="has-color-secondary has-margin-right-smallest"
                      />
                      All developer tier benefits, plus:
                    </li>
                    <li className="plan-feature">
                      <FontAwesomeIcon
                        icon={['far', 'check']}
                        size="lg"
                        className="has-color-secondary has-margin-right-smallest"
                      />
                      1,000,000 Requests/Day
                    </li>
                    <li className="plan-feature">
                      <FontAwesomeIcon
                        icon={['far', 'check']}
                        size="lg"
                        className="has-color-secondary has-margin-right-smallest"
                      />
                      24hr Support Response Time
                    </li>
                  </ul>
                  {isAuthenticated && (
                    <PricingButton
                      isCurrent={getUserSubscriptionTier(user) === tierOfferings[2].type}
                      chosenPlan={tierOfferings[2].type}
                    />
                  )}
                </div>
                <div className="column pricing-plan-tier">
                  <h2 className="plan-title">Growth</h2>
                  <h3 className="plan-subhead">$1000/mo</h3>
                  <hr className="plan-h-divider" />
                  <ul>
                    <li className="plan-feature">
                      <FontAwesomeIcon
                        icon={['far', 'check']}
                        size="lg"
                        className="has-color-secondary has-margin-right-smallest"
                      />
                      All team tier benefits, plus:
                    </li>
                    <li className="plan-feature">
                      <FontAwesomeIcon
                        icon={['far', 'check']}
                        size="lg"
                        className="has-color-secondary has-margin-right-smallest"
                      />
                      5,000,000 Requests/Day
                    </li>
                    <li className="plan-feature">
                      <FontAwesomeIcon
                        icon={['far', 'check']}
                        size="lg"
                        className="has-color-secondary has-margin-right-smallest"
                      />
                      8hr Support Response Time
                    </li>
                  </ul>
                  {isAuthenticated && (
                    <PricingButton
                      isCurrent={getUserSubscriptionTier(user) === tierOfferings[3].type}
                      chosenPlan={tierOfferings[3].type}
                    />
                  )}
                </div>
              </div>
            </section>
          </section>
        </section>
        {!isAuthenticated && (
          <div className="has-text-centered get-started-touch is-hidden-desktop">
            <a className="button is-large is-secondary is-floating" href="/register">
              Get Started for Free
            </a>
            <p className="pricing-enterprise-link">
              Don&#39;t see what you need? <Link to="/contact">Contact us</Link> for a custom plan.
            </p>
          </div>
        )}
      </div>
    </header>

    <section className="section is-large pricing-plans-top-padding is-get-started is-hidden-touch">
      <div className="container">
        <div className="columns">
          <div className="column is-6 is-offset-3 has-text-centered">
            {!isAuthenticated && (
              <a className="button is-large is-floating" href="/register">
                Get Started for Free
              </a>
            )}
            <p className="pricing-enterprise-link">
              Don&#39;t see what you need?
              <br />
              <Link to="/contact">Contact us</Link>&nbsp;for a custom plan.
            </p>
          </div>
        </div>
        <hr className="divider-h-small" />

        <header className="section-header">
          <div className="columns">
            <div className="column is-8 is-offset-2 has-text-centered">
              <h2 className="header-title has-color-primary">Add-ons</h2>
              <p className="header-subhead">Choose the exact features you need for your application.</p>
            </div>
          </div>
        </header>
        <section className="columns">
          <div className="column is-4 is-offset-4">
            <div className="card has-floating-light-shadow">
              <div className="card-header-addon has-bg-secondary">
                <FontAwesomeIcon icon={['fal', 'archive']} size="3x" className="has-margin-bottom-base" />
                <h3 className="addon-header">
                  <span className="addon-name">Archive Data</span>
                  <span className="addon-price">$250/mo</span>
                </h3>
              </div>
              <div className="card-main">
                <p className="has-no-margin-bottom">
                  Enhance your Ethereum data with full Archival Node data. The Archive Data add-on provides API access
                  to historical data on the Ethereum network. See our{' '}
                  <a href="/docs/ethereum/add-ons/archiveData">documentation</a> for more information.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

    <section className="section is-large has-bg-white">
      <div className="container">
        <header className="section-header">
          <div className="columns">
            <div className="column is-8 is-offset-2 has-text-centered">
              <h2 className="header-title has-color-primary has-no-margin-bottom">Frequently asked questions</h2>
            </div>
          </div>
        </header>
        <section className="columns">
          <div className="column is-4 is-offset-2">
            <dl>
              <dt>Are there rate limits for free or paid accounts?</dt>
              <dd>
                In order to provide the best possible service, there are rate limits on both free and paid accounts. To
                learn more about the limits and how to build with them in mind, <Link to="/docs">click here</Link>.
              </dd>
              <dt>What requests require the Archive Data add-on?</dt>
              <dd>
                The Archive Data add-on is required for Ethereum requests that are more than 128 blocks behind the head
                of the chain and use one of the following methods:{' '}
                <span className="is-italic">
                  eth_getBalance, eth_getCode, eth_getTransactionCount, eth_getStorageAt, eth_call, eth_estimateGas
                </span>
                .
              </dd>
              <dt>Do you support blockchains other than Ethereum?</dt>
              <dd>
                Currently, our APIs only support the Ethereum blockchain and IPFS. If your application needs support for
                other blockchains or services, <Link to="/contact">let us know</Link>.
              </dd>
            </dl>
          </div>
          <div className="column is-4">
            <dl>
              <dt>What happens if I exceed my daily requests?</dt>
              <dd>
                If you exceed your daily requests on your paid plan, your requests will still work. We&#39;ll get in
                touch to help you determine if it makes sense to pay the fixed overage charges associated with your
                plan, or upgrade to a new or custom plan.
              </dd>
              <dt>Does Infura offer an SLA and more support options?</dt>
              <dd>Yes, as part of our custom plans, we will work with you to explore these options.</dd>
              <dt>How do I pay for premium IPFS features?</dt>
              <dd>
                We&#39;re still building our premium IPFS service.{' '}
                <a href="http://eepurl.com/ccywhv">Sign up to our newsletter</a> to find out when it&#39;s ready.
              </dd>
            </dl>
          </div>
        </section>
        <footer className="section-footer has-text-centered">
          <a href="https://community.infura.io" className="button is-large is-floating">
            Visit Our Community
          </a>
        </footer>
      </div>
    </section>

    <SignupCta />
  </Page>
);

PagePricing.defaultProps = {
  user: {},
};

PagePricing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    service_plan: PropTypes.shape({
      infura_plus: PropTypes.shape({
        products: PropTypes.shape({
          eth: PropTypes.shape({
            tier: PropTypes.string,
          }),
        }),
      }),
    }),
  }),
  toggleModal: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    isAuthenticated: !!state.auth.userid,
    user: state.auth.user,
  }),
  {
    toggleModal: toggleModalAction,
  },
)(PagePricing);
