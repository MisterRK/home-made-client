import React from "react";
import CardContainer from "../Containers/CardContainer";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import { Typography, AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade, withStyles } from "@material-ui/core/styles"
import AddBoxIcon from '@material-ui/icons/AddBox';

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
  }
  
});


class Home extends React.Component {
  state = {
    projects: [],
    users: [],
    search: "",
    currentUser: "Marcus",
    currentUserId: 4,
  };

  fetchProjects = () => {
    fetch(`http://localhost:3001/projects`)
      .then((response) => response.json())
      .then((projects) => this.setState({ projects }));
  };

  fetchUsers = () => {
    fetch(`http://localhost:3001/users`)
      .then((response) => response.json())
      .then((users) => this.setState({ users }));
  };

  componentDidMount() {
    Promise.all([this.fetchProjects(), this.fetchUsers()]);
  }

  addLike = (project) => {
    project.likes += 1;
    fetch(`http://localhost:3001/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((json) => this.setState({ ...this.state.projects }));
  };

  handleSearch = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  render() {
    // console.log("Home Level State =>", this.state)
    const { classes } = this.props;
    let filteredProjects = this.state.projects.filter(project => project.title.toLowerCase().includes(this.state.search.toLowerCase()))

    return (
      <Container>
        <div>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h2">Home Made</Typography>
              <div className="searchBar">
                <SearchIcon clases={{root: classes.searchIcon}} />
                <InputBase
                classes={{root: classes.searchBar}}
                  onChange={this.handleSearch}
                  value={this.state.search}
                  name="search"
                  placeholder="Search..."
                />
              </div>
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
              <Typography id="userNameAppBar2">
                {this.state.currentUser}
              </Typography>
            </Toolbar>
          </AppBar>

          <CardContainer
            projects={filteredProjects}
            users={this.state.users}
            addLike={this.addLike}
          />
        </div>
      </Container>
    );
  }
}
export default withStyles(styles, {withThem: true})(Home);
