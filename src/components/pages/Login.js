import React, { useEffect, useState } from "react";
import API from "../../utils/Api";
import NavBar from "../NavBar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LoginForm from "../LoginForm/index";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('https://i.pinimg.com/originals/e1/e1/5c/e1e15c72f53c6065930b7cda96cff0a8.jpg')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  hero: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#006a4e",
    fontSize: "5rem",
  },
  loginContainer: {
    paddingTop: theme.spacing(3),
  },
}));

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [userState, setUserState] = useState({
    token: "",
    user: {},
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      console.log("hello");
      API.getUser(token)
        .then((res) => {
          console.log(res.data);
          console.log("token: ", token);
          setUserState({
            token: token,
            user: {
              email: res.data.email,
              id: res.data.id,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
            },
          });
          console.log(userState);
        })
        .catch((err) => {
          console.log("no logged in user");
          setUserState({
            token: "",
            user: {},
          });
        });
    } else {
      console.log("no token provided");
    }
  }, []);

  const handleOnClick = () => {
    history.push("/home");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    API.login(formState)
      .then((res) => {
        console.log(res.data.user);
        localStorage.setItem("token", res.data.token);
        console.log("token: ", res.data.token);
        setUserState({
          ...userState,
          token: res.data.token,
          user: {
            email: res.data.email,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            id: res.data.id,
          },
        });
        console.log(userState);
      }, handleOnClick())
      .catch((err) => {
        console.log("error occured");
        console.log(err);
        localStorage.removeItem("token");
        setUserState({
          token: "",
          user: {},
        });
      });
    setFormState({
      email: "",
      password: "",
    });
  };

  const handleLogout = () => {
    setUserState({
      token: "",
      user: {},
    });
    localStorage.removeItem("token");
  };

  return (
    <div className={classes.root}>
      <NavBar handleLogout={handleLogout} />

      <Container maxWidth="lg" className={classes.loginContainer}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Box className={classes.hero}>
            <Box>Login</Box>
          </Box>

          {/* <Grid item xs={12}>
          <img src="./images/plant-baby-logo.png" alt="" />
        </Grid> */}

          <LoginForm
            user={userState.user}
            handleFormSubmit={handleFormSubmit}
            formState={formState}
            setFormState={setFormState}
            handleLogout={handleLogout}
          />
        </Grid>
      </Container>
    </div>
  );
}
