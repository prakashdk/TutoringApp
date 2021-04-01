import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Add from "./Components/Add";
import Login from "./Components/UserLogin";
import Admin from "./Components/Admin";
import AdminLogin from "./Components/AdminLogin";
import Users from "./Components/Users";
import Chart from "./Components/Chart";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

function App() {
  const classes = useStyles();

  const [state, setState] = React.useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/admin">
          <ListItem button key={"Home"}>
            <ListItemText primary="Admin"> </ListItemText>
          </ListItem>
        </Link>

        <Link to="/users">
          <ListItem button key={"users"}>
            <ListItemText primary="Users"> </ListItemText>
          </ListItem>
        </Link>
        <Link to="/chart">
          <ListItem button key={"chart"}>
            <ListItemText primary="Chart"> </ListItemText>
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/add">
            <Add />
          </Route>
          <Route exact path="/home">
          <React.Fragment>
              <div className={classes.root}>
                <AppBar position="static">
                  <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                      Coda Global Tutoring App
                    </Typography>
                    <Link
                      onClick={() => {
                        sessionStorage.clear();
                      }}
                      style={{ color: "white" }}
                      to="/login"
                    >
                      Logout
                    </Link>
                  </Toolbar>
                </AppBar>
              </div>
              <Home />
            </React.Fragment>
          </Route>
          <Route exact path="/admin">
            <React.Fragment>
              <div className={classes.root}>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                      onClick={toggleDrawer("left", true)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      Coda Global Tutoring App
                    </Typography>
                    <Link
                      onClick={() => {
                        sessionStorage.clear();
                      }}
                      style={{ color: "white" }}
                      to="/login"
                    >
                      Logout
                    </Link>
                  </Toolbar>
                </AppBar>
              </div>
              <Admin />
            </React.Fragment>
          </Route>
          <Route exact path="/users">
            <React.Fragment>
              <div className={classes.root}>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                      onClick={toggleDrawer("left", true)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      Coda Global Tutoring App
                    </Typography>
                    <Link
                      onClick={() => {
                        sessionStorage.clear();
                      }}
                      style={{ color: "white" }}
                      to="/login"
                    >
                      Logout
                    </Link>
                  </Toolbar>
                </AppBar>
              </div>
              <Users />
            </React.Fragment>
          </Route>
          <Route exact path="/adminLogin">
            <AdminLogin />
          </Route>
          <Route exact path="/chart">
            <React.Fragment>
              <div className={classes.root}>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                      onClick={toggleDrawer("left", true)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      Coda Global Tutoring App
                    </Typography>
                    <Link
                      onClick={() => {
                        sessionStorage.clear();
                      }}
                      style={{ color: "white" }}
                      to="/login"
                    >
                      Logout
                    </Link>
                  </Toolbar>
                </AppBar>
              </div>
              <Chart />
            </React.Fragment>
          </Route>
        </Switch>
      </div>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </Router>
  );
}

export default App;
