import React from 'react';
import { Container, Typography } from '@material-ui/core';

class ProjectDetail extends React.Component {
  state = {
    project: {},
    steps: [],
    images: [],
  } 

  fetchProject= (id) => {
    fetch(`http://localhost:3001/projects/${id}`)
      .then(response => response.json())
      .then(json => this.setState({project: json}))
  }
  fetchSteps= (projId) => {

  }
  
  componentDidMount= () => {
    const projectId = parseInt(this.props.match.params.id)
    this.fetchProject(projectId)
  }

  render(){
    console.log("Project Details State", this.state)
    return(
      <Container>
        <Typography variant='h1'> Project Show Page</Typography>
    {/* <Typography>{this.state.project.id}</Typography> */}
      </Container>
    )
  }
}
export default ProjectDetail;