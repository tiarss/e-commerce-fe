import { Box, Grid, IconButton, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import React, { useState, useEffect, useContext } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import CardsHome from "../components/CardsHome";
import Header from "../components/Header"
import "@fontsource/nunito/700.css";
import Footer from "../components/Footer";
import axios from "axios";
import { authTypes, countShopType, dataProductTypes, toSendCart } from "../Types";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

function HomePage() {
  const dataProductDefault: dataProductTypes[] = [];
  const [categoryOpenMenu, setCategoryOpenMenu] = useState<null | HTMLElement>(
    null
  );
  let navigate = useNavigate();
  const Search = useContext(SearchContext);
  const [auth, setAuth] = useLocalStorage<authTypes[] | undefined>("auth", []);
  const [textSend, setTextSend] = useState<string>("")
  const [countProducts, setCountProducts] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const [product, setProduct] = useState(dataProductDefault);
  const [categoryPage, setCategoryPage] = useState<string>("All Category");
  const openCategory = Boolean(categoryOpenMenu);

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if(categoryPage === "All Category"){
      fetchDataByPage(value);
    }else if(categoryPage === "Processor"){
      fetchDataByPageCategory(value)
    
    }else if(categoryPage === "Graphic Card"){
      fetchDataByPageCategory(value)
    
    }else if(categoryPage === "RAM"){
      fetchDataByPageCategory(value)
    
    }else if(categoryPage === "Internal Storage"){
      fetchDataByPageCategory(value)
    }
  };

  const fetchDataByKeyword = async () =>{
    await axios
      .get("/products", {
        params: {
          keyword: textSend,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setProduct(data.products);
        setCountProducts(data.counts);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const addtoCart = (id: number) => {
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
      .post(
        `/carts/${idUser}`,
        {
          productid: id,
        },
        config
      )
      .then((res) => {
        
      });
  };

  const fetchDataByPageCategory = async (page: number) => {
    await axios
      .get("/products", {
        params: {
          p: page,
          category: categoryPage
        },
      })
      .then((res) => {
        const { data } = res.data;
        setProduct(data.products);
        setCountProducts(data.counts)
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        setCountProducts(data.counts);
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
        setCountProducts(data.counts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategoryOpenMenu(event.currentTarget);
  };

  const handleAllCategory = () =>{
    const category: string = "All Category";
    setCategoryPage(category)
    fetchDataAllProduct()
  }

  const handleCategoryProcessor = () => {
    const category: string = "Processor";
    setCategoryPage(category)
    fetchDataByCategory(category);
  };

  const handleCategoryGraphic = () => {
    const category: string = "Graphic Card";
    setCategoryPage(category)
    fetchDataByCategory(category);
  };

  const handleCategoryRAM = () => {
    const category: string = "RAM";
    setCategoryPage(category)
    fetchDataByCategory(category);
  };

  const handleCategoryInternalStorage = () => {
    const category: string = "Internal Storage";
    setCategoryPage(category)
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
        setCountProducts(data.counts);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReady(true);
      });
  };

  const handleToDetails = (id: number) => {
    const idProduct: number = id;
    navigate(`/detailproduct/` + id);
  };

  const handleGetText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value;
    setTextSend(values)
  };

  const handleSendText = () =>{
    fetchDataByKeyword()
  }

  if (isReady) {
    return (
      <Box>
        <Header handleGetText={(e)=>handleGetText(e)} handleSendText={handleSendText} isHidden={isHidden}/>
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
                <MenuItem onClick={handleAllCategory}>All Category</MenuItem>
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
              count={Math.ceil(countProducts / 10)}
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
