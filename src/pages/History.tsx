import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  CustomButtonPrimary,
  CustomButtonSecondary,
} from "../components/CustomButton";
import { authTypes, productHistoryType } from "../Types";
import axios from "axios";
import { useLocalStorage } from "../utils/useLocalStorage";
function History() {
  const productHistoryDefault: productHistoryType[] = [];
  const [auth, setAuth] = useLocalStorage<authTypes[] | undefined>("auth", []);
  const [productHistory, setProductHistory] = useState(productHistoryDefault);
  const [isReady, setIsReady] = useState<boolean>(false);

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
          status: "confirm",
        },
        config
      )
      .then((res) => {
        console.log(res);
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
          status: "canceled",
        },
        config
      )
      .then((res) => {
        console.log(res);
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
          status: "finish",
        },
        config
      )
      .then((res) => {
        console.log(res);
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
                <Typography>Order {index + 1}</Typography>
                {value.checkedoutcartdetail?.map((data, index) => (
                  <Box key={index} sx={{ display: "flex" }}>
                    <Typography>{data.productname}</Typography>
                    <Typography sx={{ marginLeft: "5px" }}>
                      , Jumlah: {data.qty}
                    </Typography>
                  </Box>
                ))}
                <Typography>{value.totalprice}</Typography>
                <Typography>{value.status}</Typography>
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
                    display: `${value.status === "confirm" ? "flex" : "none"}`,
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
        Loading
      </Box>
    );
  }
}

export default History;
