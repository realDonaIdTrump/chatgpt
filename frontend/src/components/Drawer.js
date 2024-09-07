import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import VectorIcon from "./VectorIcon";
import {
  Typography,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NewChat from "./NewChat";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ViewSidebarRoundedIcon from "@mui/icons-material/ViewSidebarRounded";
import FontAwesomeSvgIconDemo from './FontAwesomeSvgIcon';
import MainContent from "./MainContent"; // Import the new component

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between", // Ensure space between items
}));

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(email) {
  const username = email.split("@")[0]; // Get the part before the '@' symbol
  return {
    sx: {
      bgcolor: stringToColor(email), // Generates a color based on the email
    },
    children: `${username[0].toUpperCase()}${username[1] ? username[1].toUpperCase() : ""}`, // First two letters from username
  };
}

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [list, setList] = useState(["New Chat"]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/user",
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401) {
          // Redirect to login if unauthorized
          navigate("/login");
        } else {
          console.error("Error fetching user data:", error);
          setError(error.response?.data?.error || "An error occurred");
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleChildClick(data) {
    setList((prevState) => [...prevState, [data]]);
  }

  function handleDeleteChat(id) {
    setList((prevList) => prevList.filter((_, index) => index !== id));
    console.log('Delete button clicked');
  }  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <ViewSidebarRoundedIcon sx={{ color: "#B70032" }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#B70032" }}
          >
            PREEvision GPT
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ color: "#B70032" }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          height: "100vh", // Ensure the drawer takes the full height of the viewport
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <VectorIcon />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ViewSidebarRoundedIcon sx={{ color: "#B70032" }} />
            ) : (
              <ViewSidebarRoundedIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <NewChat onClick={handleChildClick} />
        <List>
          {list.map((text, index) => (
            <ListItem key={index} id={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
                <FontAwesomeSvgIconDemo onDelete={()=>handleDeleteChat(index)}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "flex-end", // Align items to the bottom
            padding: 1,
          }}
        >
          <Divider />
          <Stack
            direction="column"
            spacing={1}
            sx={{
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                border: "0",
                color: "#B70032",
                justifyContent: "flex-start",
                whiteSpace: "nowrap", // Prevent text wrapping
              }} // Align icon and text to the left
              startIcon={<DeleteIcon />}
              fullWidth
            >
              Clear Conversation
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: "0",
                color: "#B70032",
                justifyContent: "flex-start",
              }} // Align icon and text to the left
              startIcon={<OpenInNewIcon />}
              fullWidth
            >
              Updates & FAQ
            </Button>
          </Stack>
        </Box>
      </Drawer>
      <MainContent open={open} /> 
    </Box>
  );
}
