import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root:{
    margin: '25px'
  },
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
        <Container classes={{root: classes.root}}>
          <Typography variant="h5">{this.props.heading}</Typography>
          <Container>
            <div className='stepDiv'>
            {this.props.image ? (
              <div className='stepDetailImage'>
                <img
                  width='400px'
                  height='400px'
                  alt="It don't work"
                  src={`http://localhost:3001/${this.props.image}`}
                />
              </div>
            ) : null}
            <Typography>{this.props.content}</Typography>
            </div>
            <br/>
            <br/>
          </Container>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(StepDetail);
