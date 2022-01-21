import React from "react";
import { Box } from "@mui/material";


function SummaryDetail() {
    return (
        <Box
      sx={{
        display: "flex",
        width: { xs:"357px", sm:"463px"},
        height: "130px",
        padding: "10px 30px",
        backgroundColor: "#1767A0",
        justifyContent: "space-between",        
      }}>
      <Box
      sx={{        
        display: "",
        width: "40%",        
        padding: "10px 10px",        
        justifyContent: "space-between",                
      }}>
          <p style={{ marginBottom:"10px", color:"#FFFFFF" }}>Total Quantity</p>
          <p style={{ marginBottom:"10px", color:"#FFFFFF" }}>Shipping</p>
          <p style={{ marginBottom:"10px", color:"#FFFFFF" }}>Total Price</p>
        
      </Box>
      <Box
      sx={{
        width: "10%",        
        padding: "10px 10px",        
        justifyContent: "space-between",        
      }}>
        <p style={{ marginBottom:"10px", color:"#FFFFFF" }}>:</p>
        <p style={{ marginBottom:"10px", color:"#FFFFFF" }}>:</p>
        <p style={{ marginBottom:"10px", color:"#FFFFFF" }}>:</p>
      </Box>
      <Box
      sx={{
        width: "40%",       
        padding: "10px 10px",
        textAlign: "right",
        
        justifyContent: "space-between",        
      }}>
        <p style={{ marginBottom:"10px", color:"#FFFFFF" }}>6</p>
        <p style={{ marginBottom:"10px", color:"#FFFFFF" }}>Rp.20.000</p>
        <p style={{ marginBottom:"10px", color:"#FFFFFF" }}>Rp.80.000</p>
      </Box>
    </Box>       
      
    );
  }
  
  export default SummaryDetail;
  