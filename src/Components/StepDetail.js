import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  image: {
    width: '500px',
    height: '500px',
    float: 'right'
  },
  content: {
    align: 'right',
    width: '500px'
  }
});

class StepDetail extends React.Component {
  render() {
    const { classes } = this.props;
    // console.log("Step Detail Props", this.props);
    // console.log("Step Detail State", this.state)
    return (
      <>
        <Container>
          <Typography variant="h5">{this.props.heading}</Typography>
          <Container>
            {this.props.image ? (
                <img
                  width='500px'
                  height='500px'
                  className='PDImages'
                  alt="It don't work"
                  src={`http://localhost:3001/${this.props.image}`}
                />
            ) : null}
            <Typography  classes={classes.content}>{this.props.content}</Typography>
          </Container>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(StepDetail);
