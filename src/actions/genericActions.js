import http from '../services/httpService';

export const fileUpload = (file, onUpload, success, faliure) => dispatch => {
  const config = {
    onUploadProgress: progressEvent => {
      onUpload(Math.floor((progressEvent.loaded * 100) / progressEvent.total));
    }
  };

  http
    .post('/generic/uploads', file, config)
    .then(res => {
      success(res.data.data);
    })
    .catch(err => {
      if (err.response) {
        if (err.response.status === 400 || err.response.status === 404) {
          // toast.error('File is too large for upload.');
        }
      }
      faliure(err.response);
    });
};