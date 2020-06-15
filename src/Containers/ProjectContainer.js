import React from 'react';
import ProjectCard from '../Components/ProjectCard'
import { Container, GridList} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles((them) => ({
  gridList: {
    width: 1000,
    height: 1000
  }
}))

const ProjectContainer = props => {
  const history = useHistory()


  const handleShowCard = (props) => {
    history.push(`/projects/${props.project.id}`)
  }

  const classes = useStyles();
  
  

    return(
      <Container>
        <GridList className={classes.gridList}>
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
        </GridList>
      </Container>
    )

}

export default ProjectContainer;