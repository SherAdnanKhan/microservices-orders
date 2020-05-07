import axios from 'axios';
import store from '../store';
import { startLoading, stopLoading } from '../actions/loadingActions';
import { setError, clearError } from '../actions/errorActions';
import { getFormattedErrors } from '../utils/helperFunctions';
import { getAuthToken } from '../actions/authActions';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(request => {
  const token = getAuthToken();

  if (token)
    request.headers.common['Authorization'] = `Bearer ${token}`;

  request.headers.common['Accept'] = 'application/json';

  store.dispatch(startLoading());
  store.dispatch(clearError());

  return request;
}, null);

axios.interceptors.response.use(
  response => {
    store.dispatch(stopLoading());
    return response;
  },

  error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      alert('An unexpected error has occured.');
    }

    store.dispatch(stopLoading());
    store.dispatch(setError(getFormattedErrors(error.response && error.response.data)));

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
};