import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getOffering from '../utils/getProductOfferings';
import getSubscriptionId from '../utils/getSubscriptionId';
import { saveSubscription as saveSubscriptionAction, checkoutReset as checkoutResetAction } from '../actions/checkout';
import {
  updatePromoCode as updatePromoCodeAction,
  getCoupon as getCouponAction,
  clearCoupon as clearCouponAction,
} from '../actions/subscriptions';
import { getTier, getPriceOverage } from '../selectors/checkout';
import { getCouponDiscount, getAdjustedTotal } from '../selectors/subscription';
import { canGetTrial } from '../utils/userUtils';

const DiscountLine = ({ percentOff, amountOff, discount, clearCoupon }) => (
  <li className="summary-plan-item has-padding-top-sm">
    <span>Discount of {percentOff > 0 ? `${percentOff}%` : `$${amountOff / 100}`}</span>
    <span className="is-flex">
      -${discount}
      <button
        className="button is-text has-margin-left"
        onClick={ev => {
          ev.preventDefault();
          clearCoupon();
        }}
      >
        <FontAwesomeIcon icon={['far', 'times']} size="lg" />
      </button>
    </span>
  </li>
);

DiscountLine.defaultProps = {
  amountOff: 0,
  discount: 0,
  percentOff: 0,
};

DiscountLine.propTypes = {
  amountOff: PropTypes.number,
  clearCoupon: PropTypes.func.isRequired,
  discount: PropTypes.number,
  percentOff: PropTypes.number,
};

class CheckoutSummary extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      agreeToTerms: false,
    };
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
  }

  componentWillReceiveProps(props) {
    const { addons, entitlements, promoCode, saveSubscription, tier, user } = this.props;
    const subscriptionId = getSubscriptionId(user);

    if (props.readyToSubscribe && !this.state.submitting) {
      this.setState({ submitting: true });
      saveSubscription(subscriptionId, tier.type, entitlements, addons, promoCode, canGetTrial(user));
      this.setState({ submitting: false });
    }
  }

  componentWillUnmount() {
    this.props.checkoutReset();
  }

  onCheckboxChange() {
    this.setState({
      agreeToTerms: !this.state.agreeToTerms,
    });
  }

  handleInputChange(ev) {
    this.props.updatePromoCode(ev.currentTarget.value);
  }

  handlePreview(ev) {
    ev.preventDefault();
    this.props.getCoupon();
  }

  render() {
    const { agreeToTerms } = this.state;
    const { addons, clearCoupon, coupon, discount, submitting, tier, total, user, priceOverage } = this.props;

    return (
      <section className="card has-floating-header">
        <header className="card-header">
          <h2 className="card-title">Summary</h2>
        </header>
        <section className="card-main">
          <div className="checkout-summary-plan">
            <div className="summary-plan-level">
              <span>{tier.name}</span>
              <span className="notranslate">${tier.price}/mo</span>
            </div>
            <ul className="summary-plan-list">
              <li className="summary-plan-item">
                <span className="text-label has-no-margin-bottom has-color-black">Requests:</span>
                <span className="has-color-gray-med">{tier.requests}</span>
              </li>
              <li className="summary-plan-item">
                <span className="text-label has-no-margin-bottom has-color-black">Overages:</span>
                <span className="has-color-gray-med">
                  {priceOverage < 0 ? 'Upgrade for more requests' : `$${priceOverage.toFixed(2)} / Million Requests`}
                  <div className="info-tooltip has-margin-left is-hidden-mobile">
                    <FontAwesomeIcon icon={['fal', 'info-circle']} />
                    <div className="tooltip is-left">
                      Requests exceeding daily amount are not charged as part of your subscription.
                    </div>
                  </div>
                </span>
              </li>
            </ul>
          </div>
          <div className="checkout-summary-breakdown">
            <span className="text-label has-no-margin-bottom has-color-black">Breakdown</span>
            <hr className="standard-hr" />
            <ul className="summary-plan-list">
              <li className="summary-plan-item">
                <span>Base Monthly Plan</span>
                <span className="notranslate">${tier.price}/mo</span>
              </li>

              {addons.length === 0 ? (
                <li className="summary-plan-item">
                  <span>No add-ons</span>
                  <span>N/A</span>
                </li>
              ) : (
                addons.map(type => {
                  const addon = getOffering(type);

                  return (
                    addon && (
                      <li className="summary-plan-item" key={`summary-entitlement-${type}`}>
                        <span>{addon.name}</span>
                        <span className="notranslate">${addon.price}/mo</span>
                      </li>
                    )
                  );
                })
              )}
              {canGetTrial(user) && (
                <li className="summary-plan-item">
                  <span>
                    3 Months Free
                    <div className="info-tooltip has-margin-left is-hidden-mobile">
                      <FontAwesomeIcon icon={['fal', 'info-circle']} />
                      <div className="tooltip is-left">First charge will occur at the start of month 4.</div>
                    </div>
                  </span>
                  <span>-${total}/mo</span>
                </li>
              )}
            </ul>
            <hr className="standard-hr" />
            <div>
              {discount > 0 ? (
                <ul className="summary-plan-list">
                  <DiscountLine {...coupon} discount={discount} clearCoupon={clearCoupon} />
                </ul>
              ) : (
                <div className="field is-combo">
                  <input
                    id="stripe-coupon"
                    name="coupon"
                    type="text"
                    className="input"
                    placeholder="Discount Code"
                    onChange={this.handleInputChange}
                    disabled={total === 0 ? 'disabled' : ''}
                  />
                  <button className="button is-tertiary" onClick={this.handlePreview}>
                    Apply
                  </button>
                </div>
              )}
            </div>
            <hr className="standard-hr" />
            <ul className="summary-plan-list">
              <li className="summary-plan-item">
                <span className="text-label has-no-margin-bottom has-color-black">Total:</span>
                <span>${canGetTrial(user) ? 0 : total}</span>
              </li>
            </ul>
          </div>
          <div className="checkout-summary-legal">
            <div className="control is-flex">
              <input
                type="checkbox"
                field="terms"
                id="terms"
                className="checkbox-input"
                checked={agreeToTerms}
                onChange={this.onCheckboxChange}
              />
              <label htmlFor="terms" className="checkout-summary-checkbox">
                By checking this box, I am indicating that I have read and agree to the{' '}
                <Link to="/terms" target="_blank">
                  Infura Terms of Service
                </Link>
                .
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={classNames('button is-full-width', { 'is-loading': submitting })}
            disabled={!agreeToTerms}
          >
            Get Started Now
          </button>
        </section>
      </section>
    );
  }
}

