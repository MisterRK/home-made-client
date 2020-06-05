import React from 'react';
import ProjectCard from '../Components/ProjectCard'

const ProjectContainer = (props) => {
  console.log("ProjectContainer Props =>", props)
  return(
    <div id='project-container'>
      {props.projects.map(project =>
        <ProjectCard 
          key={project.id} 
          project={project}
        />
      )}
    </div>
  )
}

export default ProjectContainer;