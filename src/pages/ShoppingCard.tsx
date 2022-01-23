import { Box } from "@mui/material";
import CardProduct from "../components/CardProduct";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SummaryDetail from "../components/SummaryDetail";
import React, { useEffect, useState } from "react";
import { CustomButtonPrimary } from "../components/CustomButton";

const ShoppingCard: React.FC = (props) => {
  return (
    <Box>
      <Header />
      <Box sx={{ minHeight: "80vh", padding: { xs: "10px", sm: "20px", md: "50px" } }}>
        <Box>
          <h1 style={{ color: "#309DCE", fontSize: "130%" }}>
            Shopping Card Detail
          </h1>
          <CardProduct
            srcImage=''
            productTitle='Product 1'
            productPrice={1}
            productCount={2}
            sumPrice={2}
          />
        </Box>
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "flex-end",
            display: "flex",
          }}>
          <Box>
            <SummaryDetail qty='4' shipping='0' sumPrice='40000' />
          </Box>
        </Box>
        <Box sx={{display: "flex", gap: 3 , justifyContent: "flex-end", marginTop: "20px"}}>
          <CustomButtonPrimary caption='Update Keranjang' />
          <CustomButtonPrimary caption='Checkout' />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default ShoppingCard;
