import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  selectFilteredMovies,
  filterMovies,
} from "../store/movies/moviesSlice";
import MovieList from "../components/MovieList";
import SearchBar from "../components/searchbar/SearchBar";
import FilterBarRating from "../components/filters/FilterBarRating";
import FilterBarGenres from "../components/filters/FilterBarGenres";
import FilterBarYear from "../components/filters/FilterBarYear";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    backgroundColor: "#215969",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    padding: theme.spacing(2),
  },
  moviesContainer: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#215969",
    maxWidth: "800px",
    width: "100%",
  },
  header: {
    display: "flex",
    width: "100%",
    minHeight: "230px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    backgroundColor: "#215969",
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2),
  },
  view_filters: {
    display: "flex",
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: theme.spacing(2),
    backgroundColor: "#215969",
    borderRadius: theme.spacing(1),
    marginLeft: theme.spacing(2),
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
  noMoviesMessage: {
    color: "white",
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  movieInfo: {
    marginBottom: theme.spacing(1),
    color: "#32C4FB",
    fontWeight: "bold",
    fontSize: "18px",
  },
}));

const MoviesContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const movies = useSelector(selectFilteredMovies);
  const searchValue = useSelector((state) => state.movies.searchValue);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSearchValueChange = (value) => {
    dispatch(filterMovies({ searchValue: value }));
  };

  return (
    <div className={classes.container}>
      {loading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className={classes.header}>
            <SearchBar
              searchValue={searchValue}
              setSearchValue={handleSearchValueChange}
            />
            <div className={classes.view_filters}>
              <Typography variant="body2" className={classes.movieInfo}>
                Filter by:
              </Typography>
              <FilterBarRating />
              <FilterBarGenres />
              <FilterBarYear />
            </div>
          </div>

          <div className={classes.moviesContainer}>
            {movies.length > 0 ? (
              <MovieList movies={movies} />
            ) : (
              <p className={classes.noMoviesMessage}>No movies found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MoviesContainer;
