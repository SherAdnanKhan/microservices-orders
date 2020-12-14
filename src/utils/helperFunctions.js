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

export const convertDateIntoAge = (date) => {
  var today = new Date();
  var birthDate = new Date(date);
  var currentAge = today.getFullYear() - birthDate.getFullYear();
  return currentAge
}

export const validateAge = (date) => {
  const today = new Date();
  const birthDate = new Date(date);
  const currentAge = today.getFullYear() - birthDate.getFullYear();

  return currentAge > 13 ? true : false;
}

export const isValidFileSize = (size, requiredSize) => {
  const fileSizeKb = size / 1000;
  const fileSizeMb = fileSizeKb / 1000;

  return fileSizeMb > requiredSize ? false : true;
}

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

export const completeDate = date => {
  return moment(date).format('YYYY-MM-DD');
};

export const playNotificationSound = async () => {
  try {
    await new Audio('/assets/sounds/notification.mp3').play()
  } catch (err) {

  }
}

export const getText = (text) => {
  if (!text) return null;
  // if space comes in string replace it with next line
  const splitted = text
    .replace(/<br\s*\/?>/g, '\n')
    .trim('')
    .split(' ');

  let stringBuilder = '';

  for (let i = 0; i < splitted.length; i++) {
    if (!getURL(splitted[i])) {
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
    if (isUrl.test(str)) {
      if (
        str.split('.')[0].includes('http://') ||
        str.split('.')[0].includes('https://')) {

        return str;
      } else {
        if (str.split('.')[0] === 'www') {
          return `https://${str}`;
        }
      }
    }
  }
  return null;
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

export const convertHexToRGBA = (hexCode, opacity) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
};


export const hasExtension = url => {
  const splitted = url.split('.');
  return splitted[splitted.length - 1] ? true : false;
};