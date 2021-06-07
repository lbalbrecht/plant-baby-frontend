import React, { useEffect, useState } from "react";
import API from "../../utils/Api";
import NavBar from "../NavBar";
import Box from "@material-ui/core/Box";
import SignupForm from "../SignupForm/index";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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
}));

export default function ComposedTextField(props) {
  const history = useHistory();
  const classes = useStyles();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [signupFormState, setSignupFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [userState, setUserState] = useState({
    token: "",
    user: {},
  });

  const handleOnClick = () => {
    history.push("/home");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.getUser(token)
        .then((res) => {
          console.log(res.data);
          console.log("token: ", token);
          setUserState({
            token: token,
            user: {
              email: res.data.email,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              id: res.data.id,
            },
          });
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    API.login(formState)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        console.log("token: ", res.data.token);
        setUserState({
          ...userState,
          token: res.data.token,
          user: {
            email: res.data.email,
            name: res.data.name,
            id: res.data.id,
          },
        });
      })
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

  const handleSignupFormSubmit = (e) => {
    e.preventDefault();
    console.log(signupFormState);
    API.signup(signupFormState)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
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
      }, handleOnClick())
      .catch((err) => {
        console.log("error occured", err);
        localStorage.removeItem("token");
        setUserState({
          token: "",
          user: {},
        });
      });
    setSignupFormState({
      name: "",
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
      <NavBar />

      <Grid
        container
        spacing={3}
        paddingBottom="10px"
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Box className={classes.hero}>
          <Box>Sign Up</Box>
        </Box>

        <SignupForm
          className={classes.form}
          user={userState.user}
          handleFormSubmit={handleFormSubmit}
          formState={formState}
          setFormState={setFormState}
          signupFormState={signupFormState}
          setSignupFormState={setSignupFormState}
          handleSignupFormSubmit={handleSignupFormSubmit}
          handleLogout={handleLogout}
        />
      </Grid>
    </div>
  );
}
