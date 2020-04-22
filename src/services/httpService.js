import axios from 'axios';

axios.interceptors.request.use(request => {

}, null);

axios.interceptors.response.use(
  response => {

  },

  error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      alert('An unexpected error has occured.');
    }
  }
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch
}