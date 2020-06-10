import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import FileDropZone from "./FileDropZone";
import NewStepForm from "./NewStepForm";
import { Link as RouterLink } from "react-router-dom";

class NewProjectForm extends React.Component {
  state = {
    projectTitle: "",
    currentUser: null,
    currentUserId: null,
    images: [],
    projectId: null,
    steps: [],
    counter: 1,
  };

  componentDidMount = () => {
    this.setState({
      currentUser: this.props.currentUser,
      currentUserId: this.props.currentUserId,
    });
  };

  //handle files being added to drop zone. (child)
  handleDropZone = (images) => {
    this.setState({
      images: images,
    });
  };
  //handle any changes on the form
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //handle the submitting of the form
  handleSubmit = (e) => {
    e.preventDefault();
    let newProject = {
      title: this.state.projectTitle,
      user_id: this.state.currentUserId,
      images: this.state.images,
    };
    fetch(`http://localhost:3001/projects`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then((response) => response.json())
      .then((json) =>
        this.setState({ projectId: json.id, projectTitle: json.title })
      );
  };

  handleDelete = () => {
    this.setState({counter: this.state.counter - 1})
  }

  addStep = () => {
    this.setState({counter: this.state.counter + 1})
  }

  render() {
    let steps = [];
    for (var i = 0; i < this.state.counter; i++) {
      steps.push(<NewStepForm key={i+1} stepNumber={i+1} projectId={this.state.projectId} handleDelete={this.handleDelete} />);
    };

    console.log("New Project From State", this.state);
    return (
      <Container>
        <Typography variant="h1">Let's make a new Project</Typography>
        <form onSubmit={this.handleSubmit}>
          <InputLabel required={true}>Name of the Project</InputLabel>
          <TextField
            onChange={this.handleChange}
            value={this.state.projectTitle}
            name="projectTitle"
            fullWidth={true}
            placeholder="....."
          />
          <FileDropZone handleDropZone={this.handleDropZone} />
          <Button type="submit" variant="contained">
            Start this project
          </Button>
          <Button variant='contained' onClick={this.addStep}>Add a Step</Button>
          {steps}
        </form>
      </Container>
    );
  }
}

export default NewProjectForm;
