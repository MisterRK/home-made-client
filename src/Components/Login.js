import React from 'react';
import { Typography, Button, Container, TextField } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    marginTop: '200px'
  }
});

class Login extends React.Component {
  state = {
    users:[],
    currentUser: null,
    currentuserid: null,
    userInput: "",
    userPassword: ""
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
      console.log(name)
      this.props.history.push('/projects')
}
  render(){
    const { classes } = this.props
    console.log("login state", this.state)
    return(
      <Container >
        <Typography classes={{root: classes.root}} align='center'   variant='h1'>Home Made</Typography>
        <form className="loginForm"  onSubmit={(e) => this.login(e, this.state.userInput)}>
          <TextField placeholder="name"
          name='userInput'
          value={this.state.userInput}
          onChange={this.handleChange}
          ></TextField>
          
          <br/>
          <br/>
          <TextField placeholder="password"
          type='password'
          name='userPassword'
          value={this.state.userPassword}
          onChange={this.handleChange}
          ></TextField>
          <br/>
          <br/>
          <Button variant='contained' type='submit'>Login</Button>
        </form>
        <br/>
        <br/>
        <br/>
        <div className='loginForm'>
        <Button>Signup</Button>
        </div>
      </Container>


    )
  }
} export default withStyles(styles, { withTheme: true })(Login);