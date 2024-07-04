import { userSelector } from "@/redux/reducers/userReducer";
import axios from "axios";
import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
