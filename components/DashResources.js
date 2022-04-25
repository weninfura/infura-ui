import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashResources = () => (
  <section className="card has-floating-header">
    <header className="card-header">
      <h2 className="card-title">Resources</h2>
    </header>
    <section className="card-main">
      <div className="columns">
        <Link className="column resource-link" to="/docs">
          <FontAwesomeIcon icon={['fal', 'books']} size="2x" />
          Docs
        </Link>
        <a className="column resource-link" href="https://status.infura.io/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={['fal', 'heartbeat']} size="2x" />
          Status
        </a>
        <a
          className="column resource-link"
          href="https://community.infura.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={['fal', 'comments']} size="2x" />
          Community
        </a>
        <Link className="column resource-link" to="/support/ticket">
          <FontAwesomeIcon icon={['fal', 'question']} size="2x" />
          Support
        </Link>
      </div>
    </section>
  </section>
);

export default DashResources;
