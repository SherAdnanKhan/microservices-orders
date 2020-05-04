import axios from 'axios';
import store from '../store';
import { startLoading, stopLoading } from '../actions/loadingActions';
import { setError, clearError } from '../actions/errorActions';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(request => {
  store.dispatch(startLoading());
  store.dispatch(clearError());
  // request.common.headers['Accept'] = 'application/json';

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
    store.dispatch(setError(error.response && error.response.data));

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
}