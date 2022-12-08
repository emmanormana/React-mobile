import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export default function Balance({ width, amount }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        id="profile-drop-down-menu"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          width: "100%",
          color: "black",
          backgroundColor: grey[400],
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "white",
          },
        }}
      >
        Balance
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem sx={{ width: { xs: 100, sm: 310 } }} onClick={handleClose}>
          {amount}
        </MenuItem>
      </Menu>
    </div>
  );
}
