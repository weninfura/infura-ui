import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NoData = () => (
  <section className="empty-ui-prompt">
    <FontAwesomeIcon icon={['fal', 'frown']} className="empty-ui-icon has-color-red" size="3x" />

    <h1 className="empty-ui-title has-color-red">Data Not Available</h1>
    <p className="empty-ui-message">
      Looks like we don’t have any data for that selection.
      <br />
      Try a different one above.
    </p>
  </section>
);

export default NoData;
