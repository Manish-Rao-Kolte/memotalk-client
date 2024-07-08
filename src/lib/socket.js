import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_BASE_URL, { autoConnect: false });

// socket.on("connect", () => {
//   //   console.log("Connected to Socket.IO server");
// });
// socket.on("statusUpdate", (status) => {
//   console.log("Received status update:", status);
//   // Handle status update logic here...
// });

export default socket;
