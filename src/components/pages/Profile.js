import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import API from "../../utils/Api";
import ProfilePlantCard from "../ProfilePlantCard/index";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fdfcfa",
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://www.technogym.com/wpress/wp-content/uploads/2019/04/indoor-plants-header.jpg')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    padding: "10px",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
}));

export default function Profile() {
  const classes = useStyles();

  const [userState, setUserState] = useState({
    token: "",
    user: {},
  });

  const [inventoryState, setInventoryState] = useState({
    inventory: "",
  });

  const [plantState, setPlantState] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    if (token) {
      API.getUser(token)
        .then((res) => {
          console.log(res.data);
          const profileData = res.data;
          setUserState({
            token: token,
            user: {
              email: profileData.email,
              id: profileData.id,
              first_name: profileData.first_name,
              last_name: profileData.last_name,
            },
          });
        })
        .catch((err) => {
          console.log("no user token");
        });
    } else {
      console.log("no token provided");
    }
  }, []);

  const plantInventory = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = userState.user.id;
    console.log(userState.user.id);
    API.getInventory(id, token).then((response) => {
      console.log(response.data);
      setInventoryState({
        inventory: response.data.inventory.id,
      });
      const inventId = response.data.inventory.id;
      console.log(inventoryState);
      API.getPlantInventory(inventId, token).then((results) => {
        const plants = results.data.plants;
        console.log(plants);
        console.log(inventoryState);
        setPlantState(plants);
        console.log(plantState);
      });
    });
  };

  const deletePlant = () => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    for (let i = 0; i < plantState.length; i++) {
      const plantData = plantState[i];
      console.log(plantData)
    }
    // API.deletePlant(id, token)
    // .then((res)=>{
    //   console.log(res)
    // })
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <Box className={classes.hero}>
        <Box>Profile</Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <h3>Your Contact Info:</h3>
          <p>First Name: {userState.user.first_name} </p>
          <p>Last Name: {userState.user.last_name} </p>
          <p>Email: {userState.user.email} </p>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={plantInventory}>
        See your Plant Inventory
      </Button>
      <Box  display="flex" flexWrap="wrap" margin='10px' >
        {plantState.map((plant, index) => (
          <ProfilePlantCard
          margin='10px' 
            plantName={plant.type}
            wikiDescription={plant.description}
            originalImage={plant.image_file}
            id={plant.id}
            handleOnClick={deletePlant}
            key={index}
          />
        ))}
      </Box>
    </div>
  );
}
