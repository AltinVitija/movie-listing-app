import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterVoteAverage,
  selectFilteredMovies,
  selectVoteAverages,
} from "../../store/movies/moviesSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterBarRating = () => {
  const dispatch = useDispatch();
  const [selectedVoteAverage, setSelectedVoteAverage] = useState(null);
  const voteAverages = useSelector(selectVoteAverages) || [];
  const filteredMovies = useSelector(selectFilteredMovies);
  const distinctVoteAverages = [...new Set(voteAverages)];

  const handleFilter = (event) => {
    const selectedVoteAverage = parseFloat(event.target.value);
    setSelectedVoteAverage(selectedVoteAverage);
    dispatch(filterVoteAverage({ selectedVoteAverage }));
  };

  return (
    <FormControl sx={{ width: "20%" }}>
      <InputLabel id="demo-simple-select-label">Rating</InputLabel>
      <Select value={selectedVoteAverage || ""} onChange={handleFilter}>
        <MenuItem value="" disabled>
          Select a Rating
        </MenuItem>
        {distinctVoteAverages.map((average) => (
          <MenuItem key={average} value={average}>
            {average}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterBarRating;
