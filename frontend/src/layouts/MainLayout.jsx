import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

function MainLayout({ toggleTheme, mode }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Navbar toggleTheme={toggleTheme} mode={mode} />
      {/* page content */}
      <div>
        <Outlet />
      </div>
    </Box>
  );
}

export default MainLayout;
