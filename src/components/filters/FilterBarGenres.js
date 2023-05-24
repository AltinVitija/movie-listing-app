import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterGenres } from "../../store/movies/moviesSlice";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const FilterBarGenres = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.movies.genres);
  const selectedGenre = useSelector((state) => state.movies.selectedGenre);

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    dispatch(filterGenres({ selectedGenre: genre }));
  };

  return (
    <FormControl sx={{ width: "20%" }}>
      <InputLabel style={{ marginTop: "-2%" }} id="demo-simple-select-label">
        Genres
      </InputLabel>
      <Select
        id="genreSelect"
        value={selectedGenre || ""}
        onChange={handleGenreChange}
        sx={{ width: "100%" }}
      >
        <MenuItem value="" disabled>
          Select a Genre
        </MenuItem>
        {genres.map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterBarGenres;
