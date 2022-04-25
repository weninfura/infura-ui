import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { Elements } from 'react-stripe-elements';
import CardDisplay from './CardDisplay';
import Page from '../components/Page';
import CheckoutTiers from '../components/CheckoutTiers';
import CheckoutAddons from '../components/CheckoutAddons';
import CheckoutSummary from '../components/CheckoutSummary';
import StripeForm from './StripeForm';
import {
  checkoutHandler as checkoutHandlerAction,
  setTier as setTierAction,
  toggleAddon as toggleAddonAction,
  setAddon as setAddonAction,
} from '../actions/checkout';
import {
  triggerFlashMessage as triggerFlashMessageAction,
  toggleModal as toggleModalAction,
  getFlag as getFlagAction,
} from '../actions/ui';
import { getCurrentUser as getCurrentUserAction } from '../actions/auth';
import { tierOfferings } from '../offerings';
import { userProjectCountSelector, userSubTierSelector } from '../selectors/user';
import { isStripe as userHasCardSelector } from '../selectors/payment';
import { getTier, isPayingSubscription as isPayingSubscriptionSelector } from '../selectors/checkout';

class PageUpgradePayment extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      presavedCard: null,
      didNotHaveSub: isEmpty(get(props.user, 'service_plan.infura_plus.billing', {})),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { user } = this.props;

    this.setState({
      presavedCard: get(user, 'payment_providers.stripe', false),
    });
  }

  componentDidMount() {
    const { getFlag, location, setAddon, setTier, user, userSubTier } = this.props;
    getFlag('payments');

    // prefer plan from inbound link
    // otherwise check if current user has a tier set
    // default to ethereum_base
    const tierType = get(location, 'state.chosenPlan', userSubTier);

    setTier(tierType);
    get(user, 'service_plan.infura_plus.products.eth.addons', []).forEach(setAddon);
  }

  componentWillReceiveProps(props) {
    if (props.subscribeSuccess === true) {
      this.props.getCurrentUser();
      if (this.state.didNotHaveSub && this.props.tier.type !== tierOfferings[0].type) {
        this.props.history.push('/confirmation');
      } else if (this.props.tier.type === tierOfferings[0].type) {
        this.props.history.push('/dashboard');
      } else {
        this.props.history.goBack();
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.feature.payments) {
      this.props.checkoutHandler();
    } else {
      this.props.triggerFlashMessage('We are very sorry. Subscriptions are not available at this time', 'error');
    }
  }

  render() {
    const {
      addons,
      isPayingSubscription,
      projectCount,
      toggleAddon,
      setTier,
      tier,
      triggerFlashMessage,
      toggleModal,
      userHasCard,
      userSubTier,
    } = this.props;

    return (
      <Page>
        <main className="site-content">
          <section className="section has-padding-bottom-app">
            <div className="container">
              <form onSubmit={this.handleSubmit}>
                <div className="columns">
                  <section className="column is-8">
                    <CheckoutTiers
                      tier={tier}
                      setTier={planType => {
                        if (userSubTier === planType && planType !== tierOfferings[0].type) {
                          triggerFlashMessage('You are already subscribed to this tier.');
                        }
                        setTier(planType);
                      }}
                      projectCount={projectCount}
                      toggleModal={toggleModal}
                    />
                    <CheckoutAddons addons={addons} toggleAddon={toggleAddon} />
                    {this.state.presavedCard && 'default_source_id' in this.state.presavedCard ? (
                      <CardDisplay />
                    ) : (
                      <Elements>
                        <StripeForm isPayingSubscription={isPayingSubscription} />
                      </Elements>
                    )}
                  </section>
                  <aside className="column is-4">
                    <CheckoutSummary hasCard={userHasCard} />
                  </aside>
                </div>
              </form>
            </div>
          </section>
        </main>
      </Page>
    );
  }
}

PageUpgradePayment.defaultProps = {
  addons: [],
};

PageUpgradePayment.propTypes = {
  addons: PropTypes.arrayOf(PropTypes.string),
  checkoutHandler: PropTypes.func.isRequired,
  feature: PropTypes.shape({
    payments: PropTypes.bool,
  }).isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  getFlag: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  isPayingSubscription: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      chosenPlan: PropTypes.string,
    }),
  }).isRequired,
  projectCount: PropTypes.number.isRequired,
  toggleAddon: PropTypes.func.isRequired,
  setAddon: PropTypes.func.isRequired,
  setTier: PropTypes.func.isRequired,
  subscribeSuccess: PropTypes.bool.isRequired,
  tier: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
  triggerFlashMessage: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  userHasCard: PropTypes.bool.isRequired,
  userSubTier: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    addons: state.checkout.addons,
    entitlements: state.checkout.entitlements,
    feature: state.ui.feature,
    isPayingSubscription: isPayingSubscriptionSelector(state),
    projectCount: userProjectCountSelector(state),
    subscribeSuccess: state.checkout.subscribeSuccess,
    tier: getTier(state),
    user: state.auth.user,
    userSubTier: userSubTierSelector(state),
    userHasCard: userHasCardSelector(state),
  }),
  {
    checkoutHandler: checkoutHandlerAction,
    getCurrentUser: getCurrentUserAction,
    getFlag: getFlagAction,
    toggleAddon: toggleAddonAction,
    setAddon: setAddonAction,
    setTier: setTierAction,
    toggleModal: toggleModalAction,
    triggerFlashMessage: triggerFlashMessageAction,
  },
)(PageUpgradePayment);
