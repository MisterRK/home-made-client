import React from "react";
import {
  Typography,
  Container,
  InputLabel,
  TextField,
  Button,
} from "@material-ui/core";
import EditStepForm from "./EditStepForm";

class EditProjectForm extends React.Component {
  render() {
    // console.log(this.props);
    // console.log(this.state);
    const sortedSteps = this.props.steps.sort((a, b) =>
      a.order < b.order ? -1 : 1
    );
    return (
      <Container>
        <Typography variant="h1">Edit Your Project</Typography>
        <form
          onSubmit={(e) =>
            this.props.handleEditSubmit(e, this.props.project, this.props.steps)
          }
        >
          <InputLabel>Name of the Project</InputLabel>
          <TextField
            onChange={this.props.handleProjectChange}
            value={this.props.project.title}
            name="title"
            fullWidth={true}
          />
          <InputLabel>Change The cover Image To Your Project</InputLabel>
          <input
            onChange={this.props.handleImageChange}
            type="file"
            name="image"
            src={this.props.projectImage}
          />
          {sortedSteps.map((step, index) => (
            <EditStepForm
              key={index}
              step={step}
              handleStepChange={this.props.handleStepChange}
            />
          ))}
          <Button type="submit" variant="contained" color="primary">
            Submit Changes
          </Button>
          <Button
            onClick={() => this.props.deleteProject(this.props.project)}
            color="secondary"
          >
            Delete this project
          </Button>
        </form>
      </Container>
    );
  }
}
export default EditProjectForm;
