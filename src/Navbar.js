import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { AppBar, Toolbar, Menu, MenuItem } from "@material-ui/core";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Categories from "./Categories";
import TemporaryDrawer from "./CatBar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

//Const declaration and Theme definitions

const settings = ["My Posts", "Logout"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
/* end of Const Declarations */

function Navbar(props) {
  const [query, setQuery] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  function handleLogOut() {
    Cookies.remove("jwt");
    Cookies.remove("session");
    navigate("/");
  }

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleDropDown(setting) {
    if (setting === "Logout") {
      handleLogOut();
      handleCloseUserMenu();
    } else if (setting === "My Posts") {
      navigate(`/user/${props.userId}`);
      handleCloseUserMenu();
    }
  }
  function handleQuery(e) {
    setQuery(e.target.value);
    if (e.target.value === "") {
      axios
        .get(`http://localhost:3000/posts`)
        .then((res) => {
          props.setPosts(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`http://localhost:3000/posts/query/${query}`)
        .then((res) => props.setPosts(res.data))
        .catch((err) => console.log(err));
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      axios
        .get(`http://localhost:3000/posts/query/${query}`)
        .then((res) => props.setPosts(res.data))
        .catch((err) => console.log(err));
    }
  }

  function handleSearchClick() {
    navigate("/Mainpage");
  }

  return (
    <>
      <AppBar className="bar">
        <Toolbar className="tent">
          <Stack direction="row" spacing={2}>
            <TemporaryDrawer />
            <h1
              className="Forum-Name"
              onClick={() => {
                navigate("/Mainpage");
              }}
            >
              CodeCampus{" "}
            </h1>
          </Stack>
          {props.is_main ? (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ width: "100%" }}
                onChange={handleQuery}
                onKeyPress={handleKeyPress}
              />
            </Search>
          ) : (
            <Tooltip title="Returns to Home Page to access search">
              <Button
                variant="outlined"
                onClick={handleSearchClick}
                color="inherit"
              >
                Seacrh
              </Button>
            </Tooltip>
          )}
          <div>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="U"
                    src={`https://api.multiavatar.com/${props.userId}.png`}
                  />
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
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleDropDown(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
