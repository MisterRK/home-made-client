import React from "react";
import "./App.css";
import Home from "./Components/Home";
import NewProjectForm from "./Components/NewProjectForm";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewStepForm from "./Components/NewStepForm";

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
        <Route
        exact path='/steps/new'
        render={(props) => <NewStepForm projectId={props.location.projectId} projectTitle={props.location.projectTitle}/>}

        />
      </Router>
    );
  }
}

export default App;
