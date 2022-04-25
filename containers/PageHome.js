import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import SignupCta from '../components/SignupCta';
import CustomerLogos from '../images/HomeCustomers.jpg';
import HomeDeveloperStats from '../images/HomeDeveloperStats.jpg';
import HomeDevelopers from '../images/HomeDevelopers.png';
import HomeEase from '../images/HomeEase.png';
import HomeEmpower from '../images/HomeEmpower.png';

const PageHome = () => (
  <Page>
    <section className="section is-large hero">
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2 has-text-centered">
            <h1 className="hero-title">Ethereum & IPFS APIs. Develop now on Web 3.0</h1>
            <p className="hero-subhead">
              Our development suite provides instant, scalable API access to the Ethereum and IPFS networks.
            </p>
            <Link className="button is-floating is-secondary is-large" to="/register">
              Get Started for Free
            </Link>
            <span className="hero-contact">
              Need a custom solution?{' '}
              <Link to="/contact" className="is-link-secondary">
                Contact us
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section className="section is-large features">
      <div className="container">
        <div className="columns">
          <header className="column is-8 is-offset-2 section-header has-text-centered">
            <h2 className="section-header-title">Your access to the Ethereum and IPFS networks</h2>
            <p className="section-header-subhead">
              Infura&#39;s world-class infrastructure will ensure your decentralized application scales to meet your
              user demand.
            </p>
          </header>
        </div>
        <div className="columns feature-row">
          <div className="column is-5">
            <h3 className="article-subhead has-color-primary">Built for developers</h3>
            <p>
              Connect your app immediately with our instant access APIs. We support JSON-RPC over HTTPS &amp; WebSocket
              interfaces, providing request and subscription-based connections.
            </p>
            <Link to="/product" className="is-uppercase is-base">
              Find out how
              <FontAwesomeIcon icon={['fal', 'arrow-right']} size="rg" className="has-margin-left" />
            </Link>
          </div>
          <div className="column is-6 is-offset-1">
            <img src={HomeDevelopers} alt="Developers" />
          </div>
        </div>
        <div className="columns feature-row">
          <div className="column is-6">
            <img src={HomeEase} alt="Ease" />
          </div>
          <div className="column is-5 is-offset-1">
            <h3 className="article-subhead has-color-primary">Built for ease</h3>
            <p>
              Start using Infura with a single URL. Our 24/7 team of experts is ready to handle all network changes and
              upgrades so you can focus on building your applications.
            </p>
            <Link to="/product" className="is-uppercase is-base">
              Learn more about our product
              <FontAwesomeIcon icon={['fal', 'arrow-right']} size="rg" className="has-margin-left" />
            </Link>
          </div>
        </div>
        <div className="columns feature-row">
          <div className="column is-5">
            <h3 className="article-subhead has-color-primary">Built for builders</h3>
            <p>
              We believe in a future powered by decentralized networks and protocols. We provide world-class
              infrastructure for developers so you can spend your time building and creating.
            </p>
            <Link to="/about" className="is-uppercase is-base">
              Learn more about our mission
              <FontAwesomeIcon icon={['fal', 'arrow-right']} size="rg" className="has-margin-left" />
            </Link>
          </div>
          <div className="column is-6 is-offset-1">
            <img src={HomeEmpower} alt="Empower" />
          </div>
        </div>
      </div>
    </section>

    <section className="section is-large customers">
      <div className="container">
        <div className="columns">
          <header className="column is-8 is-offset-2 section-header has-text-centered has-margin-bottom-small">
            <h2 className="section-header-title">You&#39;re in good company</h2>
            <p className="section-header-subhead">Thousands of developers and applications trust Infura.</p>
          </header>
        </div>
        <div className="customer-logos">
          <img src={CustomerLogos} alt="Customers" />
        </div>
        <div className="has-text-centered">
          <Link className="button is-floating has-extra-padding" to="/register">
            Get Started
          </Link>
        </div>
      </div>
    </section>

    <section className="section is-large fordevelopers">
      <div className="container">
        <div className="columns">
          <header className="column is-8 section-header has-margin-bottom-small">
            <h2 className="section-header-title">Resources you need</h2>
            <p className="section-header-subhead">
              You can find valuable insights, add applications, and more through our Infura dashboard. Need help or have
              questions? Get answers in our active community, up-to-date status page, or dig directly into our expanding
              library of documentation.
            </p>
          </header>
        </div>
        <div className="columns">
          <div className="column is-8 is-hidden-mobile developer-stats">
            <img src={HomeDeveloperStats} alt="Stats Dashboard" className="has-image-shadow" />
          </div>
          <div className="column is-4 developer-resources">
            <a className="card-resource has-bg-primary" href="https://community.infura.io">
              <div className="card-resource-content">
                <FontAwesomeIcon icon={['fab', 'discourse']} size="3x" className="card-resource-icon" />
                <span className="text-label has-color-white has-no-margin-bottom">Community</span>
                <div className="card-resource-cta">
                  <span>Ask experts your questions</span>
                  <FontAwesomeIcon icon={['fal', 'arrow-right']} size="lg" />
                </div>
              </div>
            </a>
            <Link className="card-resource has-bg-secondary" to="/docs">
              <div className="card-resource-content">
                <FontAwesomeIcon icon={['fal', 'books']} size="3x" className="card-resource-icon" />
                <span className="text-label has-color-white has-no-margin-bottom">Documentation</span>
                <div className="card-resource-cta">
                  <span>Learn how to use Infura</span>
                  <FontAwesomeIcon icon={['fal', 'arrow-right']} size="lg" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
    <SignupCta />
  </Page>
);

export default PageHome;
