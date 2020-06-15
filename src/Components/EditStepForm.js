import React from "react";
import {
  Container,
  Typography,
  InputLabel,
  TextField,
} from "@material-ui/core";

class EditStepForm extends React.Component {
  render() {
    const { step } = this.props;
    // console.log(this.props);
    return (
      <Container>
        <Typography variant="h5">Step {step.order}:</Typography>
        <InputLabel>Heading</InputLabel>
        <TextField
          onChange={(e) => this.props.handleStepChange(e, step.order)}
          value={step.heading}
          name="heading"
          fullWidth={true}
        />
        <InputLabel>Content</InputLabel>
        <TextField
          onChange={(e) => this.props.handleStepChange(e, step.order)}
          multiline={true}
          value={step.content}
          name="content"
          fullWidth={true}
        />
      </Container>
    );
  }
}
export default EditStepForm;
