import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Layout({ children }) {
  const navigate = useNavigate();

  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    // Navigate to the login page
    navigate("/login");
  };

  const routesWithoutSidebar = ["/login","/forgotPassword","/reset-password"];

  // const hideSidebar = routesWithoutSidebar.includes(location.pathname);
  const hideSidebar = routesWithoutSidebar.some(path => location.pathname.startsWith(path));

  return (
    <>
      {!hideSidebar && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                SFRS
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                <ListItem key="Dashboard" disablePadding>
                  <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="Employee" disablePadding>
                  <ListItemButton component={Link} to="/employee">
                    <ListItemIcon>
                      <SupervisedUserCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Employee" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="Company" disablePadding>
                  <ListItemButton component={Link} to="/company">
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Company" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="Attendance" disablePadding>
                  <ListItemButton component={Link} to="/attendance">
                    <ListItemIcon>
                      <SportsHandballIcon />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
              <List>
                {/* Mail and Logout items */}
                <ListItem key="Mail" disablePadding>
                  <ListItemButton component={Link} to="/mail">
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mail" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="Logout" disablePadding>
                  <ListItemButton onClick={logout}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Box component="main">
            <Toolbar />
            {children}{" "}
          </Box>
        </Box>
      )}
    </>
  );
}
