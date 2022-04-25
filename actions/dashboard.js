import fetch from 'isomorphic-fetch';
import { keys } from 'lodash';
import { API_URL } from '../constants';

export default function fetchRecentUsage(user, projects) {
  const projectKeys = keys(projects);
  const queries = projectKeys.map(item => ({
    query: 'timeseries',
    datapoint: 'count',
    time: { from: '14d', tick: 'd' },
    for: { user_id: user, public_key: [item] },
  }));

  return dispatch => {
    fetch(`${API_URL}analytics`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queries }),
    })
      .then(async result => {
        const unwrappedResult = await result.json();
        dispatch({
          type: 'SUCCESS_USAGE',
          data: unwrappedResult.data,
          projects,
        });
      })
      .catch(err => {
        dispatch({
          type: 'FAIL_USAGE',
          data: err,
        });
      });
  };
}
