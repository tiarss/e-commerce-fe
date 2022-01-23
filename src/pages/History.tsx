import React from "react";
import { Box, Typography } from "@mui/material";
import {
  CustomButtonPrimary,
  CustomButtonSecondary,
} from "../components/CustomButton";
function History() {
  return (
    <Box
      sx={{
        minHeight: "400px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.250);",
        borderRadius: "10px",
        marginTop: "10px",
        marginBottom: "50px",
        padding: "20px",
        display: "flex",
      }}>
      <Box
        sx={{
          width: "100%",
        }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            padding: "20px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.250);",
            borderRadius: "10px",
            marginTop: "10px",
            flexDirection: {xs: "column", md: "row"}
          }}>
          <Box sx={{ width: {xs:"100",md:"20%"}  }}>
            <img
              style={{ width: "140px" }}
              src='https://cf.shopee.co.id/file/8e1587fde80391f310ea8f70a5728ec7'
              alt=''
            />
          </Box>
          <Box sx={{ width: {xs:"100",md:"80%"} }}>
            <Typography>History 1</Typography>
            <Typography>Macam Product</Typography>
            <Typography>Total Biaya</Typography>
            <Typography>Status</Typography>
            <Box
              sx={{
                marginTop: {xs:"10px", md:"0px"},
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                gap: 2
              }}>
              <CustomButtonPrimary caption='Konfirmasi Pembayaran' />
              <CustomButtonSecondary caption='Batalkan Transaksi' />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default History;
