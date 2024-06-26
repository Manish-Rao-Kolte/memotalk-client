import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterUser from "./pages/app/register/RegisterUser.jsx";
import LoginUser from "./pages/app/login/LoginUser.jsx";
import Home from "./pages/app/home/Home.jsx";

// const initialMessage = {
//     user: "",
//     message: "",
// };

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "register",
          element: <RegisterUser />,
        },
        {
          path: "login",
          element: <LoginUser />,
        },
      ],
    },
    {
      path: "/api",
      element: <Home />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

// import { Input } from "@/components/ui/input";
// import { Button } from "./components/ui/button";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const [message, setMessage] = useState(initialMessage);
// const [messageList, setMessageList] = useState([]);

// const sendMessage = () => {
//     const socket = io("http://localhost:3001");
//     socket.emit("chat-message", message);
//     setMessage(initialMessage);
// };

// useEffect(() => {
//     const data = prompt("Your name?");
//     setMessage({ ...message, user: data });
//     const socket = io("http://localhost:3001");
//     socket.on("chat-message", ({ user, message }) => {
//         setMessageList((prev) => [...prev, { user, message }]);
//     });
//     return () => {
//         socket.disconnect();
//     };
// }, []);
