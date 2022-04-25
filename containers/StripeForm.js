import React, { PureComponent } from 'react';
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import { getCurrentUser as getCurrentUserAction } from '../actions/auth';
import ccBrandStripeToFA from '../utils/ccBrandStripeToFA';
import { saveCard as saveCardAction } from '../actions/checkout';

const baseStyles = {
  base: {
    color: '#333',
    fontWeight: 300,
    fontFamily: 'Lineto Akkuratmono Regular, sans-serif',
    fontSize: '16px',
  },
};

class StripeForm extends PureComponent {
  constructor(props) {
    super(props);

    this.options = countryList().getData();
    this.state = {
      options: this.options,
      cardBrand: 'credit-card-blank',
      error: '',
      nonStripeForm: {},
    };

    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.checkout.submitting && props.checkout.needsPaymentMethod) {
      this.props.saveCard(this.props.stripe, this.state.nonStripeForm);
    }
    if (!isEmpty(props.checkout.cardErrors)) {
      this.setState({ error: props.checkout.cardErrors.message });
    }
  }

  handleFormChange(e) {
    const {
      target: { name, value },
    } = e;

    this.setState({
      nonStripeForm: { ...this.state.nonStripeForm, [name]: value },
    });
  }

  handleSelect({ value }) {
    this.handleFormChange({
      target: { name: 'country', value },
    });
  }

  handleCardNumberChange(e) {
    if (this.state.cardBrand !== e.brand) {
      const { brand } = e;

      this.setState({ cardBrand: ccBrandStripeToFA(brand) });
    }
  }

  render() {
    const { cardBrand, error } = this.state;
    const { isPayingSubscription } = this.props;
    const classNames = ['StripeElement', 'StripeElement--empty'];

    const stripeFormClassNames = ['stripe-form', isPayingSubscription ? '' : 'is-disabled'];

    // get the brand icon inline in input https://jsfiddle.net/ywain/L96q8uj5/
    // test cc numbers https://www.paypalobjects.com/en_AU/vhelp/paypalmanager_help/credit_card_numbers.htm
    return (
      <div className={stripeFormClassNames.join(' ')}>
        {error && <div className="has-text-danger">{error}</div>}
        <section className="card has-floating-header">
          <header className="card-header">
            <h2 className="card-title">Credit Card</h2>
          </header>
          <section className="card-main">
            <div className="field">
              <label htmlFor="stripe-cc-number" className="label">
                Card Number
              </label>
              <span className="payment-credit-icon">
                {cardBrand === 'credit-card-blank' ? (
                  <FontAwesomeIcon icon={['fas', 'credit-card']} />
                ) : (
                  <FontAwesomeIcon icon={['fab', this.state.cardBrand]} />
                )}
              </span>
              <CardNumberElement
                id="stripe-cc-number"
                className={classNames.join(' ')}
                onChange={this.handleCardNumberChange}
                style={baseStyles}
                disabled={!isPayingSubscription}
              />
            </div>
            <div className="columns has-no-margin-fields">
              <div className="column is-half field">
                <label htmlFor="stripe-name" className="label">
                  Name on Card
                </label>
                <input
                  id="stripe-name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  className="input"
                  disabled={!isPayingSubscription}
                  onChange={this.handleFormChange}
                  required
                />
              </div>
              <div className="column field">
                <label htmlFor="stripe-cc-exp" className="label">
                  Exp. Date
                </label>
                <CardExpiryElement
                  id="stripe-cc-exp"
                  className={classNames.join(' ')}
                  style={baseStyles}
                  disabled={!isPayingSubscription}
                />
              </div>
              <div className="column field">
                <label htmlFor="stripe-cc-cvc" className="label">
                  CVC
                </label>
                <CardCVCElement
                  id="stripe-cc-cvc"
                  className={classNames.join(' ')}
                  style={baseStyles}
                  disabled={!isPayingSubscription}
                />
              </div>
            </div>
          </section>
        </section>

        <section className="card has-floating-header">
          <header className="card-header">
            <h2 className="card-title">Billing Info</h2>
          </header>
          <section className="card-main">
            <div className="field">
              <label htmlFor="stripe-address1" className="label">
                Address
              </label>
              <input
                id="stripe-address1"
                name="address1"
                type="text"
                className="input"
                disabled={!isPayingSubscription}
                onChange={this.handleFormChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="stripe-city" className="label">
                City
              </label>
              <input
                id="stripe-city"
                name="city"
                type="text"
                className="input"
                disabled={!isPayingSubscription}
                onChange={this.handleFormChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="stripe-state" className="label">
                State/Province/Region
              </label>
              <input
                id="stripe-state"
                name="state"
                type="text"
                className="input"
                disabled={!isPayingSubscription}
                onChange={this.handleFormChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="stripe-zip" className="label">
                Zip/Postal Code
              </label>
              <input
                id="stripe-zip"
                name="zip"
                type="text"
                className="input"
                disabled={!isPayingSubscription}
                onChange={this.handleFormChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="stripe-country" className="label">
                Country
              </label>
              <Select
                id="stripe-country"
                name="country"
                options={this.state.options}
                classNamePrefix="stripe-country"
                disabled={!isPayingSubscription}
                onChange={this.handleSelect}
                required
              />
            </div>
          </section>
        </section>
      </div>
    );
  }
}

StripeForm.propTypes = {
  isPayingSubscription: PropTypes.bool.isRequired,
  saveCard: PropTypes.func.isRequired,
  stripe: PropTypes.shape({
    createSource: PropTypes.func.isRequired,
  }).isRequired,
  checkout: PropTypes.shape({
    submitting: PropTypes.bool,
    needsPaymentMethod: PropTypes.bool,
    cardErrors: PropTypes.shape({
      message: PropTypes.string,
    }),
  }).isRequired,
};

// export default injectStripe(StripeForm);
export default connect(
  state => state,
  {
    getCurrentUser: getCurrentUserAction,
    saveCard: saveCardAction,
  },
)(injectStripe(StripeForm));
