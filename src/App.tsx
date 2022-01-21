import React from 'react';
import Header from './components/Header';
import "./App.css"
import LoginPage from './pages/LoginPage';
import CardsHome from './components/CardsHome';
import Footer from './components/Footer'
// {/* <LoginPage /> */}

function App() {
  return (
    <div className="App">
      <Header />
      <CardsHome />
      <Footer />
    </div>
  );
}

export default App;
