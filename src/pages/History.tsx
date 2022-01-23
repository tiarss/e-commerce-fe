import React from "react";
import { Box, Typography } from "@mui/material";
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
      <Typography>History</Typography>
    </Box>
  );
}

export default History;
