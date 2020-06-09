import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import FileDropZone from "./FileDropZone";
import NewStepForm from "./NewStepForm";
import { Link as RouterLink } from 'react-router-dom'

class NewProjectForm extends React.Component {
  state = {
    projectTitle: "",
    // projectIntro: "",
    currentUser: null,
    currentUserId: null,
    // steps: [],
    // stepList: [],
    files: [],
    projectId: null
  };

  componentDidMount = () => {
    this.setState({
      currentUser: this.props.currentUser,
      currentUserId: this.props.currentUserId,
    });
  };

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
      .then((json) => this.setState({projectId: json.id, projectTitle: json.title}))
  };

  oldAddStep = () => {
    const steps = [this.state.steps];
    this.setState({
      steps: steps.concat(
        <NewStepForm
          key={this.state.steps.index}
          handleChange={this.handleChange}
          order={this.state.steps.length}
        />
      ),
    });
  };

  addStep = () => {
    const stepList = [this.state.stepList];
    this.setState({
      stepList: stepList.concat(
        <NewStepForm
          key={this.state.stepList.index}
          handleChange={this.handleChange}
          order={this.state.stepList.length}
          
        />
      ),
    });
  };

  //try and store only the information needed to create a step in this.state.steps. i.e {order: 1. project_id: 3, heading "asdasd", content:"asdasd"}

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
          {/* <NewIntroForm
            intro={this.state.projectIntro}
            handleChange={this.handleChange}
          /> */}
          {/* <Button onClick={this.addStep}>Add A Step</Button> */}
          {/* {this.state.stepList.map((step) => {
            return step; */}
          
          <br />
          <br />
          <br />
          <br />
          <FileDropZone handleDropZone={this.handleDropZone} />
          <br />
          <br />
          <br />
          <br />
          <Button 
            type="submit" 
            variant="contained"

            >
            Start this project
          </Button>
          {this.state.projectId ?
          <div>
          <Typography variant='h4'>Projects started click below to add steps</Typography>
          <Button
          variant='contained'
          component={RouterLink}
          to={{
            pathname:'/steps/new',
            projectId: this.state.projectId,
            projectTitle: this.state.projectTitle}}
          >
            Add Some Steps
          </Button>
          </div>
          :
          null}
        </form>
      </Container>
    );
  }
}

export default NewProjectForm;
