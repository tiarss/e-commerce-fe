import React, { useEffect, useState, useContext, ContextType } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import logo from "../images/Logo-sirclo-white.png";
import { InputText2 } from "../components/InputText";
import {
  CustomButtonPrimary,
  CustomButtonSecondary,
} from "../components/CustomButton";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";
import { alertType, authTypes } from "../Types";
import { useNavigate } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const LoginPage: React.FC = () => {
  let navigate = useNavigate();
  const [auth, setAuth] = useLocalStorage<authTypes[]>("auth", []);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [disabledVal, setDisabled] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alert, setAlert] = useState<alertType>({
    message: "",
    status: "info",
  });

  const isAuthenticated = localStorage.getItem("isAuth");
  useEffect(() => {}, []);

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const fetchData = async () => {
    if (email === "") {
      setEmailError("Email is required");
    } else if (password === "") {
      setPasswordError("Password is required");
    } else if (emailError === "") {
      setDisabled(true);
      await axios
        .post("/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          const { data } = res.data;
          setAuth([
            {
              id: data.id,
              token: data.token,
              isAuth: true,
            },
          ]);
          if (data.message === "successful") {
            setAlert({
              message: "Login Berhasil",
              status: "error",
            });
            setOpenAlert(true);
          }
          navigate(`/`);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPassword("");
          setEmailError("");
          setPasswordError("");
          setEmail("");
        });
    }
  };
  const signUp = () => {
    navigate(`/signup`);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    let regexpEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
    if (!regexpEmail.test(e.target.value)) {
      setEmailError("it's not an email bro");
    } else {
      setEmailError("");
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    var len = e.target.value.length;
    if (len > 20) {
      setEmailError("your's is too long");
    } else {
      setEmailError("");
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          fontFamily: "Nunito",
          backgroundColor: "white",
          height: "600px",
          justifyContent: "center",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: { xs: "20px", sm: "40px", md: "0px" },
        }}>
        <Box
          sx={{
            display: "flex",
            width: { xs: "286px", sm: "100%", md: "50%" },
            height: { xs: "101px", sm: "350px", md: "1000px" },
            alignItems: "center",
            fontFamily: "Nunito",
            background: "linear-gradient(180deg, #2296CB 0%, #1767A0 100%)",
            margin: { xs: "10%", sm: "0px" },
            justifyContent: "center",
          }}>
          <Box
            sx={{
              width: { xs: "200px", sm: "350px" },
              justifyContent: "center",
              alignItems: "center",
            }}>
            <img style={{ width: "100%" }} src={logo} alt='logo-sirclo' />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "50%",
            alignItems: "center",
            fontFamily: "Nunito",
            height: "600px",
            justifyContent: "center",
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}>
            <h1 style={{ color: "#309DCE", fontSize: "48px" }}>Login</h1>
            <Box
              sx={{
                width: { xs: "327px", sm: "440px" },
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}>
              <InputText2
                textLabel='Email'
                type='email'
                onChange={(e) => handleEmail(e)}
              />
              <span style={{ color: "red" }}>{emailError}</span>
              <InputText2
                textLabel='Password'
                type='password'
                onChange={(e) => handlePassword(e)}
              />
              <span style={{ color: "red" }}>{passwordError}</span>
              {/* <button onClick={fetchData}>Login </button> */}
            </Box>
            <Box
              sx={{
                width: { xs: "164px", sm: "220px" },
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}>
              <CustomButtonPrimary
                isDisabled={disabledVal}
                caption='Login'
                OnClick={fetchData}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "327px", sm: "440px" },
                display: "flex",
                flexDirection: "row",
              }}>
              <p>
                Don’t have any account? Please{" "}
                <span onClick={signUp} style={{ color: "#2296CB" }}>
                  {" "}
                  Sign Up{" "}
                </span>{" "}
                Here
              </p>
            </Box>
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
    </div>
  );
};

export default LoginPage;
