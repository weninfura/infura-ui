import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageLoader from '../components/PageLoader';
import Page from '../components/Page';
import Header from '../containers/Header';
import DocumentationDirectory from './DocumentationDirectory';
import DocumentationFile from './DocumentationFile';
import banner from '../utils/getBanner';

// returns array
const traverse = ([first, ...rest], docs) => {
  if (!first) {
    const readme = docs.find(doc => doc.name === 'README');

    return 'content' in readme ? [readme] : [];
  }

  const treeItem = docs.find(el => el.name === first);

  // TODO if treeItem is undefined, url is incorrect, redirect to /docs?

  if ('content' in treeItem && treeItem.content instanceof Array) {
    // there's nothing else in the url, so pass the first bit of content in the array
    if (rest.length === 1) return treeItem.content;

    return traverse(rest, treeItem.content);
  }

  return treeItem;
};

const getContent = (path, pathname, obj) => {
  const restOfPath = pathname.split(path)[1];
  const pathArray = restOfPath.split('/').filter(item => item !== '');

  return traverse(pathArray, obj);
};

class PageDocumentation extends PureComponent {
  constructor() {
    super();

    this.state = {
      docs: null,
    };

    this.scrollToSection = this.scrollToSection.bind(this);
    this.fetchDocs = this.fetchDocs.bind(this);
  }

  componentWillMount() {
    this.fetchDocs();
  }

  componentDidUpdate() {
    this.scrollToSection();
  }

  fetchDocs() {
    const bundle = window.location.host.includes('infura.io') ? 'bundle.json' : 'bundleDev.json';

    fetch(`https://s3.amazonaws.com/infura-docs/${bundle}`, {
      method: 'get',
      headers: { Accept: 'application/json' },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ docs: res });
        this.scrollToSection(10);
      })
      .catch(err => {
        console.log('error', err);
      });
  }

  scrollToSection(delay = 0) {
    const pathParts = this.props.location.pathname.split('/');
    const last = pathParts[pathParts.length - 1];

    const pageEl = document.getElementById(last);

    if (pageEl) {
      // TODO timeout ... gross
      setTimeout(() => {
        pageEl.scrollIntoView(true);

        // TODO fix this scroll issues, scroll should be happening in the page
        // not on the entire html element
        document.documentElement.scrollTop -= 100;
      }, delay);
    }
  }

  render() {
    const { docs } = this.state;
    const { isAuthenticated } = this.props;

    const hasBannerInfo = banner.length > 0;
    const displayBanner = !isAuthenticated && hasBannerInfo;

    if (!docs) {
      return (
        <Page>
          <PageLoader />
        </Page>
      );
    }

    const directory = getContent(this.props.match.path, this.props.location.pathname, docs);

    return (
      <div className={`site-wrapper ${displayBanner ? 'has-banner-message' : ''}`}>
        <Header />
        <main className="site-content is-flex">
          <section className="docs-section">
            <aside className="docs-aside">
              <DocumentationDirectory contents={docs} path="/docs/" />
            </aside>
            <section className="docs-content">
              <div className="docs-markdown">
                {directory.map(page => {
                  if (typeof page.content === 'string') {
                    return <DocumentationFile name={page.name} content={page.content} url={page.url} key={page.name} />;
                  }
                  return null;
                })}
              </div>

              <section className="docs-resources">
                <h3>Other Resources</h3>
                <div className="docs-resources-cards columns">
                  <div className="column is-4">
                    <a className="card-resource has-padding-top-l has-bg-primary" href="https://community.infura.io">
                      <div className="card-resource-content">
                        <FontAwesomeIcon icon={['fab', 'discourse']} size="3x" className="card-resource-icon" />
                        <span className="text-label has-color-white has-no-margin-bottom">Community</span>
                        <div className="card-resource-cta">
                          <span>Ask experts your questions</span>
                          <FontAwesomeIcon icon={['fal', 'arrow-right']} size="lg" />
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="column is-4">
                    <a className="card-resource has-padding-top-l has-bg-secondary" href="https://status.infura.io">
                      <div className="card-resource-content">
                        <FontAwesomeIcon icon={['fal', 'tachometer']} size="3x" className="card-resource-icon" />
                        <span className="text-label has-color-white has-no-margin-bottom">Status</span>
                        <div className="card-resource-cta">
                          <span>View our current status</span>
                          <FontAwesomeIcon icon={['fal', 'arrow-right']} size="lg" />
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="column is-4">
                    <a className="card-resource has-padding-top-l has-bg-black" href="https://blog.infura.io">
                      <div className="card-resource-content">
                        <FontAwesomeIcon icon={['fab', 'medium']} size="3x" className="card-resource-icon" />
                        <span className="text-label has-color-white has-no-margin-bottom">Blog</span>
                        <div className="card-resource-cta">
                          <span>Stay up-to-date with Infura</span>
                          <FontAwesomeIcon icon={['fal', 'arrow-right']} size="lg" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </section>
            </section>
          </section>
        </main>
      </div>
    );
  }
}

PageDocumentation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  state => ({ isAuthenticated: !!state.auth.userid }),
  {},
)(PageDocumentation);
