import io from 'socket.io-client';
import { tokenKey, userKey } from '../constants/keys';
import { isEmpty } from '../utils/helperFunctions';

class Socket {
  config = {
    secure: true,
    resource: process.env.REACT_APP_SOCKET_BASE_PATH,
    path: process.env.REACT_APP_SOCKET_BASE_PATH,
    transports: ['polling']
  };

  getUser() {
    const user = JSON.parse(localStorage.getItem(userKey));
    const token = JSON.parse(localStorage.getItem(tokenKey));

    return (isEmpty(user) || isEmpty(token)) ? null : user;
  }

  getSocketConection() {
    return this.getUser() ? io.connect(process.env.REACT_APP_SOCKET_URL) : null;
  };
};

export default new Socket().getSocketConection();