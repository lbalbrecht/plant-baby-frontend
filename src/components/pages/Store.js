import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ForSalePlantCard from "../ForSalePlantCard/index";
import API from "../../utils/Api";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fdfcfa",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  margin: {
    backgroundColor: "#006a4e",
    color: "#e1c0ad",
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
  shopContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

export default function ComposedTextField() {
  const [name, setName] = React.useState("Composed TextField");
  const classes = useStyles();

  const [plantState, setPlantState] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    API.getAllPlants(token).then((res) => {
      // console.log(res.data)
      const plants = res.data;
      setPlantState(plants);
      console.log(plantState);
    });
  }, []);

  const buyPlant = () => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    API.getUser(token).then((res) => {
      console.log(res.data.id);
    });
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <Box className={classes.hero}>
        <Box>Shop</Box>
      </Box>
      <Container maxWidth="lg" className={classes.shopContainer}>
        <Box display="flex" flexWrap="wrap">
          {plantState.map((plant, index) => (
            <ForSalePlantCard
              plantName={plant.type}
              wikiDescription={plant.description}
              originalImage={plant.image_file}
              id={plant.id}
              handleOnClick={buyPlant}
              key={index}
            />
          ))}
        </Box>
      </Container>
    </div>
  );
}
