import React from "react";
import ProjectCard from "../Components/ProjectCard";
import { Container, GridList } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  gridList: {
    width: 2000,
    height: 1200,
  },
}));

const CardContainer = (props) => {
  const history = useHistory();

  const handleShowCard = (props) => {
    history.push(`/projects/${props.project.id}`);
  };

  const classes = useStyles();

  return (
      <GridList classes={classes.gridList}>
        {props.projects.map((project) => (
          <ProjectCard
            handleShowCard={handleShowCard}
            key={project.id}
            project={project}
            addLike={props.addLike}
            user={props.users.find((user) => user.id === project.user_id)}
          />
        ))}
      </GridList>
  );
};

export default CardContainer;