CheckoutSummary.defaultProps = {
  discount: 0,
  coupon: {},
  promoCode: '',
};

CheckoutSummary.propTypes = {
  addons: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkoutReset: PropTypes.func.isRequired,
  clearCoupon: PropTypes.func.isRequired,
  coupon: PropTypes.shape({
    amountOff: PropTypes.number,
    percentOff: PropTypes.number,
  }),
  discount: PropTypes.number,
  // Entitlement types associated with the user including paid and included in a plan
  entitlements: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCoupon: PropTypes.func.isRequired,
  priceOverage: PropTypes.number.isRequired,
  promoCode: PropTypes.string,
  readyToSubscribe: PropTypes.bool.isRequired,
  saveSubscription: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  // Tier Selected
  tier: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    requests: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  total: PropTypes.number.isRequired,
  updatePromoCode: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  state => ({
    addons: state.checkout.addons,
    coupon: state.subscription.coupon,
    discount: getCouponDiscount(state),
    entitlements: state.checkout.entitlements,
    priceOverage: getPriceOverage(state),
    promoCode: state.subscription.promoCode,
    readyToSubscribe: state.checkout.readyToSubscribe,
    submitting: state.checkout.submitting,
    subscribeSuccess: state.checkout.subscribeSuccess,
    tier: getTier(state),
    total: getAdjustedTotal(state),
    user: state.auth.user,
  }),
  {
    checkoutReset: checkoutResetAction,
    clearCoupon: clearCouponAction,
    getCoupon: getCouponAction,
    saveSubscription: saveSubscriptionAction,
    updatePromoCode: updatePromoCodeAction,
  },
)(CheckoutSummary);
