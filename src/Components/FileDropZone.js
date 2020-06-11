
import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'

class FileDropZone extends Component{
  render(){
    // console.log("Drop Zone State", this.)
    return (
      <DropzoneArea
        onChange={this.props.handleDropZone}
        />
    )
  }
}

export default FileDropZone;