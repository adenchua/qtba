import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[800],
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
