import { Route, Routes, BrowserRouter } from "react-router-dom"
import { Box } from "@mui/material"
import React from "react"
import HomePage from "../pages/HomePage"
import ProfilePage from "../pages/ProfilePage"
import App from "../App"
import DetailProduct from "../pages/DetailProduct"
import ShoppingCard from "../pages/ShoppingCard"
import LoginPage from "../pages/LoginPage"
import SignUp from "../pages/SignUp"
import FinalOrder from "../pages/FinalOrder"

const route=()=> {
    return (    
        <Box>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index element={<HomePage/>} />
                        <Route path="profilePage" element={<ProfilePage/>}/>
                        <Route path="detailProduct/:id" element={<DetailProduct/>}/>                        
                        <Route path="shoppingCard" element={<ShoppingCard/>} />    
                        <Route path="finalOrder" element={<FinalOrder/>} />                        
                    </Route>
                    <Route path="Login" element={<LoginPage/>} />
                    <Route path="SignUp" element={<SignUp/>} />
                </Routes>                
            </BrowserRouter>
            
        </Box>
    )

}
export default route
