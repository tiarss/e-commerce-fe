import React from "react";
import { Box } from "@mui/material";

interface summaryDetail {
  qty :string;
  shipping :string;
  sumPrice: string;

}

function SummaryDetail(props:summaryDetail) {
    return (
        <Box
      sx={{
        marginTop: "20px",
        display: "flex",
        width: { xs:"357px", sm:"463px"},
        height: "130px",
        padding: "10px 30px",
        backgroundColor: "#1767A0",
        justifyContent: "space-between",    
        borderRadius: "10px",    
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
        
        justifyContent: "space-betweeend",        
      }}>
        <p style={{ marginBottom:"10px", color:"#FFFFFF" }}>{props.qty}</p>
        <p style={{ marginBottom:"10px", color:"#FFFFFF" }}>Rp.{props.shipping}</p>
        <p style={{ marginBottom:"10px", color:"#FFFFFF" }}>Rp.{props.sumPrice}</p>
      </Box>
    </Box>       
      
    );
  }
  
  export default SummaryDetail;
  