import React from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import Container from '@material-ui/core/Container'


//start with a project title field and a button to submit
//button for add step should add additional fields to the DOM so you can add more steps


const addStep = () => {
  return (
    <div>
      <InputLabel>Step 2</InputLabel>
      <TextField/>
    </div>
  )
}

const NewProjectForm = () => {
  return (
    <Container>
      <Typography variant='h1'>Let's make a new Project</Typography>
      <InputLabel
        required='true'
      >Name of the Project</InputLabel>
      <TextField 
      placeholder="Easy Bake Brownies"
      />
      <br/>
      <br/>
      <InputLabel>Project Introduction</InputLabel>
      <TextField 
      multiline='true'
      fullWidth='true'/>
      <br/>
      <br/>
      <InputLabel>Step One</InputLabel>
      <TextField
      placeholder='Heading i.e. mix the ingredients'
      multiline='true'/>
      <br/>
      <br/>
      <InputLabel>Step One Directions</InputLabel>
      <TextField 
      multiline='true'
      fullWidth='true'/>
      <br/>
      <br/>
      

      <Button variant='contained' onClick={()=>addStep()}>Add a Step</Button>
      <Button variant='contained'>Post this project</Button>
    </Container>

  )
}

export default NewProjectForm;