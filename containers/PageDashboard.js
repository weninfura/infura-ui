import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { get, size } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FeedbackForm from './FeedbackForm';
import Project from '../components/Project';
import Page from '../components/Page';
import UpgradeBanner from '../components/UpgradeBanner';
import OverageBanner from '../components/OverageBanner';
import DashResources from '../components/DashResources';
import DashRequestsToday from '../components/DashRequestsToday';
import DashRequestsTotal from '../components/DashRequestsTotal';
import PageLoader from '../components/PageLoader';
import { toggleModal as toggleModalAction, triggerFlashMessage as triggerFlashMessageAction } from '../actions/ui';
import getSubscriptionId from '../utils/getSubscriptionId';
import fetchRecentUsageAction from '../actions/dashboard';
import { getDayTotal } from '../utils/getProjectUtils';
import { getUserSubscriptionTier, getProjectEntitlements } from '../utils/userUtils';
import getOffering from '../utils/getProductOfferings';
import Onboarder from './Onboarder';

// TODO
// The code here thats around getting rate limits and various values around products
// would probably be better abstracted with a set of functions that actually do the
// calculations around the project data. The design problem embodied here and elsewhere in code base
// looks like the logic and data are scattered around various components and helper functions.
// A pass should be done to clean this up.

// Define paths and defaults.
const TIER_REQUEST_LIMIT_PATH = 'entitlements.req.attributes.threshold';
const DEFAULT_REQUEST_LIMIT = 100000;

class PageDashboard extends PureComponent {
  constructor(props) {
    super(props);

    const { subscriptionId } = props;
    const bannerIsClosed = Cookies.get('CLOSE_INFURA_PLUS_BANNER') === 'true';

    this.state = {
      bannerOpen: !subscriptionId && !bannerIsClosed,
    };

    this.closeInfuraPlusBanner = this.closeInfuraPlusBanner.bind(this);
  }

  componentDidMount() {
    const {
      triggerFlashMessage,
      user,
      location: { state },
    } = this.props;
    this.props.fetchRecentUsage(user.id, user.projects);
    if (state && state.submit) {
      triggerFlashMessage(state.submit.message, state.submit.status);
    }
  }

  closeInfuraPlusBanner() {
    Cookies.set('CLOSE_INFURA_PLUS_BANNER', true);
    return this.setState({ bannerOpen: false });
  }

  render() {
    const { projects, toggleModal, user, dashboard } = this.props;
    const { bannerOpen } = this.state;

    // TODO: Consider moving this to a util. See comment above.
    const requestLimit = get(
      getOffering(getUserSubscriptionTier(user)),
      TIER_REQUEST_LIMIT_PATH,
      DEFAULT_REQUEST_LIMIT,
    );

    if (!user) {
      return (
        <Page>
          <PageLoader />
        </Page>
      );
    }

    return (
      <Page>
        {!user.onboarded && <Onboarder />}

        <FeedbackForm from="Dashboard" />
        <main className="site-content">
          {bannerOpen && <UpgradeBanner user={user} closeBanner={this.closeInfuraPlusBanner} />}
          <section className="section has-padding-bottom-app">
            <div className="container">
              {dashboard.today.length > 0 && getDayTotal(dashboard.today[1]) > requestLimit && (
                <OverageBanner limit={requestLimit} />
              )}
              <div className="columns">
                <div className="column is-8">
                  <section className="project-section">
                    <header className="app-main-header is-flex-tablet">
                      <div className="app-header-left">
                        <h2 className="has-no-margin-bottom">Your Projects</h2>
                        <span className="project-number-count">
                          {getProjectEntitlements(user) - size(projects)} remaining
                        </span>
                      </div>
                      <div className="app-header-right">
                        <div className="onboarding-wrapper" id="onboarding-01">
                          <button
                            disabled={size(projects) >= getProjectEntitlements(user)}
                            className="button tour-step"
                            onClick={toggleModal}
                          >
                            Create New Project
                          </button>
                        </div>
                      </div>
                    </header>
                    {user.email && Object.keys(projects).length === 0 && (
                      <section className="card project-card">
                        <div className="card-main empty-ui-prompt">
                          <FontAwesomeIcon icon={['fal', 'project-diagram']} className="empty-ui-icon" size="2x" />
                          <h3 className="empty-ui-title">Get started by creating your first project</h3>
                          <span className="empty-ui-message">
                            Setup your project to generate your project ID, secret, and endpoints as well as to
                            whitelist contracts.
                          </span>
                        </div>
                      </section>
                    )}
                    <ul>
                      {projects &&
                        Object.keys(projects)
                          .sort((a, b) => projects[b].updated - projects[a].updated)
                          .map(key => (
                            <li key={key}>
                              <Project id={key} name={projects[key].name} created={projects[key].created} />
                            </li>
                          ))}
                    </ul>
                  </section>
                  <DashResources />
                </div>
                <div className="column is-4">
                  {dashboard.past_14.length > 1 && (
                    <DashRequestsToday usage={getDayTotal(dashboard.today[1])} limit={requestLimit} />
                  )}
                  <DashRequestsTotal userLimit={requestLimit} userProjects={user.projects} totals={dashboard.past_14} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </Page>
    );
  }
}

PageDashboard.defaultProps = {
  user: null,
};

const projectType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        projectId: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }),
    ),
  ]),
);

PageDashboard.propTypes = {
  subscriptionId: PropTypes.string.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    projects: PropTypes.shape({}),
    onboarded: PropTypes.bool.isRequired,
  }),
  projects: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
  fetchRecentUsage: PropTypes.func.isRequired,
  triggerFlashMessage: PropTypes.func.isRequired,
  dashboard: PropTypes.shape({
    prev_day: projectType,
    past_14: PropTypes.arrayOf(projectType),
    today: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      submit: PropTypes.shape({
        message: PropTypes.string,
        status: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default connect(
  state => ({
    subscriptionId: getSubscriptionId(state.auth.user),
    user: state.auth.user,
    projects: state.project.list,
    showModal: state.project.showModal,
    dashboard: state.dashboard,
  }),
  {
    toggleModal: () => toggleModalAction('ADD_PROJECT'),
    triggerFlashMessage: triggerFlashMessageAction,
    fetchRecentUsage: fetchRecentUsageAction,
  },
)(PageDashboard);
