import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./index.css"
import LoginPage from "./pages/LoginPage"
import DetailProduct from './pages/DetailProduct';
import SignUp from './pages/SignUp'
import HomePage from './pages/HomePage';
import axios from "axios"
import ProfilePage from './pages/ProfilePage';
import ShoppingCard from './pages/ShoppingCard';
import FinalOrder from './pages/FinalOrder';
axios.defaults.baseURL="http://52.77.229.210:3000"

ReactDOM.render(
  <React.StrictMode>
    <ProfilePage />
    {/* <FinalOrder /> */}
    {/* <ShoppingCard /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
