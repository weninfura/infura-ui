import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get, isEmpty } from 'lodash';
import queryString from 'query-string';
import LogoSvg from '../svgs/LogoSvg';
import WordTypeSvg from '../svgs/WordTypeSvg';
import { logout as logoutAction } from '../actions/auth';
import banner from '../utils/getBanner';
import { userIsSubscribed } from '../selectors/user';

class Header extends PureComponent {
  constructor() {
    super();

    this.state = {
      dashVisible: false,
    };

    this.toggleDash = this.toggleDash.bind(this);
  }

  toggleDash() {
    this.setState({
      dashVisible: !this.state.dashVisible,
    });
  }

  render() {
    const { dashVisible } = this.state;
    const { isAuthenticated, isSubscribed, logout, user } = this.props;
    const hasBannerInfo = banner.length > 0;
    const displayBanner = !isAuthenticated && hasBannerInfo;
    const hasProjects = !isEmpty(get(user, 'projects', {}));
    const { newUser } = queryString.parse(location.search); // eslint-disable-line no-restricted-globals

    return (
      <div className={`header-wrapper ${displayBanner ? 'has-banner-message' : ''}`}>
        {displayBanner && (
          <div className="banner-message">
            {banner[0].fields.copy}
            <a href={banner[0].fields.link} target="_blank" rel="noopener noreferrer">
              Read more about it
            </a>
          </div>
        )}

        <header
          className={`navbar is-fixed-top ${isAuthenticated ? 'has-dark-shadow' : ''}`}
          role="navigation"
          aria-label="main navigation"
          data-testid={isAuthenticated ? 'header-auth' : 'header-unauth'}
        >
          {/* LEFT */}
          <nav className="infura-nav-left has-text-left">
            <NavLink to="/" exact>
              <LogoSvg />
            </NavLink>
            <span
              className={`nav-mobile-icon is-hidden-desktop ${isAuthenticated ? 'is-hidden' : ''}`}
              onClick={this.toggleDash}
              onKeyDown={this.toggleDash}
              role="button"
              tabIndex={dashVisible ? -1 : 0}
            >
              <FontAwesomeIcon icon={['far', 'bars']} />
            </span>
            <ul className={`nav-list is-nav-main ${dashVisible ? 'is-visible' : ''}`}>
              {isAuthenticated ? (
                <React.Fragment>
                  {!newUser && (
                    <li className="nav-list-item">
                      <NavLink
                        to="/dashboard"
                        className="nav-list-link"
                        activeClassName="nav-selected"
                        data-testid="dashboard-nav"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  )}
                  {hasProjects && (
                    <li className="nav-list-item">
                      <NavLink to="/stats" className="nav-list-link" activeClassName="nav-selected">
                        Stats
                      </NavLink>
                    </li>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="nav-list-item">
                    <NavLink to="/product" className="nav-list-link" activeClassName="nav-selected">
                      Product
                    </NavLink>
                  </li>
                  <li className="nav-list-item">
                    <NavLink to="/about" className="nav-list-link" activeClassName="nav-selected">
                      Mission
                    </NavLink>
                  </li>
                  <li className="nav-list-item dropdown-nav-wrapper support-nav-wrapper is-hidden-touch">
                    <span className="nav-list-link">
                      Resources
                      <FontAwesomeIcon icon={['far', 'angle-down']} size="lg" className="has-margin-left" />
                    </span>
                    <ul className="dropdown-nav-list">
                      <li>
                        <NavLink to="/docs" className="dropdown-nav-link">
                          Documentation
                        </NavLink>
                      </li>
                      <li>
                        <a href="https://community.infura.io/" className="dropdown-nav-link">
                          Community
                        </a>
                      </li>
                      <li>
                        <a href="https://status.infura.io/" className="dropdown-nav-link">
                          Status
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-list-item">
                    <NavLink to="/pricing" className="nav-list-link" activeClassName="nav-selected">
                      Pricing
                    </NavLink>
                  </li>
                  <li className="nav-list-item is-hidden-desktop">
                    <NavLink to="/login" className="nav-list-link">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-list-item is-hidden-desktop">
                    <NavLink to="/register" className="nav-list-link">
                      Sign Up
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>

          {/* MIDDLE */}
          <div className="infura-nav-middle has-text-centered is-hidden-mobile">
            <WordTypeSvg />
          </div>

          {/* RIGHT */}
          <div className="infura-nav-right">
            {isAuthenticated ? (
              /* authenticated right */ <React.Fragment>
                {isSubscribed ? (
                  <div className="infura-account-level">Infura+</div>
                ) : (
                  <NavLink to="/upgrade" className="button is-secondary is-small">
                    Upgrade
                  </NavLink>
                )}
                <nav className="product-nav dropdown-nav-wrapper">
                  <span className="product-nav-trigger">
                    <FontAwesomeIcon icon={['far', 'bars']} />
                  </span>
                  <ul className="dropdown-nav-list is-right">
                    <li className="is-hidden-desktop">
                      <NavLink to="/dashboard" className="dropdown-nav-link">
                        <span className="dropdown-nav-icon">
                          <FontAwesomeIcon icon={['fal', 'columns']} size="lg" />
                        </span>
                        Dashboard
                      </NavLink>
                    </li>
                    {hasProjects && (
                      <li className="is-hidden-desktop">
                        <NavLink to="/stats" className="dropdown-nav-link">
                          <span className="dropdown-nav-icon">
                            <FontAwesomeIcon icon={['fal', 'chart-line']} size="lg" />
                          </span>
                          Stats
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <NavLink to="/docs" className="dropdown-nav-link">
                        <span className="dropdown-nav-icon">
                          <FontAwesomeIcon icon={['fal', 'file-alt']} size="lg" />
                        </span>
                        Documentation
                      </NavLink>
                    </li>
                    <li>
                      <a href="https://community.infura.io" className="dropdown-nav-link">
                        <span className="dropdown-nav-icon">
                          <FontAwesomeIcon icon={['fab', 'discourse']} size="lg" />
                        </span>
                        Community
                      </a>
                    </li>
                    <li>
                      <a href="https://status.infura.io/" className="dropdown-nav-link">
                        <span className="dropdown-nav-icon">
                          <FontAwesomeIcon icon={['fal', 'tachometer']} size="lg" />
                        </span>
                        Status
                      </a>
                    </li>
                    <li>
                      <NavLink to="/support/ticket" className="dropdown-nav-link">
                        <span className="dropdown-nav-icon">
                          <FontAwesomeIcon icon={['fal', 'envelope']} size="lg" />
                        </span>
                        Support
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <nav className="product-nav dropdown-nav-wrapper">
                  <div className="product-nav-trigger">
                    <span className="user-nav-icon">
                      <FontAwesomeIcon icon={['fal', 'user']} size="lg" data-testid="header-user-icon" />
                    </span>
                  </div>
                  <ul className="dropdown-nav-list is-right">
                    <li>
                      <NavLink to="/settings/account" className="dropdown-nav-link">
                        <span className="dropdown-nav-icon">
                          <FontAwesomeIcon icon={['fal', 'cog']} size="lg" />
                        </span>
                        Settings
                      </NavLink>
                    </li>
                    <li>
                      <div
                        className="dropdown-nav-link"
                        onClick={logout}
                        onKeyDown={logout}
                        role="button"
                        tabIndex={0}
                        data-testid="logout-action"
                      >
                        <span className="dropdown-nav-icon">
                          <FontAwesomeIcon icon={['fal', 'sign-out']} size="lg" />
                        </span>
                        Log out
                      </div>
                    </li>
                  </ul>
                </nav>
              </React.Fragment>
            ) : (
              /* not authenticated right */ <ul className="nav-list-auth is-hidden-touch">
                <li className="nav-list-item">
                  <NavLink to="/login" className="nav-auth-link is-link-secondary">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="button is-secondary is-small">
                    Sign Up
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </header>
      </div>
    );
  }
}

Header.defaultProps = {
  user: {},
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    projects: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
      }),
    ),
  }),
  isSubscribed: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    isAuthenticated: !!state.auth.userid,
    isSubscribed: userIsSubscribed(state),
    user: state.auth.user,
  }),
  { logout: logoutAction },
)(Header);
