import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'


//save button underneath intro to make sure the post goes to the back end
const NewIntroForm = (props) => {
  return(
    <form>
      <InputLabel>Let's start with an introduction</InputLabel>
      <TextField
            onChange={props.handleChange}
            value={props.projectIntro}
            name="projectIntro"
            multiline={true}
            fullWidth={true}
          />
    </form>
  )
}

export default NewIntroForm