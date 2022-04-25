import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectForm from './ProjectForm';
import ProjectRequireSecretForm from './ProjectRequireSecretForm';
import ProjectWhitelistForm from './ProjectWhitelistForm';
import SecurityWhitelistItem from './SecurityWhitelistItem';
import Onboarder from './Onboarder';
import Page from '../components/Page';
import PageLoader from '../components/PageLoader';
import Select from '../components/Select';
import { triggerFlashMessage as triggerFlashMessageAction, toggleModal as toggleModalAction } from '../actions/ui';

class PageProjectMgmt extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { network: 'mainnet' };
    this.handleChange = this.handleChange.bind(this);
    this.triggerCopyMessage = this.triggerCopyMessage.bind(this);
    this.toggleDeleteProjectModal = this.toggleDeleteProjectModal.bind(this);
  }

  handleChange(event) {
    this.setState({ network: event.target.value });
  }

  triggerCopyMessage() {
    const { triggerFlashMessage } = this.props;

    triggerFlashMessage('Copied to Clipboard', 'standard');
  }

  toggleDeleteProjectModal() {
    const {
      toggleModal,
      project: { id },
    } = this.props;

    toggleModal('DELETE_PROJECT', id);
  }

  render() {
    const { user, project } = this.props;
    const { network } = this.state;
    const networkURL = `${network}.infura.io/v3/${project.id}`;

    if (!('id' in project)) {
      return <Redirect to="/dashboard" />;
    }

    const addresses = 'addresses' in project ? project.addresses : [];
    const userAgents = 'user_agents' in project ? project.user_agents : [];
    const origins = 'origins' in project ? project.origins : [];

    return (
      <Page>
        {user ? (
          <main className="site-content">
            {!user.onboarded && <Onboarder />}
            <section className="section has-padding-bottom-app">
              <div className="container">
                <div className="columns">
                  <section className="column is-10 is-offset-1 is-8-widescreen is-offset-2-widescreen">
                    <section className="card has-floating-header">
                      <header className="card-header">
                        <h2 className="card-title">Edit Project</h2>
                      </header>
                      <section className="card-main">
                        <ProjectForm type="EDIT" projectid={project.id} display />
                      </section>
                    </section>

                    <section className="card has-floating-header">
                      <header className="card-header">
                        <h2 className="card-title">Keys</h2>
                      </header>
                      <section className="card-main" id="onboarding-02">
                        <div className="columns is-desktop">
                          <div className="column is-wrapped">
                            <span className="text-label">Project ID</span>
                            <span className="project-cred">
                              {project.id}
                              <CopyToClipboard text={project.id} onCopy={this.triggerCopyMessage}>
                                <button className="clipboard-copy">
                                  <FontAwesomeIcon icon={['fal', 'clipboard']} />
                                </button>
                              </CopyToClipboard>
                            </span>
                          </div>
                          <div className="column is-wrapped">
                            <span className="text-label">
                              Project Secret
                              <div className="info-tooltip is-hidden-mobile">
                                <FontAwesomeIcon icon={['fal', 'info-circle']} />
                                <div className="tooltip is-right">
                                  Keep your project secret hidden.
                                  <br />
                                  This should never be human-readable in your application.
                                </div>
                              </div>
                            </span>
                            <span className="project-cred">
                              {project.private}
                              <CopyToClipboard text={project.private} onCopy={this.triggerCopyMessage}>
                                <button className="clipboard-copy">
                                  <FontAwesomeIcon icon={['fal', 'clipboard']} />
                                </button>
                              </CopyToClipboard>
                            </span>
                          </div>
                        </div>
                        <div className="project-endpoint is-wrapped">
                          <span className="text-label has-endpoint-select">
                            Endpoint
                            <div className="select-custom-wrapper is-small endpoint-select">
                              <Select value={network} onChange={this.handleChange}>
                                <option value="mainnet">Mainnet</option>
                                <option value="ropsten">Ropsten</option>
                                <option value="kovan">Kovan</option>
                                <option value="rinkeby">Rinkeby</option>
                                <option value="goerli">Görli</option>
                              </Select>
                              <FontAwesomeIcon icon={['fas', 'chevron-down']} />
                            </div>
                          </span>
                          <span className="project-cred">
                            {networkURL}
                            <CopyToClipboard text={networkURL} onCopy={this.triggerCopyMessage}>
                              <button className="clipboard-copy">
                                <FontAwesomeIcon icon={['fal', 'clipboard']} />
                              </button>
                            </CopyToClipboard>
                          </span>
                        </div>
                      </section>
                    </section>

                    <section className="card has-floating-header">
                      <header className="card-header">
                        <h2 className="card-title">Security</h2>
                      </header>
                      <section className="card-main" id="onboarding-03">
                        <header className="card-desc-header">
                          <p>
                            Ensure the integrity of your requests by adding an extra layer of security with ethereum
                            address, user-agent, and HTTP Origin header whitelists.{' '}
                            <a href="/docs">Read more about API security.</a>
                          </p>
                        </header>

                        <ProjectRequireSecretForm project={project} />

                        <div className="project-security-field">
                          <span className="text-label is-black">
                            Whitelist Contract Addresses
                            <div className="info-tooltip is-hidden-mobile">
                              <FontAwesomeIcon icon={['fal', 'info-circle']} />
                              <div className="tooltip is-right">
                                Ensure that your Infura key is only used to interact with approved addresses.
                              </div>
                            </div>
                          </span>
                          <ProjectWhitelistForm securityType="addresses" securityCopy="Address" project={project} />
                          {addresses.length > 0 && (
                            <React.Fragment>
                              {addresses.map(address => (
                                <SecurityWhitelistItem
                                  item={address}
                                  projectid={project.id}
                                  key={address}
                                  type="addresses"
                                />
                              ))}
                            </React.Fragment>
                          )}
                        </div>

                        <div className="project-security-field">
                          <span className="text-label is-black">
                            Whitelist User Agents
                            <div className="info-tooltip is-hidden-mobile">
                              <FontAwesomeIcon icon={['fal', 'info-circle']} />
                              <div className="tooltip is-right">
                                Protect the integrity of your request traffic by adding your known user-agents which
                                will be using this key (i.e. your mobile app’s custom user-agent). A request will be
                                allowed if its User-Agent matches any substring whitelisted here.
                              </div>
                            </div>
                          </span>
                          <ProjectWhitelistForm
                            securityType="user_agents"
                            securityCopy="User Agents"
                            project={project}
                          />
                          {userAgents.length > 0 && (
                            <React.Fragment>
                              {userAgents.map(agent => (
                                <SecurityWhitelistItem
                                  item={agent}
                                  projectid={project.id}
                                  key={agent}
                                  type="user_agents"
                                />
                              ))}
                            </React.Fragment>
                          )}
                        </div>

                        <div className="project-security-field">
                          <span className="text-label is-black">
                            Whitelist Origins
                            <div className="info-tooltip is-hidden-mobile">
                              <FontAwesomeIcon icon={['fal', 'info-circle']} />
                              <div className="tooltip is-right">
                                Protect the integrity of your requests by adding known HTTP Origin headers from where
                                your key will be sending API requests. (e.g. mydapp.example.com)
                              </div>
                            </div>
                          </span>
                          <ProjectWhitelistForm securityType="origins" securityCopy="Origins" project={project} />
                          {origins.length > 0 && (
                            <React.Fragment>
                              {origins.map(origin => (
                                <SecurityWhitelistItem
                                  item={origin}
                                  projectid={project.id}
                                  key={origin}
                                  type="origins"
                                />
                              ))}
                            </React.Fragment>
                          )}
                        </div>
                      </section>
                    </section>

                    <section className="card has-floating-header card-delete-project">
                      <header className="card-header">
                        <h2 className="card-title">Delete Project</h2>
                      </header>
                      <section className="card-main">
                        <div className="columns is-desktop columns-delete-project">
                          <div className="column is-two-thirds-tablet is-three-quarters-widescreen">
                            <span>
                              Any applications using this project’s keys will no longer be able to access the Infura
                              API. This can not be undone.
                            </span>
                          </div>
                          <div className="column is-one-thirds-tablet is-one-quarter-widescreen">
                            <button
                              className="button is-danger button-delete-project"
                              onClick={this.toggleDeleteProjectModal}
                            >
                              Delete Project
                            </button>
                          </div>
                        </div>
                      </section>
                    </section>
                  </section>
                </div>
              </div>
            </section>
          </main>
        ) : (
          <PageLoader />
        )}
      </Page>
    );
  }
}

PageProjectMgmt.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    onboarded: PropTypes.bool.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
  triggerFlashMessage: PropTypes.func.isRequired,
  project: PropTypes.shape({
    addresses: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
    origins: PropTypes.arrayOf(PropTypes.string).isRequired,
    private: PropTypes.string.isRequired,
    user_agents: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default connect(
  (state, props) => ({
    authError: state.auth.authError,
    project: state.project.list[props.match.params.projectId] || {},
    user: state.auth.user,
  }),
  {
    toggleModal: toggleModalAction,
    triggerFlashMessage: triggerFlashMessageAction,
  },
)(PageProjectMgmt);
