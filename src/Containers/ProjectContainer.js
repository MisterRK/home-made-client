import React from 'react';
import ProjectCard from '../Components/ProjectCard'
import Container from '@material-ui/core/Container'
import { useHistory } from 'react-router-dom';


const ProjectContainer = props => {

  const handleShowCard = (props) => {
    history.push(`/projects/${props.project.id}`)
  }

  const history = useHistory()
  // console.log("useHistory", history)
    return(
      <Container>
        {props.projects.map(project =>
          <ProjectCard 
            handleShowCard={handleShowCard}
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