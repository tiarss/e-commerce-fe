import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6ImJhaHRpYXJAZ21haWwuY29tIiwiZXhwIjoxNjQyODQ5MDU3LCJpZCI6Mn0.i49HHNxMfSX-WufGmD9-lcY4mWsW6uVwy9lAayXrIFM";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function BiodataDiri() {
   
   const [dataUserID, setDataUserID] = useState()


  useEffect(() => {
    fetchDataUserId();
  }, []);

  const fetchDataUserId = async () => {
    await axios.get("/users/2", config).then((res) => {
      console.log(res);
    });
  };

  return (
    <Box>
      <Box>
        <img
          src='https://cdn3.vectorstock.com/i/1000x1000/01/77/businesswoman-character-avatar-icon-vector-12800177.jpg'
          alt='avatar-user'
        />
      </Box>
      <Box></Box>
      <Typography>Biodata Diri</Typography>
    </Box>
  );
}

export default BiodataDiri;
