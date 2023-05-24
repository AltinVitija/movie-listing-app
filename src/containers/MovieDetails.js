import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#215969",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#215969",
  },
  image: {
    width: "100%",
    borderRadius: theme.spacing(1),
    height: "auto",
    objectFit: "cover",
  },
  card: {
    minHeight: 450,
    width: "90%",
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[5],
    textDecoration: "none",
    color: "inherit",
    backgroundColor: "#215969",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  view_right: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
      flex: 1,
      maxWidth: "33%",
    },
  },
  view_left: {
    height: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "2%",
    [theme.breakpoints.up("md")]: {
      flex: 2,
      maxWidth: "75%",
    },
  },
  content_movie: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  movieTitle: {
    marginBottom: theme.spacing(6),
    fontWeight: "bold",
    color: "white",
    fontSize: "30px",
    textAlign: "left",
  },
  movieInfo: {
    marginBottom: theme.spacing(2),
    color: "#32C4FB",
    fontSize: "1em",
  },
  movieSpan: {
    color: "white",
    fontWeight: "550",
  },
}));

const MovieDetails = () => {
  const { movieId } = useParams();
  const movies = useSelector((state) => state.movies.movies);
  const movie = movies.find((movie) => movie.id === parseInt(movieId));
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.view_right}>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className={classes.image}
          />
        </div>
        <div className={classes.view_left}>
          <div className={classes.content_movie}>
            <Typography variant="subtitle2" className={classes.movieTitle}>
              {movie.title}
            </Typography>
            <Typography variant="body2" className={classes.movieInfo}>
              <span className={classes.movieSpan}>Year of release:</span>{" "}
              {movie.release_date}
            </Typography>
            <Typography variant="body2" className={classes.movieInfo}>
              <span className={classes.movieSpan}>Genres: </span>
              {movie.genres.join(", ")}
            </Typography>
            <span className={classes.movieSpan}>Overview</span>
            <Typography variant="body2" className={classes.movieInfo}>
              {movie.overview}
            </Typography>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default MovieDetails;
