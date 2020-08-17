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

export const formatDateTime = date => {
  return moment(date).format("LLL");
};

export const completeFormattedDate = date => {
  return moment(date).format('MMMM Do YYYY');
};

export const playNotificationSound = async () => {
  try {
    await new Audio('/assets/sounds/notification.mp3').play()
  } catch (err) {

  }
}

export const isValidURL = (str) => {
  const pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  return pattern.test(str);
}