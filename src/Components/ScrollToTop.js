import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Favorite as FavoriteIcon } from "@material-ui/icons/";

class ScrollToTop extends React.Component {
  state = {
    is_visible: false,
  };
  componentDidMount = () => {
    document.addEventListener("scroll", this.toggleVisibility, true);
  };
  componentWillUnmount() {
    window.removeEventListener("scroll", this.toggleVisibility);
  }
  toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      this.setState({ is_visible: true });
    } else {
      this.setState({
        is_visible: false,
      });
    }
  };
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
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
  render() {
    // console.log(this.props)
    return (
      <>
        {this.state.is_visible ? (
          <div id="scroll" align="right" onScroll={this.toggleVisibility}>
            <IconButton>
            <FavoriteIcon onClick={() => this.addLike(this.props.project)} color='secondary'/>
            </IconButton>
            <IconButton>
              <ArrowUpwardIcon color="primary" onClick={this.scrollToTop} />
            </IconButton>
          </div>
        ) : null}
      </>
    );
  }
}
export default ScrollToTop;
