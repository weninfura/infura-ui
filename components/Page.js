import React from 'react';
import PropTypes from 'prop-types';
import Header from '../containers/Header';
import Footer from './Footer';

const Page = ({ children }) => (
  <div className="site-wrapper">
    <Header />
    {children}
    <Footer />
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
