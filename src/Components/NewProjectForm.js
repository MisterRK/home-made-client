import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import FileDropZone from "./FileDropZone";

class NewProjectForm extends React.Component {
  state = {
    projectTitle: "",
    projectIntro: "",
    step1Heading: "",
    step1Content: "",
    currentUser: null,
    currentUserId: null,
    files: [],
  };

  componentDidMount = () => {
    this.setState({currentUser: this.props.currentUser, currentUserId: this.props.currentUserId})
  }

  //handle files being added to drop zone. (child)
  handleDropZone = (files) => {
    this.setState({
      files: files,
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
      images: this.state.images
    };
    fetch(`http://localhost:3001/projects`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(newProject)
      })
      .then(response => response.json())
    // ? use next line to do something meaningful with the data
      .then(json => console.log(json))
  }



  render() {
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
          <br />
          <br />
          <InputLabel>Project Introduction</InputLabel>
          <TextField
            onChange={this.handleChange}
            value={this.state.projectIntro}
            name="projectIntro"
            multiline={true}
            fullWidth={true}
          />
          <br />
          <br />
          <InputLabel>Step One Heading</InputLabel>
          <TextField
            onChange={this.handleChange}
            value={this.state.step1Heading}
            name="step1Heading"
            placeholder="Heading i.e. mix the ingredients"
            multiline={true}
            fullWidth={true}
          />
          <br />
          <br />
          <InputLabel>Step One Directions</InputLabel>
          <TextField
            onChange={this.handleChange}
            value={this.state.step1Content}
            name="step1Content"
            multiline={true}
            fullWidth={true}
          />
          <br />
          <br />
          <br />
          <br />
          <FileDropZone handleDropZone={this.handleDropZone} />

          <Button variant="contained">Add a Step</Button>
            <Button
            type="submit"
            variant="contained">
            Post this project
          </Button>
        </form>
      </Container>
    );
  }
}

export default NewProjectForm;
