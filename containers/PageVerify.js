import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Redirect } from 'react-router-dom';
import { verifyToken as verifyTokenAction } from '../actions/auth';
import Page from '../components/Page';
import LogoStackedSvg from '../svgs/LogoStackedSvg';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';

class PageVerify extends PureComponent {
  // TODO: Looks like showCard states are no longer used. Consider removing them.
  constructor(props) {
    super(props);

    this.state = {
      showCardInput: false,
    };

    this.toggleShowCardInput = this.toggleShowCardInput.bind(this);
  }

  componentWillMount() {
    const {
      verifyToken,
      match: {
        params: { token },
      },
    } = this.props;

    verifyToken(token);
  }

  toggleShowCardInput() {
    this.setState({
      showCardInput: !this.state.showCardInput,
    });
  }

  render() {
    const { fetching, verified, user } = this.props;
    console.log('VERIFY', user);

    return (
      <div>
        {fetching && (
          <Page>
            <PageLoader />
          </Page>
        )}

        {verified && !user.onboarded && <Redirect to="/payment?newUser=true" />}

        {verified && user.onboarded && <Redirect to="/dashboard" />}

        {!fetching && !verified && (
          <div className="site-wrapper has-bg-primary has-no-nav">
            <main className="site-content has-bg-primary">
              <div className="container">
                <header className="section is-medium has-text-centered">
                  <LogoStackedSvg />
                </header>
                <section className="section has-padding-bottom-app has-no-padding-top">
                  <div className="columns">
                    <div className="column is-4 is-offset-4">
                      <section className="card has-floating-shadow">
                        <header className="auth-card-header">
                          <span className="icon-circle has-bg-red has-margin-bottom-small">
                            <FontAwesomeIcon icon={['fal', 'frown']} />
                          </span>
                          <h1 className="auth-header-title has-color-red">Uh oh! Your link is broken.</h1>
                        </header>
                        <div className="card-main has-text-centered">
                          <p>
                            This is embarassing, and we&#39;re sorry for the inconvenience. Please contact support for
                            help and we&#39;ll get you squared away.
                          </p>
                          <Link className="button" to="/contact">
                            Contact Support
                          </Link>
                        </div>
                      </section>
                    </div>
                  </div>
                </section>
              </div>
            </main>
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

PageVerify.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  verified: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    fetching: state.auth.verifyFetching,
    verified: state.auth.verified,
    user: state.auth.user,
  }),
  {
    verifyToken: verifyTokenAction,
  },
)(PageVerify);
