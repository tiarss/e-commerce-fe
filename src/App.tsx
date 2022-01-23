
import React from 'react';
import Header from './components/Header';
import "./App.css"
import {InputText,InputText2,InputText3} from './components/InputText';
import CardProduct from './components/CardProduct';
import SummaryDetail from './components/SummaryDetail';
import { Link, Outlet } from 'react-router-dom';
<<<<<<< Updated upstream

=======
import axios from 'axios'

axios.defaults.baseURL="http://52.77.229.210:3000"
>>>>>>> Stashed changes
function App() {
  return (
    <div >
      <Header/>
      <Outlet/>     
    </div>
   
  );
}

export default App;

