import moment from 'moment';
import { isUrl, numerics } from '../constants/regex';

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

export const getText = (text) => {
  if (!text) return null;

  const splitted = text
    .replace(/\s+/g, ' ')
    .trim('')
    .split(' ');

  let stringBuilder = '';

  for (let i = 0; i < splitted.length; i++) {
    if (!isValidURL(splitted[i])) {
      if (i < splitted.length - 1) {
        stringBuilder += splitted[i] + ' ';
      } else {
        stringBuilder += splitted[i];
      }
    }
  }

  return stringBuilder ? stringBuilder : null;
};

export const getURL = (text) => {
  if (!text) return null;

  const splitted = text
    .replace(/\s+/g, ' ')
    .trim('')
    .split(' ');

  for (let str of splitted) {
    if (isValidURL(str)) {
      return str;
    }
  }
  return null;
};

export const isValidURL = (text) => {
  return isUrl.test(text);
};


export const isNumber = (value) => {
  return numerics.test(value);
};

export const isChrome = () => {
  return navigator.userAgent.indexOf('Chrome') === -1 ? false : true;
}

export const isMobile = () => {
  return /Android|iPhone|iPad/i.test(navigator.userAgent);
}