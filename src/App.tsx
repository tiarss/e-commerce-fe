
import React from 'react';
import Header from './components/Header';
import "./App.css"
import {InputText,InputText2,InputText3} from './components/InputText';
import CardProduct from './components/CardProduct';
import SummaryDetail from './components/SummaryDetail';
import { Link, Outlet } from 'react-router-dom';
import axios from './api/axios';
function App() {
  return (
    <div >
      <Header/>
      <Outlet/>     
    </div>
   
  );
}

export default App;

