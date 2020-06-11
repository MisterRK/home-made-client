import React from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Axios from 'axios'

class NewStepForm extends React.Component {
  state = {
    heading: "",
    content: "",
    saved: false,
    image: null,
    editing: false,
    step: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ saved: true });
    this.postStep();
  };

  handleEdit = () => {
    this.setState({ saved: false, editing: true });
  };

  handleSaveEdit = (id) => {
    const newStep = {
      project_id: this.props.projectId,
      order: this.props.stepNumber,
      heading: this.state.heading,
      content: this.state.content,
    };
    fetch(`http://localhost:3001/steps/${id}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(newStep),
    })
      .then((response) => response.json())
      .then((json) => this.setState({ step: json }));
  };

  postStep = () => {
    const newStep = {
      project_id: this.props.projectId,
      order: this.props.stepNumber,
      heading: this.state.heading,
      content: this.state.content,
    };
    fetch(`http://localhost:3001/steps`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(newStep),
    })
      .then((response) => response.json())
      .then((json) => this.setState({ step: json }));
  };

  createStep = (e) => {
    e.preventDefault();
    const data = new FormData(e.target)
    Axios.post(`http://localhost:3001/steps`, data)
    .then(response => console.log(response))
  }

  
  render() {
    console.log("New Step Form State", this.state);
    // console.log("New StepForm Props", this.props)
    let button;
    if (this.state.saved === false && this.state.editing === false) {
      button = (
        <>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Save Step
          </Button>
          <Button
            onClick={this.props.handleDelete}
            variant="contained"
            color="secondary"
          >
            Delete This Step
          </Button>
        </>
      );
    } else if (this.state.saved === false && this.state.editing === true) {
      button = (
        <Button onClick={() => this.handleSaveEdit(this.state.step.id)}>
          Save Changes
        </Button>
      );
    } else if (this.state.saved === true && this.state.editing === false) {
      button = (
        <Button onClick={this.handleEdit} variant="primary">
          Edit Step
        </Button>
      );
    }

    return (
      <Container>
        <Typography variant="h3">Step {this.props.stepNumber}:</Typography>
        <form onSubmit={this.createStep}>
          <InputLabel>Step {this.props.stepNumber} Heading</InputLabel>
          <br />
          <TextField
            onChange={this.handleChange}
            value={this.state.heading}
            name="heading"
            disabled={this.state.saved ? true : false}
            fullWidth={true}
            placeholder="i.e   Gather Supplies"
          />
          <br />
          <br />
          <br />
          <InputLabel>Step {this.props.stepNumber} Directions </InputLabel>
          <br />
          <TextField
            onChange={this.handleChange}
            value={this.state.content}
            name="content"
            disabled={this.state.saved ? true : false}
            fullWidth={true}
            multiline={true}
          />
          <input type='file' name='image'/>
          <input type='hidden' name='project_id' value={this.props.projectId} />
          <input type='hidden' name='order' value={this.props.stepNumber} />
          {button}
        </form>
      </Container>
    );
  }
}
export default NewStepForm;
