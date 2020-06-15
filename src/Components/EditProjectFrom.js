import React from "react";
import {
  Typography,
  Container,
  InputLabel,
  TextField,
  Button,
} from "@material-ui/core";
import EditStepForm from "./EditStepForm";
import {Link as RouterLink } from 'react-router-dom'

class EditProjectForm extends React.Component {
  state = {
    project: {},
    steps: [],
  };
  componentDidMount = () => {
    Promise.all([this.fetchProject(), this.fetchSteps()]);
  };
  fetchProject = () => {
    fetch(`http://localhost:3001/projects/${this.props.match.params.id}`)
      .then((response) => response.json())
      .then((project) => this.setState({ project }));
  };
  fetchSteps = () => {
    fetch(`http://localhost:3001/projects/${this.props.match.params.id}/steps`)
      .then((response) => response.json())
      .then((steps) => this.setState({ steps }));
  };
  handleProjectTextChange = (e) => {
    const { project } = { ...this.state };
    const currentState = project;
    const { name, value } = e.target;
    currentState[name] = value;
    this.setState({ project: currentState });
  };
  handleStepChange = (e, order) => {
    const steps = [...this.state.steps];
    let stepToEdit = { ...steps[order - 1] };
    const { name, value } = e.target;
    stepToEdit[name] = value;
    steps[order - 1] = stepToEdit;
    this.setState({ steps });
  };
  patchProject = (id) => {
    const updated = this.state.project;
    fetch(`http://localhost:3001/projects/${id}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  patchStep = (step) => {
    fetch(`http://localhost:3001/steps/${step.id}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(step),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  handleSubmit = (e, project, steps) => {
    e.preventDefault();
    this.patchProject(project.id);
    steps.map((step) => this.patchStep(step));
    this.props.history.push(`/projects/${this.state.project.id}`)
  };

  render() {
    // console.log(this.props);
    // console.log(this.state);
    const sortedSteps = this.state.steps.sort((a,b) => a.order < b.order ? -1 : 1)
    return (
      <Container>
        <Typography variant="h1">Edit Your Project</Typography>
        <form
          onSubmit={(e) =>
            this.handleSubmit(e, this.state.project, this.state.steps)
          }
        >
          <InputLabel>Name of the Project</InputLabel>
          <TextField
            onChange={this.handleProjectTextChange}
            value={this.state.project.title}
            name="title"
            fullWidth={true}
          />
          {sortedSteps.map((step, index) => (
            <EditStepForm
              key={index}
              step={step}
              handleStepChange={this.handleStepChange}
            />
          ))}
          <Button type='submit' variant='contained' color='primary'>Submit Changes</Button> 
            
          
        </form>
      </Container>
    );
  }
}
export default EditProjectForm;
