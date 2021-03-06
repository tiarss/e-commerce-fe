import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import "@fontsource/nunito/700.css";
import { Tooltip } from "@mui/material";

function CardsHome({
  image,
  name,
  price,
  OnClick,
  AddCart,
}: {
  image?: string;
  name?: string;
  price?: number | bigint;
  OnClick?: () => void;
  AddCart?: () => void;
}) {
  return (
    <Box
      sx={{
        width: { xs: "140px", sm: "250px", md: "200px" },
        minHeight: { xs: "210px", sm: "300px", md: "250px" },
        backgroundColor: "#2296CB",
        marginTop: "50px",
        borderRadius: "10px",
        overflow: "hidden",
      }}>
      <Box
        sx={{
          width: "fit-content",
          height: { xs: "130px", sm: "200px" },
          overflow: "hidden",
        }}>
        <img
          onClick={OnClick}
          style={{
            height: "200px",
            width: "200px",
            maxWidth: "140px",
            minWidth: "250px",
          }}
          // fill the src with image props
          src={image}
          alt='vga'
        />
      </Box>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          gap: "5px",
          height: "120px",
          justifyContent: "space-between"
        }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Typography
            sx={{
              fontFamily: "Nunito",
              fontSize: { xs: "12px", sm: "20px" },
              color: "white",
              fontWeight: "700",
            }}>
            {/* replace productName state with name props */}
            {name?.substring(0, 15) + "..."}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Nunito",
              fontSize: "12px",
              color: "white",
              fontWeight: "700",
            }}>
            {/* replace productPrice with price props*/}
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price!)}
          </Typography>
        </Box>
        <Box>
          <Tooltip title='Add to Cart'>
            <IconButton
              onClick={AddCart}
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
              onClick={AddCart}
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
