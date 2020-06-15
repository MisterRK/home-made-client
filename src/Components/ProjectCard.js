import React from "react";
import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

class ProjectCard extends React.Component {
  state = {
    image: null,
  };
  componentDidMount = () => {
    this.fetchImage(this.props.project.id);
  };
  fetchImage = (id) => {
    fetch(`http://localhost:3001/projects/${id}/image`)
      .then((response) => response.json())
      .then((image) => this.setState({ image }));
  };

  render() {
    // console.log("Project Card Props =>", this.props);
    // console.log("projectCard State", this.state);
    return (
      <GridListTile
        onClick={() => this.props.handleShowCard(this.props)}
        className="projectCard"
      >
        {this.state.image ? (
          <img
            className="projectCardImage"
            alt="nope"
            src={`http://localhost:3001/${this.state.image.image}`}
          />
        ) : null}
        <GridListTileBar
        titlePosition='top'
        actionIcon={
          <IconButton>
            
          </IconButton>
        }
        />
        <GridListTileBar
          className="tileBars"
          title={this.props.project.title}
          subtitle={
            this.props.user ? (
              <span>
                by: {this.props.user.name} {this.props.project.likes} Likes
              </span>
            ) : (
              <span></span>
            )
          }
          actionIcon={
            <IconButton>
              <FavoriteBorder></FavoriteBorder>
            </IconButton>
          }
        ></GridListTileBar>
      </GridListTile>
    );
  }
}
export default ProjectCard;
