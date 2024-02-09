import React from "react";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import "../assets/css/Header.css";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {["Add Appointment", "View Appointments"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link className="logoLink">LOGO</Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer("left", true)}
              color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
          <Link className="logoLinkMobile" to="/">
            LOGO
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Add Appointment
              </Button>
            </Box>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                View Appointments
              </Button>
            </Box>
          </Link>
        </Toolbar>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}>
          {list("left")}
        </Drawer>
      </Container>
    </AppBar>
  );
};

export default Header;
