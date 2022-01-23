import { Button, Typography } from "@mui/material";
import "@fontsource/nunito/700.css";

function CustomButtonSecondary({ caption, OnClick }: { caption: string, OnClick: ()=>void }) {
  return (
    <Button
    onClick={OnClick}
      sx={{
        borderRadius: "10px",
        border: "2px solid #2296CB",
        backgroundColor: "white",
        textTransform: "none",
        padding: "0px",
        transition: "all 0.4s ease",
        "&:hover": {
          backgroundColor: " #2296CB",
        },
      }}>
      <Typography
        sx={{
          fontFamily: "Nunito",
          color: "#2296CB",
          padding: "6px 15px",
          fontWeight: "700",
          transition: "all 0.4s ease",
          "&:hover": {
            color: "white",
          },
        }}>
        {caption}
      </Typography>
    </Button>
  );
}

function CustomButtonPrimary({ caption, OnClick }: { caption: string, OnClick: ()=>void }) {
  return (
    <Button
      onClick={OnClick}
      sx={{
        borderRadius: "10px",
        border: "2px solid #2296CB",
        backgroundColor: "#2296CB",
        textTransform: "none",
        padding: "0px",
        transition: "all 0.4s ease",
        "&:hover": {
          backgroundColor: "#1767A0",
          border: "2px solid #1767A0",
        },
      }}>
      <Typography
        sx={{
          fontFamily: "Nunito",
          color: "white",
          padding: "6px 15px",
          fontWeight: "700",
        }}>
        {caption}
      </Typography>
    </Button>
  );
}

export { CustomButtonPrimary, CustomButtonSecondary };
