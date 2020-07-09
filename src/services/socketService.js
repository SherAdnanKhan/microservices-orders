import io from 'socket.io-client';

class Socket {
  config = {
    secure: true,
    resource: process.env.REACT_APP_SOCKET_BASE_PATH,
    path: process.env.REACT_APP_SOCKET_BASE_PATH,
    transports: ['polling']
  };

  getSocketConection() {
    return io.connect(process.env.REACT_APP_SOCKET_URL, this.config);
  };
};

export default new Socket().getSocketConection()