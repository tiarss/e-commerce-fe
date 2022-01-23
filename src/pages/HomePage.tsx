import { Box, Grid, IconButton, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import React, { useState, useEffect } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import Header from "../components/Header";
import CardsHome from "../components/CardsHome";
import "@fontsource/nunito/700.css";
import Footer from "../components/Footer";
import axios from "axios";
import { dataProductTypes } from "../Types";

function HomePage() {
  const dataProductDefault: dataProductTypes[] = [];
  const [categoryOpenMenu, setCategoryOpenMenu] = useState<null | HTMLElement>(
    null
  );
  const [sortOpenMenu, setSortOpenMenu] = useState<null | HTMLElement>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const [product, setProduct] = useState(dataProductDefault);
  const openCategory = Boolean(categoryOpenMenu);
  const openSort = Boolean(sortOpenMenu);

  const handleClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategoryOpenMenu(event.currentTarget);
  };

  const handleClickSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortOpenMenu(event.currentTarget);
  };

  const handleCloseCategory = () => {
    setCategoryOpenMenu(null);
  };

  const handleCloseSort = () => {
    setSortOpenMenu(null);
  };

  useEffect(() => {
    fetchDataAllProduct();
  }, []);

  const fetchDataAllProduct = async () => {
    await axios
      .get("/products")
      .then((res) => {
        const { data } = res.data;
        setProduct(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReady(true);
      });
  };
  console.log(product);

  if (isReady) {
    return (
      <Box>
        <Header />
        <Box
          sx={{
            padding: {
              xs: "50px 30px 0px 30px",
              sm: "50px 40px 0px 40px",
              md: "50px 100px 0px 100px",
            },
          }}>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Typography
              sx={{
                fontFamily: "Nunito",
                fontWeight: "700",
                fontSize: "36px",
                color: "#2296CB",
              }}>
              All Products
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            {/* Sub Header */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                id='sort-button'
                aria-controls={openSort ? "basic-menu" : undefined}
                aria-haspopup='true'
                aria-expanded={openSort ? "true" : undefined}
                onClick={handleClickSort}
                size='small'
                sx={{
                  backgroundColor: "#2296CB",
                  borderRadius: "5px",
                  "&:hover": { backgroundColor: "#2296CB" },
                }}>
                <FilterListRoundedIcon sx={{ color: "white" }} />
              </IconButton>
              <Menu
                id='basic-menu'
                anchorEl={sortOpenMenu}
                open={openSort}
                onClose={handleCloseSort}
                MenuListProps={{
                  "aria-labelledby": "sort-button",
                }}>
                <MenuItem onClick={handleCloseSort}>Profile</MenuItem>
                <MenuItem onClick={handleCloseSort}>My account</MenuItem>
                <MenuItem onClick={handleCloseSort}>Logout</MenuItem>
              </Menu>
              <Typography
                sx={{
                  marginLeft: "10px",
                  fontFamily: "Nunito",
                  fontWeight: "700",
                }}>
                Urutkan
              </Typography>
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Typography
                sx={{
                  fontFamily: "Nunito",
                  fontWeight: "700",
                  fontSize: "36px",
                  color: "#2296CB",
                }}>
                All Products
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  marginRight: "10px",
                  fontFamily: "Nunito",
                  fontWeight: "700",
                }}>
                Kategori
              </Typography>
              <IconButton
                id='category-button'
                aria-controls={openCategory ? "basic-menu" : undefined}
                aria-haspopup='true'
                aria-expanded={openCategory ? "true" : undefined}
                onClick={handleClickCategory}
                size='small'
                sx={{
                  backgroundColor: "#2296CB",
                  borderRadius: "5px",
                  "&:hover": { backgroundColor: "#2296CB" },
                }}>
                <FilterAltRoundedIcon sx={{ color: "white" }} />
              </IconButton>
              <Menu
                id='basic-menu'
                anchorEl={categoryOpenMenu}
                open={openCategory}
                onClose={handleCloseCategory}
                MenuListProps={{
                  "aria-labelledby": "category-button",
                }}>
                <MenuItem onClick={handleCloseCategory}>Profile</MenuItem>
                <MenuItem onClick={handleCloseCategory}>My account</MenuItem>
                <MenuItem onClick={handleCloseCategory}>Logout</MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Card Grid */}
          <Grid
            container
            spacing={1}
            sx={{
              maxWidth: "1300px",
              justifyContent: {
                xs: "space-between",
                sm: "space-evenly",
                md: "space-between",
              },
            }}>
            {product.map((value) => (
              <Grid item key={value.id}>
                <CardsHome
                  name={value.name}
                  image={value.image}
                  price={value.price}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "30px 0px",
            }}>
            <Pagination
              count={10}
              variant='outlined'
              shape='rounded'
              sx={{
                ".MuiButtonBase-root": {
                  fontFamily: "Nunito",
                  fontWeight: "700",
                  color: "white",
                  backgroundColor: "#2296CB",
                  outline: "none",
                  border: "none",
                },
                ".MuiButtonBase .Mui-selected": {
                  backgroundColor: "#1767A0",
                },
                ".MuiButtonBase-root:hover": {
                  backgroundColor: "#1767A0",
                },
              }}
            />
          </Box>
        </Box>
        <Footer />
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography>Loading</Typography>
      </Box>
    );
  }
}

export default HomePage;
