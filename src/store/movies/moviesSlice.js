import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../../services/movieAPI";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const response = await movieAPI.get("/movie/top_rated");
    const movies = response.data.results.map((movie) => ({
      ...movie,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      genres: [],
      releaseYear: movie.release_date.split("-")[0],
    }));

    const genreList = await movieAPI.get("/genre/movie/list");
    const genresById = genreList.data.genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});

    movies.forEach((movie) => {
      movie.genres = movie.genre_ids.map((genreId) => genresById[genreId]);
    });

    const voteAverages = movies.map((movie) => movie.vote_average);

    const uniqueYears = [...new Set(movies.map((movie) => movie.releaseYear))];

    console.log(response.data);
    return { movies, voteAverages, years: uniqueYears };
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    filteredMovies: [],
    genres: [],
    loading: false,
    error: null,
    selectedGenre: null,
    searchValue: "",
    voteAverage: null,
    selectedVoteAverage: null,
    years: [],
    selectedYear: null,
  },
  reducers: {
    filterMovies: (state, action) => {
      const { searchValue } = action.payload;
      state.searchValue = searchValue;
      state.filteredMovies = state.movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    },

    filterVoteAverage: (state, action) => {
      const { selectedVoteAverage } = action.payload;
      state.selectedVoteAverage = selectedVoteAverage;
      state.filteredMovies = state.movies.filter(
        (movie) =>
          parseFloat(movie.vote_average) === parseFloat(selectedVoteAverage)
      );
    },

    filterGenres: (state, action) => {
      const { selectedGenre } = action.payload;
      state.selectedGenre = selectedGenre;
      state.filteredMovies = state.movies.filter((movie) =>
        movie.genres.includes(selectedGenre)
      );
    },

    filterYear: (state, action) => {
      const { selectedYear } = action.payload;
      state.selectedYear = selectedYear;
      state.filteredMovies = state.movies.filter(
        (movie) => movie.releaseYear === selectedYear
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { movies, voteAverages, years } = action.payload;
        state.movies = movies;
        state.genres = Array.from(
          new Set(movies.flatMap((movie) => movie.genres))
        ).filter((genre) => genre !== null);
        state.years = Array.from(
          new Set(movies.map((movie) => movie.releaseYear))
        ).filter((year) => year !== null);
        state.filteredMovies = movies;
        state.loading = false;
        state.error = null;
        state.voteAverage = voteAverages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("movies/") &&
          !action.type.endsWith("/pending"),
        (state, action) => {
          if (action.payload && Array.isArray(action.payload.movies)) {
            const { movies } = action.payload;
            state.movies = movies;
            state.filteredMovies = movies;
            state.genres = Array.from(
              new Set(movies.flatMap((movie) => movie.genres))
            );
            state.years = Array.from(
              new Set(movies.flatMap((movie) => movie.releaseYear))
            );
          }
        }
      );
  },
});

export const { filterMovies, filterVoteAverage, filterGenres, filterYear } =
  moviesSlice.actions;

export const selectYear = (state) => state.movies.selectedYear;
export const selectSelectedYear = (state) => state.movies.selectedYear;
export const selectFilteredMovies = (state) => state.movies.filteredMovies;
export const selectVoteAverages = (state) => state.movies.voteAverage;

export default moviesSlice.reducer;
