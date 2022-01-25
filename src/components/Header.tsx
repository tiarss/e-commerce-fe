import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import logo from "../images/Logo-sirclo.png";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LoginRounded from "@mui/icons-material/LoginRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Avatar from "@mui/material/Avatar";
import Logout from "@mui/icons-material/Logout";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CustomButtonSecondary } from "./CustomButton";
import "@fontsource/nunito";
import { useNavigate, useParams } from "react-router-dom";
import Burger from "./Burger";
import { useLocalStorage } from "../utils/useLocalStorage";
import { authTypes, countShopType, headerHandlerType } from "../Types";
import axios from "axios";
import "./Header.css";
import { SearchContext } from "../context/SearchContext";

function Header({handleGetText, handleSendText} :headerHandlerType) {
  const params = useParams()
  console.log(params)
  
  const [auth, setAuth] = useLocalStorage<authTypes[] | undefined>("auth", []);
  const [count, setCount] = useLocalStorage<countShopType[]>("count", []);
  const [userName, setUserName] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toLogin = () => {
    navigate("/login");
  };

  const toShopping = () => {
    navigate("/shop");
  };

  const toProfile = () => {
    navigate("/profilepage");
  };

  const toHome = () => {
    navigate("/");
  };


  useEffect(() => {
    fetchNameUserID();
  }, []);

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
        console.log(data);
        setUserName(data.name);
        setUserImage(data.image);
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message === "invalid or expired jwt") {
          setAuth([
            {
              id: 0,
              token: "",
              isAuth: false,
            },
          ]);
        }
        console.log(err.response);
      })
      .finally(() => {});
  };

  const handleLogOut = () => {
    setAuth([
      {
        id: 0,
        token: "",
        isAuth: false,
      },
    ]);
    navigate("/");
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: "0",
        zIndex: "2",
        display: "flex",
        height: "80px",
        backgroundColor: "white",
        padding: { xs: "17px 20px", sm: "10px 50px" },
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.250);",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <img
          style={{ height: "40px", cursor: "pointer" }}
          src={logo}
          alt='logo-sirclo'
          onClick={() => navigate("/")}
        />
      </Box>
      <Box>
        <Box
          sx={{
            display: `${params! ? "flex": "none"}`,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2296CB",
            height: "40px",
            width: { xs: "270px", sm: "300px" },
            borderRadius: "10px",
          }}>
          <Box
          onClick={handleSendText}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <SearchRoundedIcon sx={{ color: "white" }} />
            <input
              onChange={handleGetText}
              className='input-search'
              type='text'
              style={{ outline: "none", border: "none", background: "#2296CB" }}
              placeholder='Search'
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: "20px",
        }}>
        <Tooltip title='Shopping Cart'>
          <Box
            onClick={toShopping}
            sx={{
              cursor: "pointer",
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
            <Typography sx={{ color: "white", fontFamily: "Nunito" }}>
              {count === undefined ? 0 : count![0].count}
            </Typography>
          </Box>
        </Tooltip>
        {isAuth ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}>
              <Tooltip title='Menu'>
                <Button
                  onClick={handleClick}
                  size='small'
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "white",
                    textTransform: "none",
                    padding: "7px 10px",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      backgroundColor: "#e3f6ff",
                    },
                  }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? "true" : undefined}>
                  <Avatar
                    src={userImage}
                    sx={{ width: "25px", height: "25px" }}
                  />

                  <Typography sx={{ fontFamily: "Nunito", marginLeft: "10px" }}>
                    {userName?.substring(0, 7) + "..."}
                  </Typography>
                </Button>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id='account-menu'
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
              <MenuItem
                sx={{ display: `${isAuth ? "flex" : "none"}` }}
                onClick={toProfile}>
                <Avatar
                  src={userImage}
                  sx={{ width: "10px", height: "10px" }}
                />
                <Typography sx={{ fontFamily: "Nunito" }}>Profile</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={toHome}>
                <ListItemIcon>
                  <HomeRoundedIcon fontSize='small' />
                </ListItemIcon>
                <Typography sx={{ fontFamily: "Nunito" }}>Home</Typography>
              </MenuItem>
              <MenuItem
                onClick={toLogin}
                sx={{ display: `${isAuth ? "none" : "flex"}` }}>
                <ListItemIcon>
                  <LoginRounded fontSize='small' />
                </ListItemIcon>
                <Typography sx={{ fontFamily: "Nunito" }}>Login</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleLogOut}
                sx={{ display: `${isAuth ? "flex" : "none"}` }}>
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <CustomButtonSecondary caption='Log In' OnClick={toLogin} />
          </Box>
        )}
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Burger isAuth={isAuth} name={userName} onLogOut={handleLogOut} />
      </Box>
    </Box>
  );
}

export default Header;
