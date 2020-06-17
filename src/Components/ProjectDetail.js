import React from "react";
import {
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import StepDetail from "./StepDetail";

class ProjectDetail extends React.Component {
  render() {
    // console.log("Project Details State", this.state)
    // console.log("ProjectDetails Props", this.props)

    const sortedSteps = this.props.steps.sort((a, b) =>
      a.order < b.order ? -1 : 1
    );
    return (
      <Container>
        <AppBar className="appBar" position="sticky">
          <Toolbar>
            <Typography variant="h2">Home Made</Typography>
            <Button
              id="backToProjectsBtn"
              variant="contained"
              component={RouterLink}
              to="/projects"
            >
              Back to Projects
            </Button>
            <Typography id="userNameAppBar1">
              {this.props.currentUser}
            </Typography>
          </Toolbar>
        </AppBar>
        {this.props.project ? (
          <>
            <Typography variant="h3">{this.props.project.title}</Typography>
            <Typography>By: {this.props.currentUser}</Typography>
          </>
        ) : null}
        {this.props.project ? (
          <img
            alt="It don't work"
            src={`http://localhost:3001/${this.props.project.image_url}`}
          />
        ) : (
          <span></span>
        )}
        <br />
        <br />
        {this.props.currentUserId === this.props.project.user_id ? (
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.toggleEdit}
            // component={RouterLink}
            // to={`/projects/${this.state.project.id}/edit`}
          >
            Edit This Project
          </Button>
        ) : null}

        {sortedSteps.map((step, index) => (
          <>
          <StepDetail
            key={step.id}
            id={step.id}
            heading={step.heading}
            content={step.content}
            image={step.image_url}
          />
          <br/>
          </>
        ))}
      </Container>
    );
  }
}
export default ProjectDetail;
