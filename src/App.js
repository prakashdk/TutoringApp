import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Add from "./Components/Add";
import Login from "./Components/UserLogin";
import Admin from "./Components/Admin";
import AdminLogin from "./Components/AdminLogin";
import Users from "./Components/Users";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Coda Global Tutoring App
              </Typography>
              <Link onClick={()=>{sessionStorage.clear()}} style={{color:"white"}} to="/login">
                Logout
              </Link>
            </Toolbar>
          </AppBar>
        </div>

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
            <Home />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/adminLogin">
            <AdminLogin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
