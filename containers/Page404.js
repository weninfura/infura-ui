import React from 'react';
import { Link } from 'react-router-dom';
import FourOhFour from '../images/404.png';
import Page from '../components/Page';

const Page404 = () => (
  <Page>
    <div className="site-wrapper has-bg-primary">
      <div className="container fourohfour-wrapper">
        <section className="section">
          <div className="columns">
            <div className="column is-8 is-offset-2 fourohfour-content">
              <img src={FourOhFour} alt="404" />
              <h1 className="fourohfour-headline">Uh oh! Unfortunately that page wasn’t found.</h1>
              <p className="fourohfour-message">
                Try visiting our <Link to="/">homepage</Link>. If you think this is a bigger issue{' '}
                <Link to="contact">reach out</Link>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Page>
);

export default Page404;
