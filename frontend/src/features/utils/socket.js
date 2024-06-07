import { io } from "socket.io-client";

export const socket = io("http://192.168.1.59:5000", {
  autoConnect: false,
  auth: {
    user: {
      _id: "",
    },
  },
});
