import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterUser from "./pages/app/register/RegisterUser.jsx";
import LoginUser from "./pages/app/login/LoginUser.jsx";
import Home from "./pages/app/home/Home.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: "/register",
      element: <RegisterUser />,
    },
    {
      path: "/login",
      element: <LoginUser />,
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ToastContainer
        autoClose={800}
        limit={3}
        position='top-right'
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      ></ToastContainer>
    </>
  );
}

export default App;
