import { authSelector } from "@/redux/reducers/authReducer";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { user } = useSelector(authSelector);
  // useEffect(() => {
  //   try {
  //     axios.get(`${import.meta.env.VITE_SERVER_URL}/`)
  //   } catch (error) {

  //   }
  // }, []);
  return user !== null ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
