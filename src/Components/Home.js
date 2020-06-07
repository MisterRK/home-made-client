import React from 'react';
import ProjectContainer from '../Containers/ProjectContainer';
import Container from '@material-ui/core/Container'

class Home extends React.Component {
  state = {
    projects: null,
    steps: null,
    users: null
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
    this.fetchProjects();
    this.fetchSteps();
    this.fetchUsers();
  }
  render(){
    // console.log("App Level State =>", this.state)
    let testing = this.state.users && this.state.projects && this.state.steps
    return(
      <Container>
      {testing
        ?
        <div>
        <h1>Welcome to Home Made</h1>
        <button>Login</button>
        <button>Signup</button>
        <ProjectContainer 
          projects={this.state.projects}
          steps={this.state.steps}
          users={this.state.users}
        />
        </div>
        :
        <div>No data</div>
      }
      </Container>
    )
  }
}
export default Home;