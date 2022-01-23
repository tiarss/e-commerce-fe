import { Route, Routes, BrowserRouter } from "react-router-dom"
import { Box } from "@mui/material"
<<<<<<< Updated upstream
import React from "react"
=======
>>>>>>> Stashed changes
import HomePage from "../pages/HomePage"
import ProfilePage from "../pages/ProfilePage"
import App from "../App"
import DetailProduct from "../pages/DetailProduct"
import ShoppingCard from "../pages/ShoppingCard"
import LoginPage from "../pages/LoginPage"
import SignUp from "../pages/SignUp"
import FinalOrder from "../pages/FinalOrder"
<<<<<<< Updated upstream

const route=()=> {
=======
import React, { useEffect, useState, useContext, ContextType } from "react";
import ProtectedRoute from "../utils/ProtectedRoute"

const RouteCenter: React.FC = () => {
    const [isAuth, setIsAuth] = useState(true)
>>>>>>> Stashed changes
    return (    
        <Box>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index element={<HomePage/>} />
<<<<<<< Updated upstream
                        <Route path="profilePage" element={<ProfilePage/>}/>
=======
                        {/* <ProtectedRoute isAuth={isAuth} path="profilePage" element={<ProfilePage/> }/> */}
>>>>>>> Stashed changes
                        <Route path="detailProduct/:id" element={<DetailProduct/>}/>                        
                        <Route path="shoppingCard" element={<ShoppingCard/>} />    
                        <Route path="finalOrder" element={<FinalOrder/>} />                        
                    </Route>
<<<<<<< Updated upstream
                    <Route path="Login" element={<LoginPage/>} />
                    <Route path="SignUp" element={<SignUp/>} />
=======
                    <Route path="login" element={<LoginPage/>} />
                    <Route path="signUp" element={<SignUp/>} />
>>>>>>> Stashed changes
                </Routes>                
            </BrowserRouter>
            
        </Box>
    )

}
<<<<<<< Updated upstream
export default route
=======

export default RouteCenter
>>>>>>> Stashed changes
