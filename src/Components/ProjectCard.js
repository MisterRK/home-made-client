import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '25px',
    backgroundColor: '#9CC298'
  }
});

const ProjectCard = props => {
  // console.log("Project Card Props =>", props)
  const classes = useStyles();

  return(
<Card raised='true' className={classes.root}>
    <CardContent>
      <Typography variant='h5'>
        {props.project.title}
      </Typography>
      <Typography variant='subtitle1'>
        by {props.user.name}
      </Typography>
    </CardContent>
</Card>
  )

}
export default ProjectCard;