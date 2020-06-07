import React from 'react'

const ProjectCard = props => {
  // console.log("Project Card Props =>", props)
  return(
    
    <div>
      {props.project.title} by {props.user.name}
    </div>
  )

}
export default ProjectCard;