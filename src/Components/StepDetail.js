import React from "react";
import { Container, Typography } from "@material-ui/core";

class StepDetail extends React.Component {
  state = {image: null}

  componentDidMount() {
    this.fetchStepImage(this.props.id)
  }

  fetchStepImage = (id) => {
    fetch(`http://localhost:3001/steps/${id}/image`)
      .then((response) => response.json())
      .then((json) => this.setState({ image: json }));
  };

  render() {
    console.log("Step Detail Props", this.props);
    console.log("Step Detail State", this.state)
    return (
      <>
        <Container>
          <Typography variant="h3">{this.props.heading}</Typography>
          <Typography>{this.props.content}</Typography>
          {this.state.image? <img alt="It don't work" src={`http://localhost:3001/${this.state.image.image}`} /> : null }
        </Container>
      </>
    );
  }
}

export default StepDetail;
