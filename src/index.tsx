import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./index.css"
<<<<<<< Updated upstream
=======
import "@fontsource/nunito"
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import ShoppingCard from './pages/ShoppingCard'
import DetailProduct from './pages/DetailProduct';
import FinalOrder from './pages/FinalOrder';

>>>>>>> Stashed changes

ReactDOM.render(
  <React.StrictMode>
    <LoginPage/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
