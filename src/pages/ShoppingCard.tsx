import { Box } from '@mui/material';
import CardProduct from '../components/CardProduct';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SummaryDetail from '../components/SummaryDetail';
import React, {useEffect, useState} from 'react';



const ShoppingCard: React.FC = (props) => {
  return (
      <Box>
          <Header/>
          <Box sx={{ minHeight:"80vh" }}>
          <Box sx={{ 
              padding:{ xs:"10px", sm:"20px",md:"50px"},              
           }}>
               <h1 style={{ color:"#309DCE", fontSize:"130%", }}>Shopping Card Detail</h1>
               <CardProduct srcImage="" productTitle="" productPrice="" productCount="" sumPrice="" />

          </Box>
          <Box sx={{ 
              margin:{ xs:"10px", sm:"20px",md:"50px"},
              alignItems:"center",
              justifyContent:"space-between",
              display:"flex"

           }}>
              <Box>              
              </Box>
              <Box>
               <SummaryDetail qty="4"  shipping="0" sumPrice="40000" />
          </Box> 
          </Box>     
          

          </Box>
                     
          <Footer/>
          
      </Box>
    
    
  );
}

export default ShoppingCard;
