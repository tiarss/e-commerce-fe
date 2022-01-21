import React from 'react';
import Header from './components/Header';
import "./App.css"
import LoginPage from './pages/LoginPage';
import CardsHome from './components/CardsHome';
// {/* <LoginPage /> */}

function App() {
  return (
    <div className="App">
      <Header />
      <CardsHome />
    </div>
  );
}

export default App;
