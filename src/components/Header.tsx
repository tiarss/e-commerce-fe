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
<<<<<<< Updated upstream
        <img style={{height: "40px"}} src={logo} alt='logo-sirclo' />
=======
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2296CB",
            height: "40px",
            width: { xs: "270px", sm: "300px" },
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
            <Typography sx={{ color: "white", fontFamily: "Nunito" }}>
              Search
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: "20px",
        }}>
        <Box
          sx={{
            padding: "5px 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2296CB",
            height: "40px",
            borderRadius: "10px",
            gap: "10px",
          }}>
          <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
          <Typography sx={{ color: "white" }}>1</Typography>
        </Box>
        <Box>
          <CustomButtonSecondary caption='Log In' />
        </Box>
>>>>>>> Stashed changes
      </Box>
      <Box>
        <Box>Search</Box>
      </Box>
      <Box>Login and Cart</Box>
    </Box>
  );
}

export default Header;
