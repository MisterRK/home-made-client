import React from 'react';
import ProjectContainer from '../Containers/ProjectContainer';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import { Typography } from '@material-ui/core';

class Home extends React.Component {
  state = {
    projects: null,
    steps: null,
    users: null,
    currentUser: 'Nadia'
  }

  fetchProjects = () => {
    fetch(`http://localhost:3001/projects`, {
    })
    .then(response => response.json())
    .then(projects => this.setState({projects}))
  }

  fetchSteps = () => {
    fetch(`http://localhost:3001/steps`, {
    })
    .then(response => response.json())
    .then(steps => this.setState({steps}))
  }

  fetchUsers = () => {
    fetch(`http://localhost:3001/users`, {
    })
    .then(response => response.json())
    .then(users => this.setState({users}))
  }

  componentDidMount(){
    Promise.all([
      this.fetchUsers(),
      this.fetchProjects()
    ])

  }

  

  render(){
    // console.log("Home Level State =>", this.state)
    let testing = this.state.users && this.state.projects
    return(
      <Container>
      {testing
        ?
        <div>
        <Typography variant='h2'>Welcome to Home Made</Typography>
        <Button variant='contained'>Login</Button>
        <Button variant ='contained'>Sinup</Button>
        <Button 
          variant='contained' 
          component={RouterLink}
          to='/projects/new'
          user={this.state.currentUser}
          >
            New Project
          </Button>
        <ProjectContainer 
          projects={this.state.projects}
          // steps={this.state.steps}
          users={this.state.users}
        />
        </div>
        :
        <Typography variant='h1'>Welcome to Home Made</Typography>
      }
      </Container>
    )
  }
}
export default Home;