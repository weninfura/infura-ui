import axiosLib from 'axios';
import { has, get } from 'lodash';
import { API_URL } from '../constants';
import { logout } from '../actions/auth';

const axios = axiosLib.create({
  withCredentials: true,
});

const apiRequest = async opts => {
  const { url, method, data, ...rest } = opts;

  try {
    const response = await axios({
      url: `${API_URL}${url}`,
      method: method || 'get',
      data: data || '',
      ...rest,
    });

    // 2xx if we get to here
    if (has(response, 'data.status') && response.data.status) {
      return {
        success: true,
        data: response.data.data,
      };
    } else if (has(response, 'data.error.message')) {
      return {
        success: false,
        data: response.data.error.message,
      };
    }

    return { success: false, error: 'unknown' };
  } catch (error) {
    // Server responded, but outside 2xx
    if (
      error.status === 401 ||
      (error.status === 403 && get(error, 'response.data.error.message') === 'expired_token')
    ) {
      return logout();
    }

    if (error.response) {
      const { response } = error;
      // Server gave us an error message
      if (has(response, 'data.error.message')) {
        return {
          success: false,
          error: response.data.error.message,
        };
      }
      return { success: false, error: 'unknown' };
    }

    return { success: false, error: 'unknown' };
  }
};

export default apiRequest;
