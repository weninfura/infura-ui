import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageFullScreenLoader from '../components/PageFullScreenLoader';
import { userIsSubscribed } from '../selectors/user';
import { userNeedsMFA } from '../selectors/mfa';
/*

filters:

AUTHENTICATED
NOT_AUTHENTICATED
ONBOARDED
NOT_ONBOARDED
VERIFIED
UPGRADED
NOT_UPGRADED
*/

const ProtectedRoute = ({
  component: Component,
  filter,
  isAuthenticated,
  isFetchingUser,
  isOnboarded,
  isVerified,
  needsMFA,
  isSubscribed,
  ...rest
}) => {
  const ComponentAndRoute = () => <Route component={Component} {...rest} />;
  if (filter.includes('NOT_AUTHENTICATED')) {
    if (needsMFA && rest.path === '/verify/mfa') {
      // Prevent infinite redirects
      return ComponentAndRoute();
    }

    if (rest.path === '/verify/consent') {
      return ComponentAndRoute();
    }

    if (isAuthenticated) {
      return needsMFA ? <Redirect to="/verify/mfa" /> : <Redirect to="/dashboard" />;
    }

    return ComponentAndRoute();
  }

  if (filter.includes('AUTHENTICATED')) {
    if (isAuthenticated) {
      if (isFetchingUser) {
        return <PageFullScreenLoader />;
      }

      if (needsMFA) {
        if (rest.path === '/verify/mfa') {
          return ComponentAndRoute();
        }

        return <Redirect to="/verify/mfa" />;
      }

      if (filter.includes('ONBOARDED')) {
        if (!isVerified) {
          return <Redirect to="/resendverify" />;
        }

        if (filter.includes('NOT_UPGRADED')) {
          if (userIsSubscribed) {
            return <Redirect to="/dashboard" />;
          }
          return ComponentAndRoute();
        }
        return ComponentAndRoute();
      }

      if (filter.includes('NOT_ONBOARDED')) {
        if (isVerified) {
          return <Redirect to="/dashboard" />;
        }

        return ComponentAndRoute();
      }

      return ComponentAndRoute();
    }
    return <Redirect to="/login" />;
  }

  return ComponentAndRoute();
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  filter: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetchingUser: PropTypes.bool.isRequired,
  isOnboarded: PropTypes.bool.isRequired,
  isVerified: PropTypes.bool.isRequired,
  needsMFA: PropTypes.bool.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    isAuthenticated: !!state.auth.userid,
    isFetchingUser: !!state.auth.userid && !state.auth.user,
    isOnboarded: state.auth.user ? state.auth.user.onboarded : false,
    isVerified: state.auth.user ? state.auth.user.verified : false,
    needsMFA: userNeedsMFA(state),
    isSubscribed: userIsSubscribed(state),
  }),
  {},
)(ProtectedRoute);
