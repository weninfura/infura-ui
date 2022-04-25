import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import SignupCta from '../components/SignupCta';
import ProductInfrastructure from '../images/ProductInfrastructure.png';
import ProductUsers from '../images/ProductStats.png';
import ProductInsight from '../images/ProductCalls.png';

const PageProduct = () => (
  <Page>
    <header className="section is-large page-header">
      <div className="container">
        <div className="columns">
          <section className="column is-8 is-offset-2 has-text-centered">
            <h1 className="header-title">The foundation for decentralized applications</h1>
            <p className="header-subhead has-color-white has-margin-bottom-regular">
              Instant, reliable infrastructure connecting you to Ethereum and IPFS.
            </p>
            <Link className="button is-floating is-secondary is-large" to="/register">
              Create API Key
            </Link>
          </section>
        </div>
      </div>
    </header>
    <section className="section is-large features">
      <div className="container">
        <div className="columns">
          <header className="column is-8 is-offset-2 section-header has-text-centered">
            <h2 className="section-header-title">Why Infura?</h2>
            <p className="section-header-subhead">
              The Infura API suite provides instant access over HTTPS and WebSockets to the Ethereum and IPFS networks.
              Infrastructure for your Web 3.0 app has never been easier.
            </p>
          </header>
        </div>
        <img src={ProductInfrastructure} alt="Infrastructure" className="infra-image" />
        <div className="columns feature-row">
          <div className="column is-6 is-offset-3">
            <h3 className="article-subhead has-color-primary ">We focus on the infrastructure</h3>
            <p>
              Infura is powered by a cutting-edge microservice-driven architecture that dynamically scales to support
              our APIs. Developers can connect to Ethereum and IPFS via HTTPS and WebSocket, where request response
              times are up to 20 times faster than other services and self-hosted solutions. Our API suite always has
              the latest network updates and maintains service availability during all network changes,{' '}
              <a href="https://status.infura.io">see our uptime here</a>.
            </p>
          </div>
        </div>
        <div className="columns feature-row">
          <div className="column is-6">
            <img src={ProductUsers} alt="Users" />
          </div>
          <div className="column is-5 is-offset-1">
            <h3 className="article-subhead has-color-primary ">You focus on building</h3>
            <p>
              Our goal is providing the simplest, most reliable infrastructure. Using the Infura API suite lets you
              spend more time talking to your users and building what they need.
            </p>
          </div>
        </div>
        <div className="columns feature-row">
          <div className="column is-5">
            <h3 className="article-subhead has-color-primary ">Gain insight into your app</h3>
            <p>
              Our dashboard gives you direct insights into your app&#39;s performance and API usage. Use this to
              optimize and better understand your users. Drill down into specific request methods, most active usage
              times, and more.
            </p>
          </div>
          <div className="column is-6 is-offset-1">
            <img src={ProductInsight} alt="Insight" />
          </div>
        </div>
      </div>
    </section>
    <section className="section is-large has-bg-white">
      <div className="container">
        <div className="columns">
          <header className="column is-8 is-offset-2 section-header has-text-centered has-margin-bottom-small">
            <h2 className="section-header-title">Developers love Infura</h2>
            <p className="section-header-subhead">All the features, speed, and reliability your application needs.</p>
          </header>
        </div>

        <ul className="card-list features-grid-list">
          <li className="list-card has-text-centered">
            <span className="icon-circle has-margin-bottom-base has-bg-primary">
              <FontAwesomeIcon icon={['fal', 'code']} size="rg" />
            </span>
            <h3>Ethereum Interface</h3>
            <p>Supports mainnet and testnets via client-compatible JSON-RPC, over HTTPS and WSS.</p>
          </li>
          <li className="list-card has-text-centered">
            <div className="icon-circle has-margin-bottom-base">
              <FontAwesomeIcon icon={['fal', 'database']} size="rg" />
            </div>
            <h3>IPFS Interface</h3>
            <p>Supports the standard IPFS libraries for storing and retrieving data on the network.</p>
          </li>
          <li className="list-card has-text-centered">
            <span className="icon-circle has-margin-bottom-base has-bg-purple">
              <FontAwesomeIcon icon={['fal', 'rocket']} size="rg" />
            </span>
            <h3>Instant Availability</h3>
            <p>Connect your application with one line of code. No syncing, no complicated setups.</p>
          </li>
          <li className="list-card has-text-centered">
            <span className="icon-circle has-margin-bottom-base has-bg-blue">
              <FontAwesomeIcon icon={['fal', 'broadcast-tower']} size="rg" />
            </span>
            <h3>Always Online</h3>
            <p>Running on the latest network upgrades with a minimum 99.9% uptime guarantee.</p>
          </li>
          <li className="list-card has-text-centered">
            <div className="icon-circle has-margin-bottom-base has-bg-blue">
              <FontAwesomeIcon icon={['fal', 'chart-bar']} size="rg" />
            </div>
            <h3>Developer Dashboard</h3>
            <p>Configure, monitor, and analyze your applications with Infura.</p>
          </li>
          <li className="list-card has-text-centered">
            <span className="icon-circle has-margin-bottom-base has-bg-green">
              <FontAwesomeIcon icon={['fal', 'ticket-alt']} size="rg" />
            </span>
            <h3>Global Support</h3>
            <p>24/7 access to expert support teams and our community of experienced developers.</p>
          </li>
          <li className="list-card has-text-centered">
            <span className="icon-circle has-margin-bottom-base has-bg-red">
              <FontAwesomeIcon icon={['fal', 'archive']} size="rg" />
            </span>
            <h3>Archive Data</h3>
            <p>Access to the Ethereum Archive node data available to premium subscribers.</p>
          </li>
          <li className="list-card has-text-centered">
            <span className="icon-circle has-margin-bottom-base has-bg-black">
              <FontAwesomeIcon icon={['fal', 'wrench']} size="rg" />
            </span>
            <h3>More Coming Soon</h3>
            <p>
              We are adding features and upgrades all the time! <Link to="/contact">Let us know what you need</Link>.
            </p>
          </li>
          <hr className="divider-h-small" />
        </ul>

        <header className="section-header">
          <div className="columns">
            <div className="column is-8 is-offset-2 has-text-centered">
              <h2 className="header-title has-color-primary">Infura+ features</h2>
              <p className="header-subhead">
                All of our paid plans include the following to get your application ready to grow.
              </p>
            </div>
          </div>
        </header>
        <section className="columns">
          <div className="column is-4 has-text-centered">
            <span className="icon-circle has-bg-purple has-margin-bottom-base">
              <FontAwesomeIcon icon={['fal', 'ticket-alt']} />
            </span>
            <h3>Enhanced Support</h3>
            <p>We have experts around the globe ready to answer your questions on your time. We&#39;re here to help!</p>
          </div>
          <div className="column is-4 has-text-centered">
            <span className="icon-circle has-bg-green has-margin-bottom-base">
              <FontAwesomeIcon icon={['fal', 'sliders-v']} />
            </span>
            <h3>Adjustable Limits</h3>
            <p>
              We&#39;re here to help your app succeed. If your project grows and exceeds your daily requests,{' '}
              <Link to="/contact">we can work with you</Link> to build a new plan that fits your needs.
            </p>
          </div>
          <div className="column is-4 has-text-centered">
            <span className="icon-circle has-bg-primary has-color-white has-margin-bottom-base">
              <FontAwesomeIcon icon={['fal', 'file-signature']} className="icon-contract" />
            </span>
            <h3>Custom Plans</h3>
            <p>
              Want something more customized? We can help you select the right add-ons or build a plan that works for
              you.
            </p>
          </div>
        </section>

        <div className="has-text-centered has-margin-top-base">
          <a className="button is-floating" href="/pricing">
            Learn More About Our Plans
          </a>
        </div>
      </div>
    </section>
    <SignupCta />
  </Page>
);

export default PageProduct;
