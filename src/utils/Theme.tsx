import { createTheme } from "@mui/material";
import "@fontsource/nunito"

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
         @font-face {
           font-family: 'Nunito';
           font-style: normal;
           font-display: swap;
           font-weight: 400;
         }
       `,
    },
  },
});

export default theme;
