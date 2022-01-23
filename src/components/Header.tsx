import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import logo from "../images/Logo-sirclo.png";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CustomButtonSecondary } from "./CustomButton";
import "@fontsource/nunito";
import { useNavigate } from "react-router-dom";
import Burger from "./Burger";
import { useLocalStorage } from "../utils/useLocalStorage";
import { authTypes } from "../Types";
import axios from "axios"

function Header() {
  const [auth, setAuth] = useLocalStorage<authTypes[] | undefined>("auth", []);
  const [userName, setUserName] = useState<string>("")
  const [userImage, setUserImage] = useState<string>("")
  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate("login");
  };
  useEffect(()=>{
    fetchNameUserID()
  },[])


  let isAuth: boolean | undefined;
  if (auth === undefined) {
    isAuth = false;
  } else {
    isAuth = auth[0]?.isAuth;
  }

  const fetchNameUserID = async () => {
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
      .get(`/users/${id}`, config)
      .then((res) => {
        const { data } = res.data;
        console.log(data)
        setUserName(data.name);
        setUserImage(data.image);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
    
      });
  };

  console.log(userImage)
  return (
    <Box
      sx={{
        display: "flex",
        height: "80px",
        padding: { xs: "17px 20px", sm: "10px 50px" },
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.250);",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <img style={{ height: "40px" }} src={logo} alt='logo-sirclo' />
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2296CB",
            height: "40px",
            width: { xs: "270px", sm: "300px" },
            borderRadius: "10px",
          }}>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <SearchRoundedIcon sx={{ color: "white" }} />
            <Typography sx={{ color: "white", fontFamily: "Nunito" }}>
              Search
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: "20px",
        }}>
        <Box
          sx={{
            padding: "5px 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2296CB",
            height: "40px",
            borderRadius: "10px",
            gap: "10px",
          }}>
          <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
          <Typography sx={{ color: "white" }}>2</Typography>
        </Box>
        {isAuth? (
          <Box sx={{display: "flex", alignItems: "center"}} onClick={()=> navigate('/profilePage')}>
            <Box sx={{width: "40px", height: "40px", borderRadius: "20px", overflow: "hidden"}}>
              <img style={{width: "40px"}} src={userImage} alt="" />
            </Box>
            <Typography sx={{marginLeft: "10px"}}>{userName?.substring(0, 7) + "..."}</Typography>
          </Box>
        ) : (
          <Box>
            <CustomButtonSecondary caption='Log In' OnClick={handleToLogin} />
          </Box>
        )}
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Burger isAuth={isAuth ? true : false} />
      </Box>
    </Box>
  );
}

export default Header;
