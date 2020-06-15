import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import StepDetail from "./StepDetail";

class ProjectDetail extends React.Component {
  state = {
    project: {},
    steps: [],
  };

  fetchProject = (id) => {
    fetch(`http://localhost:3001/projects/${id}`)
      .then((response) => response.json())
      .then((json) => this.setState({ project: json }));
  };
  fetchSteps = (id) => {
    fetch(`http://localhost:3001/projects/${id}/steps`)
      .then((response) => response.json())
      .then((json) => this.setState({ steps: json }));
  };

  fetchProjectImage = (id) => {
    fetch(`http://localhost:3001/projects/${id}/image`)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => this.setState({ projectImage: json }));
  };

  componentDidMount = () => {
    const projectId = parseInt(this.props.match.params.id);
    Promise.all([
      this.fetchProject(projectId),
      this.fetchSteps(projectId),
      this.fetchProjectImage(projectId),
    ]);
    this.setState({ currentUser: "Nadia", currentUserId: 1 });
  };

  render() {
    // console.log("Project Details State", this.state)
    // console.log("ProjectDetails Props", this.props)
    const sortedSteps = this.state.steps.sort((a,b) => a.order < b.order? -1 : 1)
    return (
      <Container>
        <Typography variant="h1">{this.state.project.title}</Typography>
        {this.state.projectImage ? (
          <img
            alt="It don't work"
            src={`http://localhost:3001/${this.state.projectImage.image}`}
          />
        ) : (
          <span></span>
        )}

        <br />
        <Button
          variant="contained"
          component={RouterLink}
          to="/projects"
          user={this.state.currentUser}
        >
          Back to Projects
        </Button>
        {this.state.currentUserId === this.state.project.user_id ? (
          <Button variant="contained" color="primary" component={RouterLink} to={`/projects/${this.state.project.id}/edit`}>
            Edit This Project
          </Button>
        ) : null}

        {sortedSteps.map((step, index) => (
          <StepDetail
            key={step.id}
            id={step.id}
            heading={step.heading}
            content={step.content}
          />
        ))}
      </Container>
    );
  }
}
export default ProjectDetail;
