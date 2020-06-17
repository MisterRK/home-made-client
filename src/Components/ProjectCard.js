import React from "react";
import {
  GridListTile,
  GridListTileBar,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  Pageview as PageviewIcon,
  Favorite as FavoriteIcon,
} from "@material-ui/icons/";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  topTileBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  bottomTileBar: { background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",},
  pageview: { color: "white" },
  tile: {
    width: '400px',
    height: '400px',
    padding: '25px'
  }
});

class ProjectCard extends React.Component {
  state = {
    counter: 0,
  };
  handleCount = () => {
    this.setState({ counter: (this.state.counter += 1) });
  };
  render() {
    const { classes } = this.props;
    // console.log("Project Card Props =>", this.props);
    // console.log("projectCard State", this.state);
    return (
      <GridListTile classes={{root: classes.tile}}>
        {this.props.project.image_url ? (
          <img
            className="projectCardImage"
            alt="not available"
            src={`http://localhost:3001/${this.props.project.image_url}`}
          />
        ) : null}
        <GridListTileBar
          classes={{ root: classes.topTileBar }}
          titlePosition="top"
          actionIcon={
            <Tooltip
              onClick={() => this.props.handleShowCard(this.props)}
              title="View This Project"
            >
              <IconButton>
                <PageviewIcon classes={{ root: classes.pageview }} />
              </IconButton>
            </Tooltip>
          }
          title={this.props.project.title}
        />
        <GridListTileBar
          classes={{ root: classes.bottomTileBar }}
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
            this.state.counter === 5 ? (
              <IconButton>
                <FavoriteIcon color="secondary" />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  this.props.addLike(this.props.project);
                  this.handleCount();
                }}
              >
                <FavoriteIcon color="secondary" />
              </IconButton>
            )
          }
          actionPosition="left"
        >
          <GridListTileBar />
        </GridListTileBar>
      </GridListTile>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ProjectCard);
