import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import App from "../App";
import DetailProduct from "../pages/DetailProduct";
import ShoppingCard from "../pages/ShoppingCard";
import LoginPage from "../pages/LoginPage";
import SignUp from "../pages/SignUp";
import FinalOrder from "../pages/FinalOrder";
import axios from "axios";
import ProtectedRoute from "../utils/ProtectedRoute";
import { ShoppingContext, ShoppingProvider } from "../context/ShoppingNotification";
axios.defaults.baseURL = "http://52.221.195.63:3000";
const RouteCenter = () => {
  return (
    <Box>
      <BrowserRouter>
        <ShoppingProvider>
          <Routes>
              <Route index element={<HomePage />} />
              <Route path='detailproduct/:id' element={<DetailProduct />} />
              <Route
                path='profilepage'
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='shop'
                element={
                  <ProtectedRoute>
                    <ShoppingCard />
                  </ProtectedRoute>
                }
              />
              <Route
                path='finalorder'
                element={
                  <ProtectedRoute>
                    <FinalOrder />
                  </ProtectedRoute>
                }
              />
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignUp />} />
          </Routes>
        </ShoppingProvider>
      </BrowserRouter>
    </Box>
  );
};
export default RouteCenter;

