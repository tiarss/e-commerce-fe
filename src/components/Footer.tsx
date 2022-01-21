import Box from "@mui/material/Box";
import logowhite from "../images/Logo-sirclo-white.png"
function Footer() {
  return (
    <Box sx={{backgroundColor: "#2296CB", height: {xs: "250px", md:"100px"}, display: "flex", alignItems: "center", padding: "10px 50px"}}>
       <img style={{height: "40px"}} src={logowhite} alt="" />
    </Box>
  );
}

export default Footer;
