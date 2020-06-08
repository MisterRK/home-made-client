import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const ProjectCard = props => {
  // console.log("Project Card Props =>", props)
  return(
<Card raised='true'>
    <CardContent>
      <Typography variant='h6'>
        {props.project.title}
      </Typography>
      <Typography variany='subtitile1'>
        by {props.user.name}
      </Typography>
    </CardContent>
</Card>
  )

}
export default ProjectCard;