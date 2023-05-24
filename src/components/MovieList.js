import React from "react";
import Card from "../components/cards/Card";
import { useSelector } from "react-redux";

const MovieList = ({ movies }) => {
  const selectedGenres = useSelector((state) => state.movies.selectedGenres);

  return (
    <div className="container mx-auto p-4">
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} selectedGenres={selectedGenres} />
      ))}
    </div>
  );
};

export default MovieList;
