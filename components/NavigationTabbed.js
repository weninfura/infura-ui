import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavigationTabbed = ({ showBilling }) => (
  <section className="nav-tabbed">
    <ul className="nav-tabbed-list">
      <li className="nav-tabbed-list-item">
        <NavLink to="/settings/account" className="nav-tabbed-list-link" activeClassName="nav-selected">
          Account
        </NavLink>
      </li>
      {showBilling && (
        <li className="nav-tabbed-list-item">
          <NavLink to="/settings/billing" className="nav-tabbed-list-link" activeClassName="nav-selected">
            Billing
          </NavLink>
        </li>
      )}
    </ul>
  </section>
);

NavigationTabbed.propTypes = {
  showBilling: PropTypes.bool.isRequired,
};

export default NavigationTabbed;
