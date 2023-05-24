import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Input, FormControl, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
  view: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const SearchBar = ({ searchValue, setSearchValue }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={classes.view}>
      <FormControl sx={{ m: 1, width: "50ch" }} variant="filled">
        <Input
          className={classes.input}
          value={searchValue}
          onChange={handleChange}
          placeholder="Search Movies"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};

export default SearchBar;
