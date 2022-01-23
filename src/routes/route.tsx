import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import React from "react";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import App from "../App";
import DetailProduct from "../pages/DetailProduct";
import ShoppingCard from "../pages/ShoppingCard";
import LoginPage from "../pages/LoginPage";
import SignUp from "../pages/SignUp";
import FinalOrder from "../pages/FinalOrder";
import axios from "axios";
// import ProtectedRoute from "../utils/ProtectedRoute";
import { useLocalStorage } from "../utils/useLocalStorage";
import { authTypes } from "../Types";
import ProtectedRoute from "../utils/ProtectedRoute";

axios.defaults.baseURL = "http://52.77.229.210:3000";
const RouteCenter = () => {
  const [auth] = useLocalStorage<authTypes[] | undefined>("auth", []);
  let isAuth: boolean | undefined;
  if (auth === undefined) {
    isAuth = false;
  } else {
    isAuth = auth[0]?.isAuth;
  }

  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
            <Route path='profilePage' element={<ProfilePage />} />
            <Route path='detailProduct/:id' element={<DetailProduct />} />
            <Route
              path='shoppingCard'
              element={isAuth ? <ShoppingCard /> : <Navigate to='/Login' />}
            />
            <Route
              path='finalOrder'
              element={
                <ProtectedRoute>
                  <FinalOrder />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path='Login' element={<LoginPage />} />
          <Route path='SignUp' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};
export default RouteCenter;
