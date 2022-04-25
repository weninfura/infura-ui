import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';
import ScrollToTop from './components/ScrollToTop';
import FlashMessage from './containers/FlashMessage';
import Modal from './containers/Modal';
import Page404 from './containers/Page404';
import PageAbout from './containers/PageAbout';
import PageAuth from './containers/PageAuth';
import PageContact from './containers/PageContact';
import PageDashboard from './containers/PageDashboard';
import PageDocumentation from './containers/PageDocumentation';
import PageEmailLogin from './containers/PageEmailLogin';
import PageForgotPassword from './containers/PageForgotPassword';
import PageHome from './containers/PageHome';
import PagePressKit from './containers/PagePressKit';
import PagePricing from './containers/PagePricing';
import PageProduct from './containers/PageProduct';
import PageUpgradePayment from './containers/PageUpgradePayment';
import PageUpgradeConfirmation from './containers/PageUpgradeConfirmation';
import PagePrivacy from './containers/PagePrivacy';
import PageResendVerify from './containers/PageResendVerify';
import ProtectedRoute from './containers/ProtectedRoute';
import PageSettings from './containers/PageSettings';
import PageStats from './containers/PageStats';
import PageProjectMgmt from './containers/PageProjectMgmt';
import PageSupportTicket from './containers/PageSupportTicket';
import PageTerms from './containers/PageTerms';
import PageVerify from './containers/PageVerify';

// Use live stripe in production, check works server or client side
let stripePubKey;
if (
  process.env.STRIPE_ENVIRONMENT === 'live' ||
  (typeof window !== 'undefined' &&
    (window.location.hostname === 'infura.io' || window.location.hostname === 'staging.infuratest.io'))
) {
  stripePubKey = 'pk_live_VaytPFi9MYdoyp0hsbKgvpOb00g6GOiavH';
} else {
  stripePubKey = 'pk_test_RpLx9J3YQYMSkAHtfLwPtU2n00dzlBMT0y';
}

const filterAuthOnboarded = ['AUTHENTICATED', 'ONBOARDED'];
const filterAuthNotOnboarded = ['AUTHENTICATED', 'NOT_ONBOARDED'];
const filterNotAuth = ['NOT_AUTHENTICATED'];

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = { stripe: null };
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Router>
          <ScrollToTop>
            <FlashMessage />
            <Modal />

            <Switch>
              <Route path="/about" component={PageAbout} />
              <Route path="/contact" component={PageContact} />
              <Route path="/pricing" component={PagePricing} />
              <Route path="/product" component={PageProduct} />
              <ProtectedRoute
                filter={filterNotAuth}
                path="/register"
                component={() => <PageAuth type="REGISTER" />}
                exact
              />
              <ProtectedRoute filter={filterNotAuth} path="/login" component={() => <PageAuth type="LOGIN" />} exact />
              <ProtectedRoute
                filter={filterNotAuth}
                path="/verify/mfa"
                component={() => <PageAuth type="MFA" />}
                exact
              />
              <ProtectedRoute
                filter={filterNotAuth}
                path="/verify/consent"
                component={() => <PageAuth type="CONSENT" />}
                exact
              />
              <ProtectedRoute filter={filterAuthNotOnboarded} path="/resendverify" component={PageResendVerify} exact />
              <Route path="/verify/:token" component={PageVerify} exact />
              <Route path="/forgotverify/:token" render={props => <PageEmailLogin {...props} isForgotPass />} />
              <ProtectedRoute filter={filterAuthOnboarded} path="/dashboard" component={PageDashboard} />
              <ProtectedRoute filter={filterAuthOnboarded} path="/stats/:projectId" component={PageStats} />
              <ProtectedRoute filter={filterAuthOnboarded} path="/stats" component={PageStats} exact />
              <ProtectedRoute
                filter={filterAuthOnboarded}
                path="/project/:projectId"
                component={PageProjectMgmt}
                exact
              />
              <ProtectedRoute filter={filterAuthOnboarded} path="/settings" component={PageSettings} />
              <ProtectedRoute filter={filterAuthOnboarded} path="/upgrade" component={PagePricing} />
              <ProtectedRoute filter={filterAuthOnboarded} path="/payment" component={PageUpgradePayment} />
              <ProtectedRoute filter={filterAuthOnboarded} path="/confirmation" component={PageUpgradeConfirmation} />
              <Route path="/support/ticket" component={PageSupportTicket} />
              <Route path="/terms" component={PageTerms} />
              <Route path="/privacy" component={PagePrivacy} />
              <Route path="/docs" component={PageDocumentation} />
              <Route path="/presskit" component={PagePressKit} />
              <Route path="/forgotpassword" component={PageForgotPassword} />
              <Route path="/404" component={Page404} />
              <ProtectedRoute filter={filterNotAuth} path="/" component={PageHome} exact />
              <Route component={Page404} />

              {/* not found */}
              <Route component={() => <Redirect to="/" />} />
            </Switch>
          </ScrollToTop>
        </Router>
      </StripeProvider>
    );
  }
}

export default App;
