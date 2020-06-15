import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import FileDropZone from "./FileDropZone";
import NewStepForm from "./NewStepForm";
import Axios from 'axios'

class NewProjectForm extends React.Component {
  state = {
    title: "",
    currentUser: null,
    currentUserId: null,
    image: null,
    projectId: null,
    steps: [],
    counter: 0,
    started: false
  };

  componentDidMount = () => {
    this.setState({
      currentUser: this.props.currentUser,
      currentUserId: this.props.currentUserId,
    });
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
      user_id: this.state.currentUserId,
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
      .then((json) => this.setState({ projectId: json.id, projectTitle: json.title, started: true }));
      
  };

  createProject = (e) => {
    e.preventDefault();
    const data = new FormData(e.target)


    Axios.post(`http://localhost:3001/projects`, data)
    .then(response => this.setState({ projectId: response.data.id, projectTitle: response.data.title, started: true }))
    // 
  }

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

    // console.log("New Project From State", this.state);
    // console.log(this.state.image)
    
    
    return (
      <Container>
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
          <input type='file' name='image'/>
          {this.props.currentUserId ? <input type='hidden' name='user_id' value={this.props.currentUserId}/>: null}
          {this.state.started ? 
          <Button variant='contained' onClick={this.addStep}>Add a Step</Button>
          :
          <Button type="submit" variant="contained">Start this project</Button>
          }
        </form>
          {steps}
      </Container>
    );
  }
}

export default NewProjectForm;
