import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

function Navbar({ toggleTheme, mode }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          color="text.primary"
          style={{
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontWeight: "bold",
          }}
        >
          AI Agent
        </Typography>
        {/* <Link to="/">Home</Link>
        <Link to="/upload">Transcribe</Link> */}
        {/* {mode} mode */}
        <Switch
          checked={mode == "light" ? true : false}
          onClick={toggleTheme}
        />
        <IconButton onClick={toggleTheme}>
          {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
