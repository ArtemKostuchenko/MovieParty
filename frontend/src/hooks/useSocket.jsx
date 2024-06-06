import { socket } from "../features/utils/socket";

const useSocket = () => {
  const connect = () => {
    socket.connect();
  };
  const disconnect = () => {
    socket.disconnect();
  };

  return { socket, connect, disconnect };
};

export default useSocket;
