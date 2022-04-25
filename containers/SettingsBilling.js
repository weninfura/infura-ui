import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import AccountLevelBanner from '../components/AccountLevelBanner';
import ccBrandStripeToFA from '../utils/ccBrandStripeToFA';
import { toggleModal as toggleModalAction } from '../actions/ui';
import { getSubsHistory as getSubsHistoryAction } from '../actions/subscriptions';
import { userIsSubscribed, getUserAddons, getUserTier } from '../selectors/user';
import { getRenewalDate } from '../selectors/subscription';
import { isStripe as isStripeSelector } from '../selectors/payment';

class SettingsBilling extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      invoicesPerPage: 5,
    };

    this.downloadFile = this.downloadFile.bind(this);
  }

  componentDidMount() {
    const { getSubsHistory } = this.props;
    getSubsHistory();
  }

  // Clean up if any downloads have taken place
  componentWillUnmount() {
    if (this.iframe) {
      this.iframe.remove();
    }
  }

  // Use an iframe technique to force a download from inside react
  downloadFile(invoiceUrl) {
    if (this.iframe) {
      this.iframe.remove();
    }

    this.iframe = document.createElement('iframe');
    Object.assign(this.iframe, { src: invoiceUrl });

    document.body.appendChild(this.iframe);
  }

  changePage(i) {
    this.setState({
      currentPage: i,
    });
  }

  render() {
    const { addons, isStripe, isSubscribed, paymentHistory, renewalDate, tier, toggleModal, user } = this.props;

    const { currentPage, invoicesPerPage } = this.state;

    const numPages = Math.ceil(paymentHistory.length / invoicesPerPage);

    let categoryFA = 'fal';
    let iconNameFA = '';

    if (isStripe) {
      iconNameFA = ccBrandStripeToFA(get(user, 'payment_providers.stripe.card_brand'));
      if (iconNameFA !== 'credit-card-blank') {
        categoryFA = 'fab';
      }
    }

    return (
      <section className="section has-padding-bottom-app">
        <div className="container">
          <div className="columns">
            <section className="column is-8 is-offset-2">
              <AccountLevelBanner isSubscribed={isSubscribed} tier={tier} addons={addons} renewalDate={renewalDate} />
              <section className="card has-floating-header">
                <header className="card-header">
                  <h2 className="card-title">Billing History</h2>
                </header>
                {paymentHistory.length > 0 ? (
                  <section className="card-main">
                    <table className="table billing-history-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th className="is-right-align">Receipts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistory
                          .slice((currentPage - 1) * invoicesPerPage, currentPage * invoicesPerPage)
                          .map(i => (
                            <tr key={i.id}>
                              <td>{new Date(i.date * 1000).toDateString()}</td>
                              <td>Plus Monthly</td>
                              <td className="is-right-align">
                                <button
                                  className="button is-text is-uppercase"
                                  onClick={ev => {
                                    ev.preventDefault();
                                    this.downloadFile(i.invoicePdf);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={['fal', 'file-pdf']}
                                    size="lg"
                                    className="has-margin-right-smallest"
                                  />
                                  Download Receipt
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <footer className="card-footer is-flex">
                      <div className="pagination-wrapper" style={{ display: numPages > 1 ? 'flex' : 'none' }}>
                        <span
                          className="pagination-arrow"
                          style={{ display: currentPage > 1 ? 'block' : 'none' }}
                          onClick={() => this.setState({ currentPage: currentPage - 1 })}
                        >
                          <FontAwesomeIcon icon={['far', 'angle-left']} />
                        </span>
                        <ul className="pagination-list">
                          {[...Array(numPages).keys()].map(i => {
                            return (
                              <li
                                className={`pagination-number ${currentPage === i + 1 && 'is-active'}`}
                                onClick={() => this.changePage(i + 1)}
                              >
                                {i + 1}
                              </li>
                            );
                          })}
                        </ul>
                        <span
                          className="pagination-arrow"
                          style={{ display: currentPage < numPages ? 'block' : 'none' }}
                          onClick={() => this.setState({ currentPage: currentPage + 1 })}
                        >
                          <FontAwesomeIcon icon={['far', 'angle-right']} />
                        </span>
                      </div>
                    </footer>
                  </section>
                ) : (
                  <section className="card-main">
                    <section className="empty-ui-prompt">
                      <span className="fa-stack fa-3x">
                        <FontAwesomeIcon icon={['fal', 'slash']} className="empty-ui-icon fa-stack-1x" />
                        <FontAwesomeIcon icon={['fal', 'file-invoice']} className="empty-ui-icon fa-stack-1x" />
                      </span>
                      <h1 className="empty-ui-title">History Not Available</h1>
                      <p className="empty-ui-message">Your account does not have any previous billing history.</p>
                    </section>
                  </section>
                )}
              </section>

              <section className="card has-floating-header">
                <header className="card-header">
                  <h2 className="card-title">Payment Info</h2>
                </header>
                <section className="card-main billing-payment-method">
                  {isStripe && (
                    <div className="billing-payment-card">
                      <span className="billing-payment-icon">
                        <FontAwesomeIcon icon={[categoryFA, iconNameFA]} size="3x" className="is-cc-blank" />
                      </span>
                      <span className="billing-payment-name is-flex">
                        Card ending in {get(user, 'payment_providers.stripe.last_four')}
                      </span>
                    </div>
                  )}
                  <button className="button is-ghost-secondary billing-payment-change" onClick={toggleModal}>
                    Change
                  </button>
                </section>
              </section>
            </section>
          </div>
        </div>
      </section>
    );
  }
}

SettingsBilling.defaultProps = {
  addons: [],
};

SettingsBilling.propTypes = {
  addons: PropTypes.arrayOf(PropTypes.string),
  isStripe: PropTypes.bool.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  getSubsHistory: PropTypes.func.isRequired,
  paymentHistory: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      invoicePdf: PropTypes.string.isRequired,
    }),
  ).isRequired,
  renewalDate: PropTypes.string.isRequired,
  tier: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  state => ({
    addons: getUserAddons(state),
    isStripe: isStripeSelector(state),
    isSubscribed: userIsSubscribed(state),
    paymentHistory: state.subscription.invoices,
    renewalDate: getRenewalDate(state),
    tier: getUserTier(state),
    user: state.auth.user,
  }),
  {
    toggleModal: () => toggleModalAction('EDIT_PAYMENT'),
    getSubsHistory: () => getSubsHistoryAction(),
  },
)(SettingsBilling);
