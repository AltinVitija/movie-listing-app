import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterYear,
  fetchMovies,
  selectSelectedYear,
} from "../../store/movies/moviesSlice";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FilterBarYear = () => {
  const dispatch = useDispatch();
  const years = useSelector((state) => state.movies.years);
  const selectedYear = useSelector(selectSelectedYear);

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    dispatch(filterYear({ selectedYear }));
  };

  const sortedYears = [...years].sort((a, b) => b - a);

  return (
    <FormControl sx={{ width: "200px" }}>
      <InputLabel style={{ marginTop: "-2%" }} id="yearSelectLabel">
        Years
      </InputLabel>
      <Select
        id="yearSelect"
        value={selectedYear || ""}
        onChange={handleYearChange}
        sx={{ width: "100%" }}
      >
        <MenuItem value="" disabled>
          Select a Year
        </MenuItem>
        {sortedYears.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterBarYear;
