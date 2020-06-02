
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
  let date = new Date(dateTime);
  let hours = date.getHours();
  let minuts = date.getMinutes();
  let isAmOrPm = "AM";

  if (hours >= 12) {
    hours = hours - 12;
    isAmOrPm = "PM";
  }

  if (hours === 0) {
    hours = 12;
  }
  return `${hours}:${minuts} ${isAmOrPm} `;
};