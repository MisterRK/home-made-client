import React from 'react';
import ProjectCard from '../Components/ProjectCard'
import Container from '@material-ui/core/Container'

const ProjectContainer = props => {
    return(
      <Container>
        {props.projects.map(project =>
          <ProjectCard 
            key={project.id} 
            project={project}
            user={props.users.find(user => 
              user.id === project.user_id
            )}
          />
        )}
      </Container>
    )

}

export default ProjectContainer;