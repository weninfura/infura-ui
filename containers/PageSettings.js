import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import SettingsAccount from './SettingsAccount';
import SettingsBilling from './SettingsBilling';
import { getSubscription as getSubscriptionAction } from '../actions/subscriptions';
import Page from '../components/Page';
import PageLoader from '../components/PageLoader';
import NavigationTabbed from '../components/NavigationTabbed';
import { userHasEverSubscribed } from '../selectors/user';

class PageSettings extends Component {
  componentDidMount() {
    this.props.getSubscription();
  }

  render() {
    const { user, hasEverSubscribed } = this.props;

    return (
      <Page>
        {user ? (
          <main className="site-content has-nav-tabbed">
            <NavigationTabbed showBilling={hasEverSubscribed} />
            <Route path="/settings/account" component={SettingsAccount} />
            {hasEverSubscribed && <Route path="/settings/billing" component={SettingsBilling} />}
          </main>
        ) : (
          <PageLoader />
        )}
      </Page>
    );
  }
}

PageSettings.propTypes = {
  getSubscription: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  hasEverSubscribed: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    user: state.auth.user,
    hasEverSubscribed: userHasEverSubscribed(state),
  }),
  {
    getSubscription: getSubscriptionAction,
  },
)(PageSettings);
