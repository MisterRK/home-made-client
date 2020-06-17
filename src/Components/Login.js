import React from 'react';
import { Typography, Button, Container, TextField } from '@material-ui/core'

class Login extends React.Component {
  state = {
    users:[],
    currentUser: null,
    currentuserid: null,
    userInput: ""
  }

  componentDidMount = () => {
    this.fetchUsers();
  } 

  fetchUsers = () => {
    fetch(`http://localhost:3001/users`)
      .then(response => response.json())
      .then(users => this.setState({users}))
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
login = (e, name) => {
  e.preventDefault();
  for(let i = 0; i < this.state.users.length; i++){
    if(this.state.users[i].name === name){
      this.props.history.push('/projects')
    } else return null
  }
}
  render(){
    // console.log("login state", this.state)
    return(
      <Container>
        <Typography variant='h1'>Home Made</Typography>
        <form onSubmit={(e) => this.login(e, this.state.userInput)}>
          <TextField placeholder="name"
          name='userInput'
          value={this.state.userInput}
          onChange={this.handleChange}
          ></TextField>
          
          <br/>
          <br/>
          
          <Button variant='contained' type='submit'>Login</Button>
        </form>
        <br/>
        <br/>
        <br/>
        <Button>Signup</Button>
      </Container>


    )
  }
} export default Login;