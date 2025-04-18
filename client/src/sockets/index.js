import { io } from "socket.io-client";

const socketInit = () => {
  const options = {
    timeout: 10000,
    transports: ["websocket"],
  };
  return io(process.env.REACT_APP_SOCKET_SERVER_URL, options);
};

export default socketInit;
