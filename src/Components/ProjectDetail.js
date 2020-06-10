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
  fetchSteps= (id) => {
    fetch(`http://localhost:3001/projects/${id}/steps`)
      .then(response => response.json())
      .then(json => this.setState({steps: json}))
  }

  fetchImages = () => {
    fetch(`http://localhost:3000/`)
      .then(response => response.json())
    // ? use next line to do something meaningful with the data
      .then(json => console.log(json))
  }
  
  componentDidMount= () => {
    const projectId = parseInt(this.props.match.params.id)
    Promise.all([
      this.fetchProject(projectId),
      this.fetchSteps(projectId)
    ])
  }

  render(){
    console.log("Project Details State", this.state)
    // console.log("ProjectDetails Params", this.props)
    return(
      <Container>
        <Typography variant='h1'> Project Show Page</Typography>
        {this.state.steps.map((step, index)=>
          <Container key={index}>
            <Typography variant='h3'>{step.heading}</Typography>
            <Typography>{step.content}</Typography>
          </Container>
          )}
      </Container>
    )
  }
}
export default ProjectDetail;