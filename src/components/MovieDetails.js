import React from "react";
import { Typography } from "@mui/material";

const MovieDetails = ({ movie }) => {
  return (
    <div className="movie-details">
      <img src={movie.poster_path} alt={movie.title} />
      <Typography variant="body2">Year of release: {movie.year}</Typography>
      <Typography variant="body2">Genre: {movie.genre}</Typography>
      <Typography variant="body2">Rating: {movie.rating}</Typography>
      <Typography variant="body2">Description: {movie.description}</Typography>
    </div>
  );
};

export default MovieDetails;
