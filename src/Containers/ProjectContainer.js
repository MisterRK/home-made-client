import React from "react";
import { Container } from "@material-ui/core";
import ProjectDetail from "../Components/ProjectDetail";
import EditProjectForm from "../Components/EditProjectFrom";

class ProjectContainer extends React.Component {
  state = {
    project: {},
    steps: [],
    editing: false,
    currentUser: 'Marcus',
    currentUserId: 4
  };

  getProject = () => {
    fetch(`http://localhost:3001/projects/${this.props.id}`)
      .then((response) => response.json())
      .then((project) => this.setState({ project }));
  };
  getSteps = () => {
    fetch(`http://localhost:3001/projects/${this.props.id}/steps`)
      .then((response) => response.json())
      .then((steps) => this.setState({ steps }));
  };
  componentDidMount = () => {
    Promise.all([this.getProject(), this.getSteps()]);
  };
  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };
  handleProjectChange = (e) => {
    const { project } = { ...this.state };
    // console.log(e.target)
    // console.log(project)
    project.title = e.target.value;
    this.setState({ project });
  };
  handleStepChange = (e, order) => {
    const { steps } = { ...this.state };
    const step = steps[order - 1];
    const { name, value } = e.target;
    step[name] = value;
    this.setState({ steps });
  };
  handleImageChange = (e) => {
    this.setState({ projectImage: e.target.value });
  };
  patchProject = () => {
    const updated = this.state.project;
    fetch(`http://localhost:3001/projects/${this.state.project.id}`, {
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
  patchSteps = () => {
    this.state.steps.map((step) => this.patchStep(step));
  };
  handleEditSubmit = (e) => {
    e.preventDefault();
    Promise.all([this.patchProject(), this.patchSteps()]);
    this.setState({ editing: !this.state.editing });
    this.props.history.push(`/projects/${this.state.project.id}`);
    console.log("Form Submission finished");
  };
  deleteProject = (project) => {
    Promise.all([fetch(`http://localhost:3001/projects/${project.id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))])
      this.props.history.push("/projects")
  };
  render() {
    // console.log("Project Container State", this.state);
    // console.log("Project Container Props", this.props)

    return (
      <Container>
        {this.state.editing ? (
          <EditProjectForm
            project={this.state.project}
            steps={this.state.steps}
            handleEditSubmit={this.handleEditSubmit}
            handleProjectChange={this.handleProjectChange}
            handleImageChange={this.handleImageChange}
            handleStepChange={this.handleStepChange}
            deleteProject={this.deleteProject}
          />
        ) : (
          <ProjectDetail
            project={this.state.project}
            steps={this.state.steps}
            projectImage={this.state.projectImage}
            toggleEdit={this.toggleEdit}
            currentUser={this.state.currentUser}
            currentUserId={this.state.currentUserId}
          />
        )}
      </Container>
    );
  }
}
export default ProjectContainer;
