import fetch from 'isomorphic-fetch';
import { logout, getCurrentUser } from './auth';
import { triggerFlashMessage } from './ui';
import { API_URL } from '../constants';

const PROJECT_URL = `${API_URL}project/`;

export function addProject(project) {
  return {
    type: 'ADD_PROJECT',
    project,
  };
}

export function createProject(values, clearForm) {
  return dispatch => {
    dispatch({ type: 'CREATE_PROJECT_ATTEMPT' });

    return fetch(PROJECT_URL, {
      method: 'post',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(res => {
        clearForm();
        if (res.status) {
          dispatch(triggerFlashMessage('Project Created', 'success'));
          dispatch(getCurrentUser());
          return dispatch(addProject(res.data.project));
        }

        dispatch({ type: 'CREATE_PROJECT_FAIL' });
        return dispatch(logout());
      })
      .catch(() => {
        clearForm();
        dispatch({ type: 'CREATE_PROJECT_FAIL' });
        dispatch(logout());
      });
  };
}

export function addProjectList(projects) {
  return {
    type: 'ADD_PROJECT_LIST',
    projects,
  };
}

export function updateProject(project) {
  return {
    type: 'UPDATE_PROJECT',
    project,
  };
}

export function editProject(projectid, values) {
  return dispatch => {
    dispatch({ type: 'EDIT_PROJECT_ATTEMPT', projectid });
    return fetch(`${PROJECT_URL}${projectid}`, {
      method: 'put',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(res => {
        dispatch(triggerFlashMessage('Updated Project', 'success'));
        if (res.status) {
          return dispatch(updateProject(res.data.project));
        }

        dispatch({ type: 'EDIT_PROJECT_FAIL', error: { message: 'invalid_data' } });
        return dispatch(logout());
      })
      .catch(() => {
        dispatch(triggerFlashMessage('Updated Project Failed', 'error'));
        dispatch({ type: 'EDIT_PROJECT_FAIL', error: { message: 'invalid_data' } });
        dispatch(logout());
      });
  };
}

export function handleAddWhitelistError(error, projectid) {
  return {
    type: 'ADDING_WHITELIST_FAIL',
    error,
    projectid,
  };
}

export function updateSecurity(projectid, values, cb) {
  return dispatch => {
    dispatch({ type: 'UPDATE_SECURITY_ATTEMPT' });

    fetch(`${PROJECT_URL}${projectid}/security`, {
      method: 'put',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(res => {
        cb();

        if (res.status && 'project' in res.data) {
          dispatch(triggerFlashMessage('Security Updated', 'success'));
          return dispatch(updateProject(res.data.project));
        }

        dispatch(triggerFlashMessage('Error Updating Security', 'error'));
        dispatch(logout());
        return dispatch({ type: 'UPDATE_SECURITY_FAIL', error: { message: 'invalid_data' } });
      })
      .catch(error => {
        cb();
        dispatch(handleAddWhitelistError(error, projectid));
        dispatch(logout());
      });
  };
}

export function removeWhitelistItem(projectid, item, securityType) {
  return dispatch => {
    dispatch({ type: 'REMOVE_SECURITY_ITEM_ATTEMPT' });

    fetch(`${PROJECT_URL}${projectid}/security/${securityType}`, {
      method: 'delete',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ item }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.status && 'project' in res.data) {
          dispatch(triggerFlashMessage('Security Item Removed', 'success'));
          return dispatch(updateProject(res.data.project));
        }

        dispatch(triggerFlashMessage('Error Removing Security Item', 'error'));
        dispatch(logout());
        return dispatch({ type: 'REMOVE_SECURITY_ITEM_FAIL', error: { message: 'invalid_data' } });
      })
      .catch(error => {
        dispatch(triggerFlashMessage('Error Removing Security Item', 'error'));
        dispatch(logout());
        dispatch({ type: 'REMOVE_SECURITY_ITEM_FAIL', error });
      });
  };
}

export function deleteProject(projectid) {
  return dispatch => {
    dispatch({ type: 'DELETE_PROJECT_ATTEMPT' }, projectid);

    return fetch(`${PROJECT_URL}${projectid}`, {
      method: 'delete',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          dispatch(triggerFlashMessage('Project Deleted', 'success'));
          dispatch(getCurrentUser());
          return dispatch({
            type: 'DELETE_PROJECT_SUCCESS',
            projectid,
          });
        }
        dispatch(triggerFlashMessage('Error Deleting Project', 'error'));
        return dispatch({ type: 'DELETE_PROJECT_FAILURE', error: { message: 'invalid_data' } });
      });
  };
}
