import React from "react";
import { Link } from "react-router-dom";
import {
  Card as MaterialCard,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  movieCard: {
    maxHeight: "400px",
    width: "30%",
    display: "inline-block",
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    textDecoration: "none",
    color: "inherit",
    backgroundColor: "#215969",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  movieImage: {
    height: "290px",
    width: "100%",
    borderRadius: theme.spacing(1),
  },
  movieTitle: {
    fontWeight: "bold",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  movieInfo: {
    marginBottom: theme.spacing(1),
    color: "#32C4FB",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
}));

const Card = ({ movie }) => {
  const classes = useStyles();

  const movieLink = `/movies/${movie.id}-${movie.title}`;

  return (
    <MaterialCard className={classes.movieCard}>
      <Link to={movieLink} className={classes.linkWrapper}>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className={classes.movieImage}
        />
      </Link>
      <CardContent>
        <Typography variant="subtitle2" className={classes.movieTitle}>
          {movie.title}
        </Typography>
        <Typography variant="body2" className={classes.movieInfo}>
          Year of release: {movie.release_date}
        </Typography>
        <Typography variant="body2" className={classes.movieInfo}>
          Genres: {movie.genres.join(", ")}
        </Typography>
        <Typography variant="body2" className={classes.movieInfo}></Typography>
      </CardContent>
    </MaterialCard>
  );
};

export default Card;
