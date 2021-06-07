import React, { useEffect, useState } from "react";
import PostImage from "../PostImage/PostImage";
import ImageUpload from "../ImageUpload/ImageUpload";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import NavBar from "../NavBar";
import Container from "@material-ui/core/Container";
import API from "../../utils/Api.js";

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
  postContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));
export default function ComposedTextField(props) {
  console.log(props);

  const [imageState, setImageState] = useState({
    image_url: "",
  });
  const [name, setName] = React.useState({
    plant: "",
    description: "",
    price: "",
  });
  const { plant, description, price } = name;
  const handleChange = (event) => {
    setName({ ...name, [event.target.name]: event.target.value });
  };

  const imageSuccess = (res) => {
    setImageState({
      image_url: res.info.thumbnail_url,
    });
  };

  // const [value, setValue] = React.useState({
  //     flowers: "",
  //     water: "",
  //     sunlight: "",
  //     fertilizer: "",
  //     temperature: ""
  // });
  // const { flowers, water, sunlight, fertilizer, temperature } = value;
  // const handleValueChange = (event) => {
  //     setValue({ ...value, [event.target.name]: event.target.value });
  // };
  // const [checkState, setCheckState] = React.useState({
  //     pets: false,
  //     easycare: false,
  //     exotic: false,
  //     restricted: false,
  // });
  // const { pets, easycare, exotic, restricted } = checkState;
  // const handleCheckChange = (event) => {
  //     setCheckState({ ...checkState, [event.target.name]: event.target.checked });
  // };

  const [inventoryState, setInventoryState] = useState({
    inventory: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.getUser(token)
        .then((res) => {
          // console.log(res.data.id)
          const id = res.data.id;
          API.getInventory(id, token).then((res) => {
            // console.log(res.data.inventory.id)
            setInventoryState({
              inventory: res.data.inventory.id,
            });
            // console.log(inventoryState)
          });
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
  }, []);

  const buildCard = (event) => {
    event.preventDefault();

    console.log("success");
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    const inventId = inventoryState.inventory;
    console.log(inventId);
    const plantData = {
      type: plant,
      image_file: imageState.image_url,
      price: price,
      description: description,
      inventory_id: inventId,
    };
    console.log(plantData);
    API.createPlant(plantData, token)
      .then((res) => {
        console.log(res);
        console.log(imageState);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />

      <Box className={classes.hero}>
        <Box>Post a Plant</Box>
      </Box>
      <Container className={classes.postContainer}>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid>
            <ImageUpload />
          </Grid>
          <Grid>
            <h2 className="text-center">Or build your card from scratch</h2>
          </Grid>
          <Grid>
            <PostImage successHandler={imageSuccess} />
          </Grid>
          <Grid>
            <FormControl variant="outlined">
              <InputLabel htmlFor="component-outlined">Plant Name</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={plant}
                onChange={handleChange}
                label="Name"
                name="plant"
              />
            </FormControl>
          </Grid>

          <Grid>
            <FormControl variant="outlined">
              <InputLabel htmlFor="component-outlined">Price</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={price}
                onChange={handleChange}
                label="price"
                name="price"
              />
            </FormControl>
          </Grid>

          <Grid>
            <FormControl variant="outlined">
              <InputLabel htmlFor="component-outlined">Description</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={description}
                onChange={handleChange}
                label="Description"
                name="description"
              />
            </FormControl>
          </Grid>

          {/* <Grid >

                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Pick all that apply</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={pets} onChange={handleCheckChange} name="pets" />}
                                    label="Pet Friendly"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={easycare} onChange={handleCheckChange} name="easycare" />}
                                    label="Low Maintenance"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={exotic} onChange={handleCheckChange} name="exotic" />}
                                    label="Exotic"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={restricted} onChange={handleCheckChange} name="restricted" />}
                                    label="Shipping Restrictions May Apply"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Flowers</FormLabel>
                            <RadioGroup aria-label="flowers" name="flowers" value={flowers} onChange={handleValueChange}>
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Water</FormLabel>
                            <RadioGroup aria-label="water" name="water" value={water} onChange={handleValueChange}>
                                <FormControlLabel value="daily" control={<Radio />} label="Daily" />
                                <FormControlLabel value="weekly" control={<Radio />} label="1-2 times a week" />
                                <FormControlLabel value="monthly" control={<Radio />} label="Once a month" />
                                <FormControlLabel value="none" control={<Radio />} label="Air plant" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Sunlight</FormLabel>
                            <RadioGroup aria-label="sunlight" name="sunlight" value={sunlight} onChange={handleValueChange}>
                                <FormControlLabel value="direct" control={<Radio />} label="Direct Sunlight" />
                                <FormControlLabel value="indirect" control={<Radio />} label="Indirect Sunlight" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Ferilizer</FormLabel>
                            <RadioGroup aria-label="ferilizer" name="fertilizer" value={fertilizer} onChange={handleValueChange}>
                                <FormControlLabel value="regularly" control={<Radio />} label="Regularly" />
                                <FormControlLabel value="periodically" control={<Radio />} label="Periodically" />
                                <FormControlLabel value="rarely" control={<Radio />} label="Rarely" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Temperature</FormLabel>
                            <RadioGroup aria-label="temperature" name="temperature" value={temperature} onChange={handleValueChange}>
                                <FormControlLabel value="hot" control={<Radio />} label="Hot" />
                                <FormControlLabel value="temperate" control={<Radio />} label="Temperate" />
                                <FormControlLabel value="cool" control={<Radio />} label="Cool" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid >
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-outlined">Added Instructions</InputLabel>
                            <OutlinedInput id="component-outlined" value={instruct} onChange={handleChange} label="Instructions" name="instruct" />
                        </FormControl>
                    </Grid> */}
          <Grid>
            <Button variant="contained" onClick={buildCard}>
              Add To Inventory
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
