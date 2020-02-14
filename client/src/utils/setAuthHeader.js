import axios from 'axios';

export const setAuthHeader = token => {
  if (token) {
    axios.headers.common['x-auth-token'] = token;
  } else {
    delete axios.headers.common['x-auth-token'];
  }
};
