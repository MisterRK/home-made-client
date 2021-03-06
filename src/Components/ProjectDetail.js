import React from "react";
import {
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import StepDetail from "./StepDetail";
import ScrollToTop from './ScrollToTop'
import { Favorite } from "@material-ui/icons";
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    margin: '100px',
  }
})

class ProjectDetail extends React.Component {

  render() {
    const { classes } = this.props
    // console.log("Project Details State", this.state)
    // console.log("ProjectDetails Props", this.props)

    const sortedSteps = this.props.steps.sort((a, b) =>
      a.order < b.order ? -1 : 1
    );
    return (
      <Container classes={classes.root}>
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
        {/* end of nav bar */}

        {this.props.project ? (
          <>
            <Typography variant="h3">{this.props.project.title}</Typography>
            <Typography>By: {this.props.currentUser}</Typography>
          </>
        ) : null}
        {this.props.project ? (
          <img 
            className='projectImage'
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
            order={step.order}
          />
          </>
        ))}
        <ScrollToTop project={this.props.project} />
        
      </Container>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ProjectDetail);
