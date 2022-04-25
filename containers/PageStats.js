import React, { PureComponent } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FeedbackForm from './FeedbackForm';
import Page from '../components/Page';
import TotalMethodCalls from '../components/stats/TotalMethodCalls';
import TopMethodCalls from '../components/stats/TopMethodCalls';
import TopMethodCallsBandwidth from '../components/stats/TopMethodCallsBandwidth';
import CallsTimeOfDay from '../components/stats/CallsTimeOfDay';
import BandwidthUsage from '../components/stats/BandwidthUsage';
import TotalBandwidth from '../components/stats/TotalBandwidth';
import statsQueries from '../components/stats/statsQueries';
import PageLoader from '../components/PageLoader';
import PageError from '../components/PageError';
import Select from '../components/Select';
import { API_URL } from '../constants';
import { logout as logoutAction } from '../actions/auth';

const parseProjectId = pathname => {
  const splitPathname = pathname.split('/stats/');
  if (splitPathname.length === 2 && splitPathname[1].length > 0) {
    return splitPathname[1];
  }
  return '';
};

class PageStats extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      data: null,
      error: null,
      queryDurationIdx: 2,
    };

    this.fetchQueries = this.fetchQueries.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);

    this.fetchQueries();
  }

  fetchQueries() {
    const { queryDurationIdx } = this.state;
    const {
      projects,
      history: {
        location: { pathname },
      },
    } = this.props;
    const selectedProjectId = parseProjectId(pathname);

    if (!this.state.fetching) {
      this.setState({
        fetching: true,
        data: null,
        fetchTime: new Date(),
      });
    }

    const user = { user_id: this.props.user.id };
    const publicKeys = selectedProjectId ? { public_key: [selectedProjectId] } : { public_key: Object.keys(projects) };

    const updatedQueries = statsQueries[queryDurationIdx].queries.map(query => ({
      ...query,
      for: { ...user, ...publicKeys },
    }));

    return fetch(`${API_URL}analytics`, {
      method: 'post',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ queries: updatedQueries }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          return this.setState({
            data: res.data,
            fetching: false,
            fetchTime: new Date(),
          });
        }
        return this.props.logout();
      })
      .catch(error => {
        this.setState({ error, fetching: false });
        this.props.logout();
      });
  }

  handleProjectChange(event) {
    this.props.history.push(`/stats/${event.target.value || ''}`);
    this.fetchQueries();
  }

  handleDurationChange(event) {
    this.setState({ queryDurationIdx: event.target.value }, this.fetchQueries);
  }

  render() {
    const { fetching, error, data, queryDurationIdx, fetchTime } = this.state;
    const {
      projects,
      history: {
        location: { pathname },
      },
    } = this.props;
    const selectedProjectId = parseProjectId(pathname);

    const periodType = statsQueries[queryDurationIdx].type;
    const period = statsQueries[queryDurationIdx].name;
    const projectName =
      selectedProjectId && Object.keys(projects).length > 0 ? projects[selectedProjectId].name : 'all projects';

    return (
      <Page>
        <FeedbackForm from="Stats" />
        <main className="site-content">
          <section className="section has-padding-bottom-app">
            <div className="container stats-content">
              <header className="columns">
                <div className="column is-one-quarter-tablet is-2-widescreen">
                  <div className="select-custom-wrapper">
                    <Select value={selectedProjectId || ''} onChange={this.handleProjectChange}>
                      <option value="">All Projects</option>
                      {projects &&
                        Object.keys(projects)
                          .sort((a, b) => projects[b].update - projects[a].update)
                          .map(key => (
                            <option key={key} value={projects[key].id}>
                              {projects[key].name}
                            </option>
                          ))}
                    </Select>
                    <FontAwesomeIcon icon={['fas', 'chevron-down']} />
                  </div>
                </div>
                <div className="column is-one-quarter-tablet is-2-widescreen">
                  <div className="select-custom-wrapper">
                    <Select value={queryDurationIdx} onChange={this.handleDurationChange}>
                      {statsQueries.map((duration, idx) => (
                        <option value={idx} key={duration.name} name="queryDurationIdx">
                          {duration.name}
                        </option>
                      ))}
                    </Select>
                    <FontAwesomeIcon icon={['fa', 'chevron-down']} />
                  </div>
                </div>
                <div className="column is-one-quarter-tablet is-2-widescreen stats-header-note">
                  All times are in UTC
                </div>

                {!fetching && !error && (
                  <React.Fragment>
                    <div className={['column', 'is-one-quarter-tablet', 'is-6-widescreen', 'stats-refresh'].join(' ')}>
                      <span className="stats-refresh-time">
                        Last refreshed&nbsp;
                        <TimeAgo date={fetchTime} minPeriod={60} />
                      </span>
                      <button onClick={this.fetchQueries} className="button is-text has-icon stats-refresh-button">
                        <FontAwesomeIcon icon={['fal', 'redo']} />
                        Refresh
                      </button>
                    </div>
                  </React.Fragment>
                )}
              </header>
              {fetching && <PageLoader />}

              {error && <PageError />}
              {!fetching && !error && (
                <React.Fragment>
                  <div className="columns" data-testid="stats-components">
                    <TotalMethodCalls
                      error={error}
                      data={data ? data.payload[0].result : []}
                      periodType={periodType}
                      period={period}
                      project={projectName}
                    />
                  </div>
                  <div className="columns">
                    <TopMethodCalls data={data ? data.payload[1].result : []} period={period} project={projectName} />
                    <TopMethodCallsBandwidth
                      error={error}
                      data={data ? data.payload[2].result : []}
                      period={period}
                      project={projectName}
                    />
                  </div>
                  <div className="columns is-multiline">
                    <CallsTimeOfDay
                      error={error}
                      data={data ? data.payload[3].result : []}
                      period={period}
                      project={projectName}
                    />
                    <BandwidthUsage
                      error={error}
                      data={data ? data.payload[4].result : []}
                      periodType={periodType}
                      period={period}
                      project={projectName}
                    />
                    <TotalBandwidth
                      error={error}
                      data={data ? data.payload[5].result : []}
                      periodType={periodType}
                      period={period}
                      project={projectName}
                    />
                  </div>
                </React.Fragment>
              )}
            </div>
          </section>
        </main>
      </Page>
    );
  }
}

// router "match" wasn't updating on history push, have to rely on parsing the
// history
PageStats.propTypes = {
  projects: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      update: PropTypes.number.isRequired,
    }),
  ).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default connect(
  state => ({
    projects: state.project.list,
    user: state.auth.user,
  }),
  {
    logout: logoutAction,
  },
)(PageStats);
