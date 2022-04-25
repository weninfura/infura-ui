import React from 'react';
import LoaderSvg from '../svgs/LoaderSvg';

const PageLoader = () => (
  <div className="site-content page-loading">
    <section className="loading-content">
      <LoaderSvg/>
      <h1 className="loading-message">
        Loading...
      </h1>
    </section>
  </div>
);

export default PageLoader;
