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
import { dataProductTypes, toSendCart } from "../Types";
import { useLocalStorage } from "../utils/useLocalStorage";

function HomePage() {
  const dataProductDefault: dataProductTypes[] = [];
  const [categoryOpenMenu, setCategoryOpenMenu] = useState<null | HTMLElement>(
    null
  );

  const [addCarts, setAddCarts] = useLocalStorage<dataProductTypes[]>('cart',[])
  const [toSendCarts, setToSendCarts] = useLocalStorage<toSendCart[]>('storeSend',[])
  const [countProducts, seCountProducts] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  const [product, setProduct] = useState(dataProductDefault);
  const openCategory = Boolean(categoryOpenMenu);

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchDataByPage(value);
  };

  const addtoCart = (id:number)=>{
    let carts = addCarts
    if(carts !== undefined){
      axios.get(`/products/${id}`).then((res)=>{
        const {data} = res.data
        carts!.push(data)
        setAddCarts(carts)
      })
    }else{
      console.log("test")
    }
    const idCart = id
    // setAddCarts()

  }

  const fetchDataByPage = async (page: number) => {
    await axios
      .get("/products", {
        params: {
          p: page,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setProduct(data.products);
        seCountProducts(data.counts)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDataByCategory = async (category: string) => {
    await axios
      .get("/products", {
        params: {
          category: category,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setProduct(data.products);
        seCountProducts(data.counts)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategoryOpenMenu(event.currentTarget);
  };
  const handleCategoryProcessor = () => {
    const category: string = "Processor";
    fetchDataByCategory(category);
  };

  const handleCategoryGraphic = () => {
    const category: string = "Graphic Card";
    fetchDataByCategory(category);
  };

  const handleCategoryRAM = () => {
    const category: string = "RAM";
    fetchDataByCategory(category);
  };

  const handleCategoryInternalStorage = () => {
    const category: string = "Internal Storage";
    fetchDataByCategory(category);
  };

  const handleCloseCategory = () => {
    setCategoryOpenMenu(null);
  };

  useEffect(() => {
    fetchDataAllProduct();
  }, []);

  const fetchDataAllProduct = async () => {
    await axios
      .get("/products")
      .then((res) => {
        const { data } = res.data;
        setProduct(data.products);
        seCountProducts(data.counts)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReady(true);
      });
  };

  const handleToDetails = (id: number) => {

    
  };
  console.log(product);

  if (isReady) {
    return (
      <Box>
        <Box
          sx={{
            minHeight: "900px",
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
                <MenuItem onClick={fetchDataAllProduct}>All Category</MenuItem>
                <MenuItem onClick={handleCategoryProcessor}>Processor</MenuItem>
                <MenuItem onClick={handleCategoryGraphic}>
                  Graphic Card
                </MenuItem>
                <MenuItem onClick={handleCategoryRAM}>RAM</MenuItem>
                <MenuItem onClick={handleCategoryInternalStorage}>
                  Internal Storage
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Card Grid */}
          <Grid
            container
            spacing={4}
            sx={{
              maxWidth: "1300px",
              minHeight: "800px",
              justifyContent: {
                xs: "space-between",
                sm: "space-evenly",
                md: "flex-start",
              },
            }}>
            {product.map((value) => (
              <Grid item key={value.id}>
                <CardsHome
                  name={value.name}
                  image={value.image}
                  price={value.price}
                  OnClick={() => handleToDetails(value.id)}
                  AddCart={() => addtoCart(value.id)}
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
              page={page}
              onChange={handleChange}
              sx={{
                ".MuiButtonBase-root": {
                  fontFamily: "Nunito",
                  fontWeight: "700",
                  color: "white",
                  backgroundColor: "#2296CB",
                  outline: "none",
                  border: "none",
                },
                ".Mui-selected": {
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
