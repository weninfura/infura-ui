import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Page from '../components/Page';
import SignupCta from '../components/SignupCta';
import { TEAM } from '../constants';

const renderTeamMember = ({ imgUrl, name, role }) => (
  <li className="list-card">
    <div className="card-inner">
      <div className="team-member-photo">
        <img src={imgUrl} alt={`${name} profile`} />
      </div>
      <div className="team-member-info">
        <span className="team-member-name">{name}</span>
        <span className="team-member-position">{role}</span>
      </div>
    </div>
  </li>
);

renderTeamMember.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

const PageAbout = () => (
  <Page>
    <header className="section is-large page-header">
      <div className="container">
        <div className="columns">
          <section className="column is-6 is-offset-3 has-text-centered">
            <h1 className="header-title">Our Mission</h1>
            <p className="header-subhead has-color-white">
              We strive to deliver the best infrastructure and tools for developers to build amazing Web 3.0
              applications.
            </p>
          </section>
        </div>
      </div>
    </header>
    <section className="section is-large">
      <div className="container">
        <div className="columns">
          <header className="column is-8 is-offset-2 section-header has-text-centered has-margin-bottom-small">
            <h2 className="section-header-title">Committed to Web 3.0</h2>
            <p className="section-header-subhead">
              We believe in the decentralized Internet and powering the developer community building it.
            </p>
          </header>
        </div>
        <div className="columns">
          <div className="column is-4 has-text-centered">
            <span className="icon-circle has-margin-bottom-base has-bg-black">
              <FontAwesomeIcon icon={['fal', 'users']} size="rg" />
            </span>
            <h3>Developers</h3>
            <p>
              Supporting developers is our number one goal. They have the power to propel this technology into
              mainstream and enterprise use cases that can change the way our world works.
            </p>
          </div>
          <div className="column is-4 has-text-centered">
            <span className="icon-circle has-margin-bottom-base has-bg-primary">
              <FontAwesomeIcon icon={['fal', 'cogs']} size="rg" />
            </span>
            <h3>Infrastructure</h3>
            <p>
              We love laying the foundation for decentralized applications all over the world. Our team is driven by
              innovation in high availability, scalable, and secure back end systems.
            </p>
          </div>
          <div className="column is-4 has-text-centered">
            <span className="icon-circle has-margin-bottom-base has-bg-secondary">
              <FontAwesomeIcon icon={['fal', 'trophy-alt']} size="rg" />
            </span>
            <h3>Our Promise</h3>
            <p>
              We are dedicated to our users and to conducting our business honestly. We vow to provide the best service
              to our users at the best price possible. Please reach out to us anytime if you are dissatisfied with our
              service.
            </p>
          </div>
        </div>
        <div className="has-text-centered has-margin-top-base">
          <a href="/product" className="button is-floating">
            Learn more about our product
          </a>
        </div>
      </div>
    </section>
    <section className="section is-large has-bg-white">
      <div className="container">
        <div className="columns">
          <header className="column is-8 section-header has-margin-bottom-small">
            <h2 className="section-header-title">Made with Love All Over the World</h2>
            <p className="section-header-subhead">
              Infura is built by a global, passionate team. Together, we strive to deliver the best infrastructure and
              tools to empower developers and to help them build the best decentralized applications.
            </p>
          </header>
        </div>
        <ul className="card-list">{TEAM.map(member => renderTeamMember(member))}</ul>
      </div>
    </section>

    <SignupCta />
  </Page>
);

export default PageAbout;
