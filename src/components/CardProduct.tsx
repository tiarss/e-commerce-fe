import * as React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../images/Logo-sirclo.png";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "@fontsource/nunito";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { fontFamily } from "@mui/system";
import { LargeNumberLike } from "crypto";
import { CustomButtonSecondary } from "./CustomButton";

interface cardproduct {
  srcImage: string;
  productTitle: string;
  productPrice: number;
  productCount: number;
  sumPrice: number;
}

function CardProduct(props: cardproduct) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        padding: { xs: "17px 20px", sm: "30px 50px" },
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.250);",
        fontFamily: "Nunito",
      }}>
      <Box
        sx={{
          width: "50%",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <img
          style={{ height: "100%" }}
          src={props.srcImage}
          alt='Product Picture'
        />
      </Box>
      <Box
        sx={{
          width: "50%",
          justifyContent: "space-between",
          display:"flex",
          gap: 1,
          flexDirection: { xs: "column", sm: "column" },
        }}>
        <Box>
          <h4 style={{ color: "#2296CB", fontSize: "25px" }}>
            {" "}
            {props.productTitle}
          </h4>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}>
          <Box>
            <p>Rp. {props.productPrice}</p>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
                gap: "10px  ",
                backgroundColor: "#C4C4C4",
              }}>
              <AddIcon />
              <p>{props.productCount}</p>
              <RemoveIcon />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}>
          <Box></Box>
          <Box>
            <p>Sub-total : Rp.{props.sumPrice}</p>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}>
          <Box></Box>
          <Box>
            <CustomButtonSecondary caption="Hapus dari Keranjang" />
          </Box>
        </Box>

        {/* <Box
                sx={{
                    width:"50%",
                    padding: { xs: "17px 20px", sm: "10px 50px" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    
                    // flex-direction: "row",
                  }}>
                   
                </Box>
                <Box>
                    C
                </Box> */}
      </Box>
    </Box>
  );
}

export default CardProduct;
