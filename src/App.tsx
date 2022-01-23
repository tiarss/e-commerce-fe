import React from 'react';
import Header from './components/Header';
import "./App.css"
<<<<<<< Updated upstream
import {InputText,InputText2,InputText3} from './components/InputText';
import CardProduct from './components/CardProduct';
import SummaryDetail from './components/SummaryDetail';

function App() {
  return (
    <div className="App">
      <InputText/>
      <br/>
      <InputText2 textLabel='Nama' placeholder='nama' />
      <br/>
      <InputText3/>
      <br/>
      <CardProduct srcImage= "test"
        productTitle= "Title 1"
        productPrice= "10000"
        productCount= "4"
        sumPrice= "40000"/>
      <br/>
      </div>
   
=======
import LoginPage from './pages/LoginPage';
import CardsHome from './components/CardsHome';
import HomePage from './pages/HomePage';
import axios from 'axios';
import ProfilePage from './pages/ProfilePage';
import { Link, Outlet } from 'react-router-dom';

axios.defaults.baseURL="http://52.77.229.210:3000"

function App() {
  return (
    <div >
      <Header/>
      <Outlet/>

    </div>
>>>>>>> Stashed changes
  );
}

export default App;
