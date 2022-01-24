import React from 'react';
import {RouteProps, Route, Navigate } from "react-router-dom"
import { useLocalStorage } from "../utils/useLocalStorage";
import { authTypes } from "../Types";

const PrivateRoute = ({ children}:any) => {
  const [auth] = useLocalStorage<authTypes[] | undefined>("auth", []);
  let isAuth: boolean | undefined;
  if (auth === undefined) {
    isAuth = false;
  } else {
    isAuth = auth[0]?.isAuth;
  }
     
  if (isAuth ) {
    return children    }
    
  return <Navigate to="/login" />
}
export default PrivateRoute;
