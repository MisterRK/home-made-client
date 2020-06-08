import React from "react";
import { DropzoneArea } from "material-ui-dropzone";

const FileDropZone = (props) => {
  return <DropzoneArea onChange={props.handleDropZone} />;
};

export default FileDropZone;
