import React from "react";
// import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: '10px'
  },
  media: {
    height: 150,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.originalImage}
          title={props.plantName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.plantName}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >{props.wikiDescription}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={props.handleOnClick} size="small" color="#00b786">
          Buy Plant
        </Button>
      </CardActions>
    </Card>
  );
}
