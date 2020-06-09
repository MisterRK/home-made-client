import React from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class NewStepForm extends React.Component {
  state = {
    currentStep: 1,
    intro: { order: 1, heading: "", content: "" },
    step1Order: 2,
    step1Heading: "",
    step1Content: "",

    step2Order: 3,
    step2Heading: "",
    step2Content: "",

    step3Order: 4,
    step3Heading: "",
    step3Content: "",

    step4Order: 5,
    step4Heading: "",
    step4Content: "",

    step5Order: 6,
    step5Heading: "",
    step5Content: "",

    step6Order: 7,
    step6Heading: "",
    step6Content: "",

    step7Order: 8,
    step7Heading: "",
    step7Content: "",

    step8Order: 9,
    step8Heading: "",
    step8Content: "",

    step9Order: 10,
    step9Heading: "",
    step9Content: "",
    step10Order: 11,
    step10Heading: "",
    step10Content: "",
    
  };

  incrementStep = () => {
      this.setState({currentStep: this.state.currentStep+1})
  }
  decrementStep = () => {
    this.setState({currentStep: this.state.currentStep-1})
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  render() {
    // console.log("newStepForm Props",this.props)
    console.log("New Step Form State=>", this.state);
    return (
      <Container>
        <form>
          {/* Render Step Form */}
          {this.state.currentStep ?
          <Container>
            <Typography variant="h2">Add Step {this.state.currentStep} your Project</Typography>
            <Typography variant="h3">{this.props.ProjectTitle}</Typography>
            <InputLabel>Step {this.state.currentStep} Heading</InputLabel>
            <TextField
              onChange={this.handleChange}
              value={this.state.step1Heading}
              name={`step${this.state.currentStep}Heading`}
              placeholder="i.e. Step 1: Mix The Ingredients"
              multiline={true}
              fullWidth={true}
            />
            <br />
            <br />
            <InputLabel>Step {this.state.currentStep} Directions</InputLabel>
            <TextField
              onChange={this.handleChange}
              name="step1Content"
              multiline={true}
              fullWidth={true}
            /> 
          </Container>
        :
        null}
          
          <br />
          <br />
          <Button onClick={this.incrementStep}>Next Step</Button>
          <br />
          <br /><br />
          <br />
          {this.state.currentStep > 1?
          <Button onClick={this.decrementStep}>Previous Step</Button>:null}
        </form>
      </Container>
    );
  }
}
export default NewStepForm;
