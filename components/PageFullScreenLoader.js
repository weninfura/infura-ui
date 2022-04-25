import React from 'react';
import LoaderSvg from '../svgs/LoaderSvg';

const PageFullScreenLoader = () => (
  <div className="site-wrapper has-no-nav">
    <div className="site-content page-loading">
      <section className="loading-content">
        <LoaderSvg />
        <h1 className="loading-message">Loading...</h1>
      </section>
    </div>
  </div>
);

export default PageFullScreenLoader;
