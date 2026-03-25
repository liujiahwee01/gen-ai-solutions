import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode, // "light" or "dark"
      primary: {
        main: mode === "light" ? "#2583ef" : "#ffffff",
      },
      background: {
        default: mode === "light" ? "#e6e6e7" : "#000000", // page
        paper: mode === "light" ? "#ffffff" : "1e1e1e", // cards, surfaces
      },
      text: {
        primary: mode === "light" ? "#000000" : "#ffffff",
        secondary: "#000000",
      },
    },
  });
