import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MoviesContainer from "./containers/MoviesContainer";
import MovieDetails from "./containers/MovieDetails";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MoviesContainer} />
        <Route exact path="/movies/:movieId" component={MovieDetails} />
      </Switch>
    </Router>
  );
};

export default App;
