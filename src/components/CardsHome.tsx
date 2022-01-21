<<<<<<< HEAD
import React, {useState} from "react";
=======
import React, { useState } from "react";
>>>>>>> cards-home
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import "@fontsource/nunito/700.css";
import { Tooltip } from "@mui/material";

<<<<<<< HEAD
function CardsHome() {

   const [productName ] = useState("Graphic Card NVdia GTX 930")
   const [productPrice ] = useState(15000)
=======
function CardsHome({
  image,
  name,
  price,
}: {
  image: string;
  name: string;
  price: string;
}) {
  const [productName] = useState("Graphic Card NVdia GTX 930");
  const [productPrice] = useState(15000);
>>>>>>> cards-home
  return (
    <Box
      sx={{
        width: { xs: "175px", sm: "250px", md: "200px" },
        minHeight: { xs: "210px", sm: "300px", md: "250px" },
        backgroundColor: "#2296CB",
        marginTop: "50px",
        borderRadius: "10px",
        overflow: "hidden",
      }}>
      <Box
        sx={{
          width: "fit-content",
          height: { xs: "130px", sm: "190px" },
          overflow: "hidden",
        }}>
        <img
          style={{ width: "100%" }}
          // fill the src with image props
          src='https://cf.shopee.co.id/file/6922c127c5285f3411d78090a6079d7c'
          alt='vga'
        />
      </Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          gap: "5px",
        }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Typography
            sx={{
              fontFamily: "Nunito",
              fontSize: { xs: "14px", sm: "20px" },
              color: "white",
              fontWeight: "700",
            }}>
              {/* replace productName state with name props */}
            {productName.substring(0, 20) + "..."}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Nunito",
              fontSize: "14px",
              color: "white",
              fontWeight: "700",
            }}>
              {/* replace productPrice with price props*/}
            {productPrice}
          </Typography>
        </Box>
        <Box>
          <Tooltip title='Add to Cart'>
            <IconButton
              size='small'
              sx={{
                display: { xs: "inline-flex", sm: "none" },
                backgroundColor: "white",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}>
              <AddShoppingCartRoundedIcon
                sx={{ fontSize: "medium", color: "#2296CB" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title='Add to Cart'>
            <IconButton
              size='medium'
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                backgroundColor: "white",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}>
              <AddShoppingCartRoundedIcon
                sx={{
                  fontSize: { xs: "medium", sm: "25px", md: "20px" },
                  color: "#2296CB",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default CardsHome;
