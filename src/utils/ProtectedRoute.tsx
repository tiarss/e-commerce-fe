import React from 'react';
import {RouteProps, Route, Navigate } from "react-router-dom"

interface Props extends RouteProps{
   isAuth: boolean;
}

const ProtectedRoute = ({isAuth, ...routeProps}: Props) => {
   if(isAuth){
      return <Route {...routeProps} />
   }
   return <Navigate to="/login" />
}

export default ProtectedRoute;
