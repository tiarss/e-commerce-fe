import React from "react";
import { InputText2 } from "../components/InputText";
import { Button } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import logo from "../images/Logo-sirclo-white.png";
import { CustomButtonPrimary } from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  let navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [disabledVal, setDisabled] = useState<boolean>(false);
  useEffect(() => {}, []);

  const fetchData = async () => {
    if (name === "") {
      setNameError("Name is required");
    } else if (email === "") {
      setEmailError("Email is required");
    } else if (email === "") {
      setPasswordError("Password is required");
    } else if (emailError === "") {
      setDisabled(true);
      await axios
        .post("/users", {
          name: name,
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          navigate(`/login`);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPassword("");
          setName("");
          setEmail("");
        });
    }
  };
  const login = () => {
    navigate(`/login`);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    var len = e.target.value.length;
    if (len > 20) {
      setNameError("your's is too long");
    } else {
      setNameError("");
    }
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
          <h1 style={{ color: "#309DCE", fontSize: "48px" }}>Sign Up</h1>
          <Box
            sx={{
              width: { xs: "327px", sm: "440px" },
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}>
            <InputText2
              value={name}
              textLabel='Nama'
              type='text'
              onChange={(e) => handleName(e)}
            />
            <span style={{ color: "red" }}>{nameError}</span>
            <InputText2
              value={email}
              textLabel='Email'
              type='email'
              onChange={(e) => handleEmail(e)}
            />
            <span style={{ color: "red" }}>{emailError}</span>
            <InputText2
              value={password}
              textLabel='Password'
              type='password'
              onChange={(e) => handlePassword(e)}
            />
            <span style={{ color: "red" }}>{passwordError}</span>
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
              caption='Sign Up'
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
              Have any account? Please{" "}
              <span onClick={login} style={{ color: "#2296CB" }}>
                {" "}
                Login{" "}
              </span>{" "}
              Here
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
