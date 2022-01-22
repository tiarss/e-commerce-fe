import React from 'react';
import Header from './components/Header';
import "./App.css"
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
   
  );
}

export default App;
