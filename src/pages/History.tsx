import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  CustomButtonPrimary,
  CustomButtonSecondary,
} from "../components/CustomButton";
import { alertType, authTypes, productHistoryType } from "../Types";
import axios from "axios";
import { useLocalStorage } from "../utils/useLocalStorage";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});


function History() {
  const productHistoryDefault: productHistoryType[] = [];
  const [auth, setAuth] = useLocalStorage<authTypes[] | undefined>("auth", []);
  const [productHistory, setProductHistory] = useState(productHistoryDefault);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alert, setAlert] = useState<alertType>({
    message: "",
    status: "info",
  });

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    fetchDataHistory();
  }, []);

  const fetchDataHistory = async () => {
    let token: string | undefined;
    let idUser: number | undefined;
    if (auth === undefined) {
      token = "";
      idUser = 0;
    } else {
      token = auth[0].token;
      idUser = auth[0].id;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get(`/orders/${idUser}`, config)
      .then((res) => {
        const { data } = res.data;
        setProductHistory(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReady(true);
      });
  };

  const handleConfirm = (cartId: number) => {
    let token: string | undefined;
    let idUser: number | undefined;
    if (auth === undefined) {
      token = "";
      idUser = 0;
    } else {
      token = auth[0].token;
      idUser = auth[0].id;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `/orders/${idUser}/${cartId}`,
        {
          status: "paid",
        },
        config
      )
      .then((res) => {
        setAlert({
          message: "Konfirmasi Pembayaran Selesai",
          status: "success",
        });
        setOpenAlert(true);
      }).finally(()=>{
        fetchDataHistory()
      });
  };

  const handleCenceled = (cartId: number) => {
    let token: string | undefined;
    let idUser: number | undefined;
    if (auth === undefined) {
      token = "";
      idUser = 0;
    } else {
      token = auth[0].token;
      idUser = auth[0].id;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `/orders/${idUser}/${cartId}`,
        {
          status: "cancelled",
        },
        config
      )
      .then((res) => {
        setAlert({
          message: "Transaksi Dibatalkan",
          status: "error",
        });
        setOpenAlert(true);
      }).finally(()=>{
        fetchDataHistory()
      });
  };
  // OnClick={handleConfirm}
  // OnClick={handleCanceled}
  const handleArrive = (cartId: number) => {
    let token: string | undefined;
    let idUser: number | undefined;
    if (auth === undefined) {
      token = "";
      idUser = 0;
    } else {
      token = auth[0].token;
      idUser = auth[0].id;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `/orders/${idUser}/${cartId}`,
        {
          status: "completed",
        },
        config
      )
      .then((res) => {
        setAlert({
          message: "Barang Telah Sampai",
          status: "success",
        });
        setOpenAlert(true);
      }).finally(()=>{
        fetchDataHistory()
      });
  };

  if (isReady) {
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
          {productHistory?.map((value, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                width: "100%",
                padding: "20px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.250);",
                borderRadius: "10px",
                marginTop: "10px",
                flexDirection: { xs: "column", md: "row" },
              }}>
              <Box sx={{ width: { xs: "100", md: "20%" } }}>
                <img
                  style={{ width: "140px" }}
                  src='https://cf.shopee.co.id/file/8e1587fde80391f310ea8f70a5728ec7'
                  alt=''
                />
              </Box>
              <Box sx={{ width: { xs: "100", md: "80%" } }}>
                <Typography sx={{fontFamily: "Nunito", fontWeight: "700" }} >Order {index + 1}</Typography>
                <Typography sx={{fontFamily: "Nunito", fontWeight: "700" }}>{value.datetransaction}</Typography>
              
                <Typography sx={{fontFamily: "Nunito", fontWeight: "700" }}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value.totalprice!)}</Typography>
                <Typography sx={{fontFamily: "Nunito", fontWeight: "700" }}>{value.status.toUpperCase()}</Typography>
                <Box
                  sx={{
                    marginTop: { xs: "10px", md: "0px" },
                    display: `${
                      value.status === "check out" ? "flex" : "none"
                    }`,
                    justifyContent: "flex-end",
                    width: "100%",
                    gap: 2,
                  }}>
                  <CustomButtonPrimary
                    caption='Konfirmasi Pembayaran'
                    OnClick={() => handleConfirm(value.id)}
                  />
                  <CustomButtonSecondary
                    caption='Batalkan Transaksi'
                    OnClick={() => handleCenceled(value.id)}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: { xs: "10px", md: "0px" },
                    display: `${value.status === "paid" ? "flex" : "none"}`,
                    justifyContent: "flex-end",
                    width: "100%",
                    gap: 2,
                  }}>
                  <CustomButtonPrimary
                    caption='Barang Diterima'
                    OnClick={() => handleArrive(value.id)}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}>
          <Alert
            onClose={handleCloseAlert}
            color={alert.status}
            sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    );
  } else {
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
        
      </Box>
    );
  }
}

export default History;
