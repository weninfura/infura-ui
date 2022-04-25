import React, { PureComponent } from 'react';
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { API_URL } from '../constants';
import { getCurrentUser as getCurrentUserAction } from '../actions/auth';
import ccBrandStripeToFA from '../utils/ccBrandStripeToFA';

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

    this.state = {
      submitting: false,
      cardBrand: 'credit-card',
      error: '',
      options: countryList().getData(),
      nonStripeForm: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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

  async handleSubmit(e) {
    e.preventDefault();

    const { submitting, nonStripeForm } = this.state;

    if (submitting) {
      return null;
    }

    this.setState({ submitting: true, error: '' });

    const { getCurrentUser, triggerSuccess } = this.props;

    const token = await this.props.stripe.createToken({
      name: nonStripeForm.name,
      address_line1: nonStripeForm.address1,
      address_city: nonStripeForm.city,
      address_state: nonStripeForm.state,
      address_zip: nonStripeForm.zip,
      address_country: nonStripeForm.country,
    });

    if ('error' in token) {
      return this.setState({ submitting: false, error: token.error.message });
    }

    // add source to user
    const cardRet = await fetch(`${API_URL}payments/card`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        ...token,
        ...nonStripeForm,
      }),
      credentials: 'include',
    }).then(res => res.json());

    if (cardRet.status === true) {
      // refetch user
      getCurrentUser();

      // redirect to dashboard
      return triggerSuccess();
    }

    this.setState({ submitting: false, error: cardRet.error.message });
  }

  handleCardNumberChange(e) {
    if (this.state.cardBrand !== e.brand) {
      const { brand } = e;

      this.setState({ cardBrand: ccBrandStripeToFA(brand) });
    }
  }

  render() {
    const { cardBrand, submitting, error } = this.state;

    // get the brand icon inline in input https://jsfiddle.net/ywain/L96q8uj5/
    // test cc numbers https://www.paypalobjects.com/en_AU/vhelp/paypalmanager_help/credit_card_numbers.htm
    return (
      <form className="stripe-form" onSubmit={this.handleSubmit}>
        {error && <div className="has-text-danger">{error}</div>}

        <div className="field">
          <label htmlFor="stripe-name" className="label">
            Name on Card
          </label>
          <input
            id="stripe-name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            className="input"
            onChange={this.handleFormChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="stripe-cc-number" className="label">
            Card Number
          </label>
          <span className="payment-credit-icon">
            {cardBrand === 'credit-card-brand' ? (
              <FontAwesomeIcon icon={['fal', this.state.cardBrand]} />
            ) : (
              <FontAwesomeIcon icon={['fab', this.state.cardBrand]} />
            )}
          </span>
          <CardNumberElement id="stripe-cc-number" onChange={this.handleCardNumberChange} style={baseStyles} />
        </div>
        <div className="columns has-no-margin-fields">
          <div className="column field">
            <label htmlFor="stripe-cc-exp" className="label">
              Exp. Date
            </label>
            <CardExpiryElement id="stripe-cc-exp" style={baseStyles} />
          </div>
          <div className="column field">
            <label htmlFor="stripe-cc-cvc" className="label">
              CVC
            </label>
            <CardCVCElement id="stripe-cc-cvc" style={baseStyles} />
          </div>
        </div>

        <div className="field">
          <label htmlFor="stripe-address1" className="label">
            Address
          </label>
          <input
            id="stripe-address1"
            name="address1"
            type="text"
            className="input"
            onChange={this.handleFormChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="stripe-city" className="label">
            City
          </label>
          <input id="stripe-city" name="city" type="text" className="input" onChange={this.handleFormChange} required />
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
            onChange={this.handleFormChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="stripe-zip" className="label">
            Zip/Postal Code
          </label>
          <input id="stripe-zip" name="zip" type="text" className="input" onChange={this.handleFormChange} required />
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
            onChange={this.handleSelect}
            required
          />
        </div>
        {error && <div className="has-text-danger">{error}</div>}
        <div className="control form-submit">
          <button type="submit" className={classNames('button', { 'is-loading': submitting })}>
            <FontAwesomeIcon icon={['fal', 'lock']} />
            Save Card
          </button>
        </div>
      </form>
    );
  }
}

StripeForm.defaultProps = {
  triggerSuccess: () => {},
};

StripeForm.propTypes = {
  triggerSuccess: PropTypes.func,
  stripe: PropTypes.shape({
    createToken: PropTypes.func.isRequired,
  }).isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

// export default injectStripe(StripeForm);
export default connect(
  state => state,
  {
    getCurrentUser: getCurrentUserAction,
  },
)(injectStripe(StripeForm));
