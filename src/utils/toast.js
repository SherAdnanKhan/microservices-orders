import { toast } from 'react-toast-notification';

const success = message => {
  if (message) {
    toast(message, {
      status: '',
      type: 'success'
    })
  }
};

const error = message => {
  if (message) {
    toast(message, {
      status: 'Oops!',
      type: 'error'
    })
  }
};

export default {
  success,
  error
}; 