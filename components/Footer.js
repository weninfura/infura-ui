import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => (
  <footer className="footer has-color-white">
    <div className="container">
      <div className="columns">
        <ul className="column is-2 footer-nav">
          <li className="footer-nav-title">Product</li>
          <li>
            <Link className="footer-nav-link" to="/product">
              Why Infura
            </Link>
          </li>
          <li>
            <Link className="footer-nav-link" to="/about">
              Mission
            </Link>
          </li>
          <li>
            <Link className="footer-nav-link" to="/pricing">
              Pricing
            </Link>
          </li>
        </ul>
        <ul className="column is-2 footer-nav">
          <li className="footer-nav-title">Resources</li>
          <li>
            <Link className="footer-nav-link" to="/docs">
              Documentation
            </Link>
          </li>
          <li>
            <a className="footer-nav-link" href="https://community.infura.io">
              Community
            </a>
          </li>
          <li>
            <a className="footer-nav-link" href="https://community.infura.io/c/help">
              Help
            </a>
          </li>
          <li>
            <a className="footer-nav-link" href="https://status.infura.io/">
              Status
            </a>
          </li>
        </ul>
        <ul className="column is-2 footer-nav">
          <li className="footer-nav-title">Company</li>
          <li>
            <a className="footer-nav-link" href="https://blog.infura.io">
              Blog
            </a>
          </li>
          <li>
            <a className="footer-nav-link" href="https://consensys.net/open-roles/?discipline=32536">
              Careers
            </a>
          </li>
          <li>
            <Link className="footer-nav-link" to="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className="footer-nav-link" to="/presskit">
              Press Kit
            </Link>
          </li>
        </ul>
        <div className="column is-4 is-offset-2 footer-newsletter">
          <span className="footer-nav-title">The Infura Newsletter</span>
          <p>Stay up-to-date with Infura happenings, community resources, and more.</p>
          <a className="button is-ghost-dark" href="http://eepurl.com/ccywhv">
            Check It Out
            <FontAwesomeIcon icon={['fal', 'arrow-right']} />
          </a>
        </div>
      </div>
      <hr className="footer-break" />
      <div className="columns">
        <span className="column is-2 footer-copyright">&copy; {new Date().getFullYear()} Infura Inc</span>
        <ul className="column is-2 footer-nav-social">
          <li className="social-item">
            <a href="https://twitter.com/infura_io">
              <FontAwesomeIcon icon={['fab', 'twitter']} size="lg" />
            </a>
          </li>
          <li className="social-item">
            <a href="https://github.com/INFURA">
              <FontAwesomeIcon icon={['fab', 'github']} size="lg" />
            </a>
          </li>
        </ul>
        <div className="column is-2 is-offset-6 footer-nav footer-nav-legal">
          <Link className="footer-nav-link" to="/terms">
            Terms
          </Link>
          &nbsp;&nbsp;
          <Link className="footer-nav-link" to="/privacy">
            Privacy
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
