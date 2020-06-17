import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import NewProjectForm from "./Components/NewProjectForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProjectContainer from "./Containers/ProjectContainer";
import EditProjectForm from "./Components/EditProjectFrom";

class App extends React.Component {
  state = {
    currentUser: "Marcus",
    currentUserId: 4,
  };
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/projects" component={Home} />
          <Route
            exact
            path="/projects/new"
            render={() => (
              <NewProjectForm
                currentUserId={this.state.currentUserId}
                currentUser={this.state.currentUser}
              />
            )}
          />
          <Route
            exact
            path="/projects/:id"
            render={(props) => (
              <ProjectContainer
                history={props.history}
                id={props.match.params.id}
              />
            )}
          />
          <Route exact path="/projects/:id/edit" component={EditProjectForm} />
        </Switch>
      </Router>
    );
  }
}

export default App;
