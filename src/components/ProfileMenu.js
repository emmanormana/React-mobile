import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ProfileMenu() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
export default ProfileMenu;
