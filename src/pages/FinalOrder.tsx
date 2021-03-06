import Header from "../components/Header";
import Footer from "../components/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import { Alert, Box } from "@mui/material";
import { InputText2, InputText3 } from "../components/InputText";
import SummaryDetail from "../components/SummaryDetail";
import { CustomButtonPrimary } from "../components/CustomButton";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { authTypes } from "../Types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { alertType, dataUserIDTypes } from "../Types";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

function FinalOrder() {
  const [streetOrder, setStreetOrder] = useState<string>("");
  const [cityOrder, setCityOrder] = useState<string>("");
  const [provinceOrder, setProvinceOrder] = useState<string>("");
  const [zipCodeOrder, setZipCodeOrder] = useState<string>("");
  const [cardOrder, setCardOrder] = useState<string>("");

  const [streetError, setStreetError] = useState<string>("");
  const [cityError, setCityError] = useState<string>("");
  const [provinceError, setProvinceError] = useState<string>("");
  const [zipCodeError, setZipCodeError] = useState<string>("");
  const [cardError, setCardError] = useState<string>("");

  const [disabled, setDisabled] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const navigate = useNavigate();
  const dataUserDefault: dataUserIDTypes[] = [];
  const [auth, setAuth] = useLocalStorage<authTypes[] | undefined>("auth", []);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const [qty, setQtyOrder] = useState<number>(0);
  const [shipping, setShippingOrder] = useState<string>("");
  const [price, setPriceOrder] = useState<string>("");
  const [idCart, setIdCart] = useState<number>(0);

  const [openAlert, setOpenAlert] = React.useState(false);
  const [alert, setAlert] = useState<alertType>({
    message: "",
    status: "info",
  });
  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleStreet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStreetOrder(value);
    var len = event.target.value.length;
    if (len > 100) {
      setStreetOrder(" is too long");
    } else if (len >= 0) {
      setStreetError("");
    } else {
      setStreetError("");
    }
  };

  const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCityOrder(value);
    var len = event.target.value.length;
    if (len > 100) {
      setCityOrder(" is too long");
    } else if (len >= 0) {
      setCityError("");
    } else {
      setCityError("");
    }
  };

  const handleProvince = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProvinceOrder(value);
    var len = event.target.value.length;
    if (len > 100) {
      setProvinceOrder(" is too long");
    } else if (len >= 0) {
      setProvinceError("");
    } else {
      setProvinceError("");
    }
  };

  const handleZipCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setZipCodeOrder(value);
    var len = event.target.value.length;
    if (len > 100) {
      setZipCodeOrder(" is too long");
    } else if (len >= 0) {
      setZipCodeError("");
    } else {
      setZipCodeError("");
    }
  };

  const handleCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCardOrder(value);
    var len = event.target.value.length;
    if (len > 100) {
      setCardOrder(" is too long");
    } else if (len >= 0) {
      setCardError("");
    } else {
      setCardError("");
    }
  };

  const handlePurchase = async () => {
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

    if (streetOrder === "") {
      setStreetError(" is required");

    } else if (cityOrder === "") {
      setCityError(" is required");
    } else if (provinceOrder === null) {
      setProvinceError(" cannot be null");
    } else if (zipCodeOrder === "") {
      setZipCodeError(" min 1");
    } else if (cardOrder === "") {
      setCardError(" is required");
    } else if (
      streetError === "" &&
      cityError === "" &&
      provinceError === "" &&
      zipCodeError === "" &&
      cardError === ""
    ) {
      setDisabled(false);

      await axios
        .put(
          `/carts/${idUser}/${idCart}`,
          {
            address: {
              street: streetOrder,
              city: cityOrder,
              province: provinceOrder,
              zipcode: zipCodeOrder,
            },
            cardnumber: cardOrder,
          },
          config
        )
        .then((res) => {

          setAlert({
            message: "Barang Berhasil di Order",
            status: "success",
          });
          setTimeout(() => {
            navigate(`/`);
          }, 500);
        })
        .catch((err) => {
          const { data } = err.response;
          if (data.message === "invalid or expired jwt") {
            setAlert({
              message: "Login Expired",
              status: "error",
            });
            setAuth([
              {
                id: 0,
                token: "",
                isAuth: false,
              },
            ]);
            setOpenAlert(true);
            navigate("/login");
          }
        })
        .finally(() => {
          setIsReady(true);
        });
    }
  };

  const fetchData = async () => {
    let token: string | undefined;
    let id: number | undefined;
    if (auth === undefined) {
      token = "";
      id = 0;
    } else {
      token = auth[0].token;
      id = auth[0].id;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`/carts/${id}`, config)
      .then((res) => {
        const { data } = res.data;
        // setQtyOrder(data.products);
        setShippingOrder("Free");
        setPriceOrder(data.shoppingcart.totalprice);
        setIdCart(data.shoppingcart.id);
        setQtyOrder(data.totalqty);
      })
      .catch((err) => {
        console.log(err);
        const { data } = err.response;
        if (data.message === "invalid or expired jwt") {
          setAlert({
            message: "Login Expired",
            status: "error",
          });
          setAuth([
            {
              id: 0,
              token: "",
              isAuth: false,
            },
          ]);
          setOpenAlert(true);
          navigate("/login");
        }
      })
      .finally(() => {
        setIsReady(true);
      });
  };

  return (
    <Box>
      <Header isHidden={isHidden} />
      <Box
        sx={{
          padding: { xs: "5%", sm: "10%", md: "5% 20%" },
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}>
        <h1 style={{ color: "#2296CB", textDecoration: "underline" }}>
          Final Order
        </h1>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2vh",
          }}>
          <InputText2
            textLabel='Shipping Address'
            placeholder='Street'
            type='text'
            onChange={(e) => handleStreet(e)}
            errorVal={streetError}
          />
          <InputText2
            placeholder='City'
            type='text'
            onChange={(e) => handleCity(e)}
            errorVal={cityError}
          />
          <InputText2
            placeholder='State/Province'
            type='text'
            onChange={(e) => handleProvince(e)}
            errorVal={provinceError}
          />
          <InputText2
            placeholder='Zipcode'
            type='text'
            onChange={(e) => handleZipCode(e)}
            errorVal={zipCodeError}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2vh",
          }}>
          <InputText2
            placeholder='Number on Card'
            type='text'
            onChange={(e) => handleCard(e)}
            errorVal={cardError}
          />
        </Box>
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
          }}>
          <Box></Box>
          <Box>
            <SummaryDetail
              qty={qty}
              shipping={shipping}
              sumPrice={parseInt(price)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "end",
            display: "flex",
          }}>

          <Box
            sx={{
              width: { xs: "164px", sm: "220px" },
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}>
            <CustomButtonPrimary
              isDisabled={disabled}
              caption='Purchase'
              OnClick={handlePurchase}
            />
          </Box>
        </Box>
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
      <Footer />
    </Box>
  );
}

export default FinalOrder;
