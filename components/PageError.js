import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PageLoader = () => (
  <div className="site-content page-loading">
    <section className="loading-content empty-ui-prompt has-color-red">
      <FontAwesomeIcon icon={['fal', 'frown']} className="empty-ui-icon has-color-red" size="2x" />

      <h1 className="empty-ui-title has-color-red">Unable to load data</h1>
      <p className="empty-ui-message">
        Looks like we don’t have any data for that selection.
        <br />
        Try a different one above.
      </p>
    </section>
  </div>
);

export default PageLoader;
