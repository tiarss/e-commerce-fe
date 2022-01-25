import * as React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/nunito";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CustomButtonSecondary, CustomButtonPrimary } from "./CustomButton";

interface cardproduct {
  srcImage: string;
  productTitle: string;
  productPrice: number;
  productCount: number;
  sumPrice: number;
  productStock: number;
  addQty?: ()=>void;
  minQty?: ()=>void
  handleDelete?:()=>void
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
        marginBottom: "10px",
      }}>
      <Box
        sx={{
          width: "50%",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <img
          style={{ height: "100px" }}
          src={props.srcImage}
          alt='Product Picture'
        />
      </Box>
      <Box
        sx={{
          width: "50%",
          justifyContent: "space-between",
          display: "flex",
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
                alignItems: "center",
                gap: "10px  ",
              }}>
              <IconButton aria-label='delete' onClick={props.minQty} disabled={props.productCount === 1 ? true : false}>
                <RemoveIcon />
              </IconButton>
              <p>{props.productCount}</p>
              <IconButton aria-label='add' onClick={props.addQty} disabled={props.productCount === props.productStock ? true : false}>
                <AddIcon />
              </IconButton>
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
            <CustomButtonSecondary caption='Hapus dari Keranjang' OnClick={props.handleDelete} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CardProduct;
