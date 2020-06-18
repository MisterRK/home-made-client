import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";

const styles = (theme) => ({
  root: {
    // backgroundColor: "red",
    overflow: 'auto',
    width: '800px',
    margin: 'auto',
    marginBottom: '50px'
  },
  image: {
    width: "500px",
    height: "500px",
    float: "right",
  },
  content: {
    align: "right",
    width: "500px",
  },
});

class StepDetail extends React.Component {
  render() {
    const { classes } = this.props;
    // console.log("Step Detail Props", this.props);
    // console.log("Step Detail State", this.state)
    return (
      // <Container fullWidth={true}>
      <Box classes={{ root: classes.root }}>
        <Typography variant="h5">{this.props.heading}</Typography>
        {/* <div className='stepDiv'> */}
        {this.props.image ? (
          <div className={[this.props.order]%2 === 0 ? "stepDetailImageRight": "stepDetailImageLeft"}>
            <Image src={`http://localhost:3001/${this.props.image}`} />
          </div>
        ) : null}
        <Typography>{this.props.content}</Typography>
      </Box>

      // </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(StepDetail);
