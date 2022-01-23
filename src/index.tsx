import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./index.css"
import LoginPage from "./pages/LoginPage"
import DetailProduct from './pages/DetailProduct';
import SignUp from './pages/SignUp';
import { Login } from '@mui/icons-material';
<<<<<<< Updated upstream
import Route from "./routes/route";

ReactDOM.render(
  <React.StrictMode>
    <Route/>
=======
import RouteCenter from "./routes/route";

ReactDOM.render(
  <React.StrictMode>
    <RouteCenter/>
>>>>>>> Stashed changes
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
