import React from 'react';
import Header from './components/Header';
import "./App.css"
import LoginPage from './pages/LoginPage';
import CardsHome from './components/CardsHome';
import HomePage from './pages/HomePage';
import axios from 'axios';
import ProfilePage from './pages/ProfilePage';

axios.defaults.baseURL="http://52.77.229.210:3000"

function App() {
  return (
    <div className="App">
      <ProfilePage />
      {/* <HomePage /> */}
    </div>
  );
}

export default App;
