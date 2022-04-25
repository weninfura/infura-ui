import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { entitlementOfferings } from '../offerings';

const CheckoutAddons = ({ addons, toggleAddon }) => (
  <section className="card has-floating-header">
    <header className="card-header">
      <h2 className="card-title">Add-ons</h2>
    </header>
    <section className="card-main">
      <ul>
        {entitlementOfferings.map(ent => (
          <li key={`entitlement-${ent.type}`} className="control is-flex addons-item">
            <input
              name={ent.type}
              id={`entitlement-option-${ent.type}`}
              type="checkbox"
              className="checkbox-input"
              checked={addons.includes(ent.type)}
              onChange={() => toggleAddon(ent.type)}
            />
            <label htmlFor={`entitlement-option-${ent.type}`}>
              <span className="plan-option-name">
                {ent.name}
                <span className="plan-option-price notranslate">${ent.price}/mo</span>
              </span>
              <span className="plan-option-desc">
                {ent.blurb} {ent.link && <Link to={ent.link}>Read more</Link>}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  </section>
);

CheckoutAddons.propTypes = {
  addons: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleAddon: PropTypes.func.isRequired,
};

export default CheckoutAddons;
