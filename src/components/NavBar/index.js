import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import API from "../../utils/Api";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  logo: {
    position: 'absolute', 
    margin: 'auto',
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    maxWidth: '100%',
    maxHeight: '250%',
},

  inputRoot: {
    color: "inherit",
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navbar: {
    backgroundColor: "#e1c0ad"
  },
  sidemenu: {
    maxWidth: "100px"
  }
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [state, setState] = React.useState({
    left: false,
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () => {
    API.logOut().then(res => {
      console.log(res)
      alert('Logged Out')
    })
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link
          to="/profile"
          className={
            window.location.pathname === "/profile"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
      <Link
          to="/login"
          className={
            window.location.pathname === "/login"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Logout
        </Link>
        </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const list = (anchor) => (
    <div className="classes.sidemenu"
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <Link
            to="/login"
            className={
              window.location.pathname === "/login"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Login
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/signup"
            className={
              window.location.pathname === "/signup"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Signup
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/store"
            className={
              window.location.pathname === "/store"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Store
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/post"
            className={
              window.location.pathname === "/post"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Post
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/home"
            className={
              window.location.pathname === "/home"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </Link>
        </ListItem>
      </List>
      <Divider />
    </div>
  );



  return (
    <div className={classes.grow}>
      <AppBar position="static" class={classes.navbar}>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer("left", true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
            {/* <Toolbar>
              <img src="./images/plant-baby-logo.png" className={classes.logo} alt="logo" />
            </Toolbar> */}
          <Typography className={classes.title} variant="h6" noWrap>
            <img src= "./images/plant-baby-logo.png" className={classes.logo} alt="logo" />
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            {/* <Link to="/logout"> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {/* </Link> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
