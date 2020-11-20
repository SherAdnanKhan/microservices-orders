import axios from 'axios';
import store from '../store';
import { startLoading, stopLoading } from '../actions/loadingActions';
import { setError, clearError } from '../actions/errorActions';
import { getFormattedErrors } from '../utils/helperFunctions';
import { getAuthToken } from '../actions/authActions';
import { toast } from "react-toastify";

const shouldShowLoader = (url) => {
  if (url.includes("/chats/user")) {
    return false;
  } else if (url.includes('metas')) {
    return false;
  } else {
    return true;
  }
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(request => {
  const token = getAuthToken();

  if (token)
    request.headers.common['Authorization'] = `Bearer ${token}`;

  request.headers.common['Accept'] = 'application/json';

  if (shouldShowLoader(request.url)) {
    store.dispatch(startLoading());
  }
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
      toast.error('An unexpected error has occured.')
    }

    if (expectedError) {
      store.dispatch(setError(getFormattedErrors(error.response && error.response.data)));
    }
    store.dispatch(stopLoading());

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