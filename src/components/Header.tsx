import React from "react";
import { Box } from "@mui/material";
import logo from "../images/Logo-sirclo.png"

function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "70px",
        padding: "10px 50px",
        boxShadow: "0px 4px 4px #000",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
      <Box>
        <img style={{height: "40px"}} src={logo} alt='logo-sirclo' />
      </Box>
      <Box>
        <Box>Search</Box>
      </Box>
      <Box>Login and Carts</Box>
    </Box>
  );
}

export default Header;
