import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BrowserRouter, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import {InputText2, InputText3} from '../components/InputText'
import SummaryDetail from '../components/SummaryDetail';
import { CustomButtonPrimary } from '../components/CustomButton';

const token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6ImJhaHRpYXJAZ21haWwuY29tIiwiZXhwIjoxNjQyODcyNTgxLCJpZCI6NH0.si7XYgSZl6x9y03hHyLwsTRl8fH30EBKeq4_1HsXJik";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};


function FinalOrder() {

  return (
      <Box>
        <Header/>
        <Box sx={{ padding:{xs:"5%", sm:"10%", md:"5% 20%"}, display:"flex", flexDirection:"column", gap:"10px"  }}>
          <h1 style={{ color: "#2296CB", textDecoration:"underline" }}>Final Order</h1>
          <Box sx={{ width:"100%", display:"flex", flexDirection:"column", gap:"2vh" }}>
            <InputText2 textLabel='Shipping Address' placeholder='Street' type='text'/>
            <InputText2 placeholder='City' type='text'/>
            <InputText2 placeholder='State/Province' type='text'/>
            <InputText2 placeholder='Zip Code' type='text'/>
            </Box>            
            <Box sx={{ width:"30%", display:"flex", flexDirection:"column", gap:"2vh" }}>
            <InputText3 textLabel='Credit Card' defValue='Visa' type='text' />
            </Box>
            <Box sx={{  width:"100%", display:"flex", flexDirection:"column", gap:"2vh" }}>
            <InputText2 placeholder='Number on Card' type='text'/>
            <Box sx={{ display:"flex", flexDirection:"row", gap:"10px" }}>
              <Box sx={{ width:"60%" }}>
                <InputText2 placeholder='Card Member' type='text'/>                
              </Box>
              <Box sx={{ width:"40%" }}>
                <InputText2 placeholder='Card Member' type='text'/>
              </Box>
            </Box>
              <Box sx={{ display:"flex", flexDirection:"row", gap:"10px", alignItems:"center" }}>
                <p style={{ width:"25%",}}>Expiration Date</p>
                <Box sx={{ width: "35%" }}>
                <InputText3/>
                </Box>
                <Box sx={{ width:"35%" }}>
                  <InputText3/>
                </Box>

              </Box>
          </Box>
          <Box sx={{ 
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
          <Box sx={{ 
              alignItems:"center",
              justifyContent:"end",
              display:"flex"
           }}>
            <Box>
            {/* <CustomButtonPrimary caption='Purchase' OnClick={fetchData} /> */}

            </Box>
          </Box>
        </Box>
        <Footer/>
      </Box>
    
  );
}

export default FinalOrder;
