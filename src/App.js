import React from "react";
import "./App.css";
import Home from "./Components/Home";
import NewProjectForm from "./Components/NewProjectForm";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    currentUser: "Nadia",
    currentUserId: 21,
  };
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/projects/new"
          render={() => <NewProjectForm currentUserId={this.state.currentUserId} currentUser={this.state.currentUser} />}
        />
      </Router>
    );
  }
}

export default App;
