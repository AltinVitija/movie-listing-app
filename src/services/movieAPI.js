import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTFlODhkM2JmMzFiNDA2YWJmMThjM2M2NDkzMTczZiIsInN1YiI6IjY0NmIxYmJhMmJjZjY3MDBlM2JiOThkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eCoi6QyLON45-kIfdJECi4UU9lHbSdJOnCn8Tks62c8";

const movieAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default movieAPI;
