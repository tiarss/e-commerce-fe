import { Box, IconButton, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import Header from "../components/Header";
import CardsHome from "../components/CardsHome";
import "@fontsource/nunito/700.css";

function HomePage() {
  const [categoryOpenMenu, setCategoryOpenMenu] = useState<null | HTMLElement>(
    null
  );
  const [sortOpenMenu, setSortOpenMenu] = useState<null | HTMLElement>(null);
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

  return (
    <Box>
      <Header />
      <Box sx={{ padding: "50px 100px 0px 100px" }}>
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
        <Box>
          <CardsHome />
        </Box>
      </Box>
      <Box>{/* Pagination */}</Box>
    </Box>
  );
}

export default HomePage;
