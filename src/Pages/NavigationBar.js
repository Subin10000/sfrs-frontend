import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Logo from "./Components/images/logo.png";
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import Dashboard from './dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

export default function SideNavigation() {

    const iconRender = (text) => {
        switch(text) {
            case "Dashboard" : 
                return <DashboardIcon/>;
            case "Students" :
                return <SupervisedUserCircleIcon/>
            case "Teachers" :
                return <AccountCircleIcon/>
            case "Attendance" :
                return <SportsHandballIcon/>
        }
    }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            SFRS
            {/* <Link to="/home">
                <img src={Logo} className="logo" alt="" width={150} style={{maxHeight: 50}} />
            </Link> */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <List>
  <ListItem key="Dashboard" disablePadding>
    <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </ListItem>
  <ListItem key="Students" disablePadding>
    <ListItemButton component={Link} to="/students">
      <ListItemIcon>
        <SupervisedUserCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Students" />
    </ListItemButton>
  </ListItem>
  <ListItem key="Teachers" disablePadding>
    <ListItemButton component={Link} to="/teachers">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Teachers" />
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
            {['Mail'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Logout'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon/>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Typography paragraph width="100%">
          <Dashboard/>
        </Typography>
        <Divider />

        <Typography paragraph style={{ fontStyle: 'italic', color: 'rgba(0, 0, 0, 0.5)', textAlign:'center' }}>
            This dashboard provides a comprehensive overview of students' attendance data categorized by faculty and class. For further inspection, please go to the attendance page...
        </Typography>
        <Typography paragraph style={{ fontStyle: 'italic', color: 'rgba(0, 0, 0, 0.5)', textAlign:"center", display:'flex', flexDirection:"column", alignItems:"center" }}>
          <div style={{width:"70%"}}>
          For support and inquiries, please contact us at support@example.com or
          </div>
          <div style={{width:"40%"}}>
          call us at +1 (123) 456-7890.
          </div>
        </Typography>
      </Box>
    </Box>
  );
}
