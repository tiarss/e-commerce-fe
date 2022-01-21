import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../images/Logo-sirclo.png";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {CustomButtonPrimary, CustomButtonSecondary} from "./CustomButton";
import "@fontsource/nunito"

function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "80px",
        padding: "10px 50px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.250);",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <Box>
        <img style={{ height: "40px" }} src={logo} alt='logo-sirclo' />
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2296CB",
            height: "40px",
            width: "300px",
            borderRadius: "10px",
          }}>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <SearchRoundedIcon sx={{ color: "white" }} />
            <Typography sx={{ color: "white", fontFamily: "Nunito" }}>Search</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Box
          sx={{
            padding: "5px 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2296CB",
            height: "40px",
            borderRadius: "10px",
            gap: "10px"
          }}>
          <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
          <Typography sx={{ color: "white" }}>1</Typography>
        </Box>
        <Box>
           <CustomButtonSecondary caption="Log In" />
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
