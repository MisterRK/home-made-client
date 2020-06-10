import React from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FileDropZone from './FileDropZone';

class NewStepForm extends React.Component {
  state = {
    heading: "",
    content: "",
    saved: false,
    image: null
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
    this.setState({ saved: false });
  };

  postStep = () => {
    const newStep = {
      project_id: this.props.projectId,
      order: this.props.stepNumber,
      heading: this.state.heading,
      content: this.state.content}
    fetch(`http://localhost:3001/steps`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(newStep)
      })
      .then(response => response.json())
      .then(json => console.log(json))
  }

  handleDropZone = (images) => {
    this.setState({
      images: images,
    });
  };
  render() {
    // console.log("New Step Form State", this.state)
    // console.log("New StepForm Props", this.props)
    return (
      <Container>
        <Typography variant="h3">Step {this.props.stepNumber}:</Typography>
        <form>
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
          <FileDropZone handleDropZone={this.handleDropZone} />
          {this.state.saved ? (
            <Button onClick={this.handleEdit} variant="primary">
              Edit Step
            </Button>
          ) : (
            <Button
              onClick={this.handleSubmit}
              type="submit"
              variant="contained"
            >
              Save Step
            </Button>
          )}
          <Button onClick={this.props.handleDelete}>Delete This Step</Button>
        </form>
      </Container>
    );
  }
}
export default NewStepForm;
