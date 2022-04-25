import { get, keys } from 'lodash';

export const getProjectName = (userProjects, projectId) => get(userProjects, `${projectId}.name`, null);

export const getProjectCount = user => keys(get(user, 'projects', {})).length;

export const getDayTotal = projectMetrics => projectMetrics.reduce((sum, project) => sum + project.value, 0);
