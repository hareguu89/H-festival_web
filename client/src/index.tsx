import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import GlobalFonts from "./font/font";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GlobalFonts />
      <App />
    </ThemeProvider>
  </>,
  document.getElementById("root"),
);
