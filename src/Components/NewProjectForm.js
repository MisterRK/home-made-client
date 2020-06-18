import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import NewStepForm from "./NewStepForm";
import Axios from "axios";
import { AppBar, Toolbar } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { UseHistory } from 'react-router-dom'

class NewProjectForm extends React.Component {
  state = {
    title: "",
    image: null,
    projectId: null,
    steps: [],
    counter: 0,
    started: false,
  };

  //handle files being added to drop zone. (child)
  handleDropZone = (e) => {
    this.setState({
      image: e.target,
    });
  };
  //handle any changes on the form
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //handle the submit and create the project
  handleSubmit = (e) => {
    e.preventDefault();
    let newProject = {
      title: this.state.projectTitle,
      user_id: this.props.currentUserId,
      image: this.state.image,
    };
    fetch(`http://localhost:3001/projects`, {
      method: "POST",
      headers: {
        accept: "application/response",
        "content-type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          projectId: json.id,
          projectTitle: json.title,
          started: true,
        })
      );
  };

  createProject = (e) => {
    e.preventDefault();
    this.setState({ counter: 1});
    const data = new FormData(e.target);
    console.log(data)
    Axios.post(`http://localhost:3001/projects`, data).then((response) =>
      this.setState({
        projectId: response.data.id,
        projectTitle: response.data.title,
        started: true,
      })
    );
  };

  handleDelete = () => {
    this.setState({ counter: this.state.counter - 1 });
  };

  addStep = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    console.log("New Proj Form Props", this.props)
    let steps = [];
    for (var i = 0; i < this.state.counter; i++) {
      steps.push(
        <NewStepForm
          key={i + 1}
          stepNumber={i + 1}
          projectId={this.state.projectId}
          handleDelete={this.handleDelete}
        />
      );
    }

    // console.log("New Project From State", this.state);
    // console.log(this.state.image)

    return (
      <Container>
        <AppBar position="sticky" className="appBar">
          <Toolbar>
            <Typography variant="h2">Home Made</Typography>
            <Button
              id="backToProjectsBtn"
              variant="contained"
              component={RouterLink}
              to="/projects"
              user={this.props.currentUser}
            >
              Back to Projects
            </Button>
            <Typography id="userNameAppBar3">
              {this.props.currentUser}
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography variant="h1">Let's make a new Project</Typography>
        <form onSubmit={this.createProject}>
          <InputLabel>Name of the Project</InputLabel>
          <TextField
            onChange={this.handleChange}
            value={this.state.projectTitle}
            name="title"
            fullWidth={true}
            placeholder="....."
          />
          <InputLabel>Add A cover Image To Your Project</InputLabel>
          <input type="file" name="image" onChange={this.handleDropZone} />
          {this.props.currentUserId ? (
            <input
              type="hidden"
              name="user_id"
              value={this.props.currentUserId}
            />
          ) : null}
          {this.state.started ? (
            <Button variant="contained" onClick={this.addStep}>
              Add a Step
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              Start this project
            </Button>
          )}
        </form>
        {steps}
        {this.state.started ? <Button component={RouterLink} to={`/projects/${this.state.projectId}`}>Save Project</Button> : null}
      </Container>
    );
  }
}

export default NewProjectForm;
