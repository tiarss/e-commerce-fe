import React,{useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Avatar } from "@mui/material";

import "@fontsource/nunito/700.css";
import BiodataDiri from "./BiodataDiri";
import Barangku from "./Barangku";
import History from "./History";
import Footer from "../components/Footer";

function ProfilePage() {
  const [value, setValue] = React.useState("biodata");
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Header isHidden={isHidden} />
      <Box
        sx={{
          padding: {
            xs: "50px 30px 0px 30px",
            sm: "50px 40px 0px 40px",
            md: "50px 100px 0px 100px",
          },
        }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: "60px",
              height: "60px",
              overflow: "hidden",
              borderRadius: "60px",
            }}>
            <Avatar sx={{ width: "60px", height: "60px" }} />
          </Box>
          <Typography
            sx={{
              marginLeft: "20px",
              fontFamily: "Nunito",
              fontWeight: "700",
              fontSize: "36px",
              color: "#2296CB",
            }}>
            Profile
          </Typography>
        </Box>
        <Box sx={{ marginTop: "20px", borderBottom: "solid 2px #1767A0" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              ".MuiTab-root": {
                textTransform: "none",
                fontFamily: "Nunito",
                fontSize: "18px",
                fontWeight: "700",
              },
              ".MuiTabs-indicator": {
                backgroundColor: "#1767A0",
                borderRadius: "10px",
                height: "5px",
                bottom: "-3px",
              },
            }}
            aria-label='wrapped label tabs example'>
            <Tab
              value='biodata'
              label='Biodata Diri'
              sx={{
                ".MuiButtonBase .Mui-selected": {
                  color: "red",
                },
              }}
              wrapped
            />
            <Tab value='barangku' label='Barangku' />
            <Tab value='histori' label='Histori Pemesanan' />
          </Tabs>
        </Box>
        {value === "biodata" ? (
          <BiodataDiri />
        ) : value === "barangku" ? (
          <Barangku />
        ) : (
          <History />
        )}
      </Box>
      <Footer />
    </Box>
  );
}

export default ProfilePage;
