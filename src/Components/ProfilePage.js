import React from 'react'
import { Container, AppBar, Typography, Toolbar, InputBase, Tooltip, Button, IconButton } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'
import { fade, withStyles } from "@material-ui/core/styles"
import AddBoxIcon from '@material-ui/icons/AddBox';
import CardContainer from '../Containers/CardContainer'

const styles = theme => ({
  searchBar: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
  },
  searchIcon: {
    height: '100%',
    position: 'relative',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltip: {
    fontSize: '1em',
  },
  userBtn: {
    color: 'white'
  }
});


class ProfilePage extends React.Component {
  state = {
    projects:[],
    users: []
  }
  componentDidMount = () => {
  this.setState({currentUser: this.props.currentUser, currentUserId: this.props.currentUserId})
  this.getUsersProjects(this.props.currentUserId)
  this.getUsers()
  }
  getUsersProjects = (id) => {
fetch(`http://localhost:3001/users/${this.props.currentUserId}`)
  .then(response => response.json())
  .then(projects => this.setState({projects}))
  }
  getUsers = () => {
    fetch(`http://localhost:3001/users`)
      .then(response => response.json())
      .then(users => this.setState({users}))
  }
  render(){
    const { classes } = this.props;
    console.log(this.state)

    return(
      <Container>
        <AppBar position="sticky">
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
              <Tooltip classes={{tooltip: classes.tooltip}} title="Create a new Project" arrow={true}>
              <IconButton>
                <Button
                component={RouterLink}
                to="/projects/new"
                user={this.state.currentUser}>
                <AddBoxIcon fontSize='large'></AddBoxIcon>
                </Button>
              </IconButton>
              </Tooltip>
              <Button
              classes={{text: classes.userBtn}}
              component={RouterLink}
              to={`users/${this.state.currentUser}`}
              id="userNameAppBar2">
                {this.state.currentUser}
              </Button>
            </Toolbar>
          </AppBar>
            <CardContainer users={this.state.users} projects={this.state.projects}>

          </CardContainer>
      </Container>
    )
  }
} export default withStyles(styles, {withTheme: true})(ProfilePage);