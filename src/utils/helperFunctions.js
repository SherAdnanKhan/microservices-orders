import moment from 'moment';

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);


export const getFormattedErrors = error => {
  const errors = {};

  if (error.errors) {
    for (let key in error.errors) {
      errors[key] = key === 'message' ? error.errors[key] : error.errors[key][0];
    }
  }
  return errors;
};

export const formatTime = dateTime => {
  const time = moment(dateTime).format('hh:mm A');
  return time;
};

export const formatDate = date => {
  return moment(date).format("MMM Do");
}