import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: red[800],
    },
    background: { default: "#FAFAFA" },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableFocusRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
