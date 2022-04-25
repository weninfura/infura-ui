import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResetPassForm from './ResetPassForm';
import { verifyToken as verifyTokenAction } from '../actions/auth';
import LogoStackedSvg from '../svgs/LogoStackedSvg';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';

class PageEmailLogin extends PureComponent {
  componentWillMount() {
    const {
      verifyToken,
      match: {
        params: { token },
      },
    } = this.props;

    verifyToken(token);
  }

  render() {
    const { fetching, verified, isForgotPass } = this.props;

    return (
      <div className="site-wrapper has-bg-primary has-no-nav">
        <section className="site-content has-bg-primary">
          <div className="container">
            <header className="section is-medium has-text-centered">
              <LogoStackedSvg />
            </header>
            <div className="section columns has-no-padding-top">
              <div className="column is-4 is-offset-4">
                {fetching && <PageLoader />}

                {verified && !isForgotPass && <Redirect to="/settings" />}

                {verified && isForgotPass && <ResetPassForm />}

                {!fetching && !verified && (
                  <section className="card has-floating-shadow">
                    <header className="auth-card-header">
                      <span className="icon-circle has-margin-bottom-small has-color-red">
                        <FontAwesomeIcon icon={['fal', 'comment']} />
                      </span>
                      <h1 className="auth-header-title has-color-red">Uh oh! Your link is broken.</h1>
                    </header>
                    <div className="card-main has-text-centered">
                      <p>
                        This is embarassing, and we&#39;re sorry for the inconvenience. Please contact support for help
                        and we&#39;ll get you squared away.
                      </p>
                      <div className="control has-text-centered form-submit">
                        <Link className="button is-large" to="/support/ticket">
                          Contact Support
                        </Link>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

PageEmailLogin.defaultProps = {
  isForgotPass: false,
};

PageEmailLogin.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  verified: PropTypes.bool.isRequired,
  isForgotPass: PropTypes.bool,
};

export default connect(
  state => ({
    fetching: state.auth.fetching,
    verified: state.auth.verified,
  }),
  {
    verifyToken: verifyTokenAction,
  },
)(PageEmailLogin);
