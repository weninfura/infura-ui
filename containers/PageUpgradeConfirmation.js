import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../containers/Header';

const PageUpgradePlans = () => (
  <div className="site-wrapper">
    <Header />

    <section className="site-content has-bg-primary">
      <div className="container">
        <section className="section upgrade-column">
          <div className="upgrade-content">
            <span className="upgrade-label">Welcome to</span>
            <h1 className="upgrade-title">Infura+</h1>
            <p className="upgrade-subhead">Thank you for trusting us with your infrastructure.</p>
            <Link to="/dashboard" className="button is-secondary is-large has-extra-padding">
              Continue
            </Link>
          </div>
          <span className="upgrade-rocket" />
        </section>
      </div>
    </section>
  </div>
);

export default PageUpgradePlans;
