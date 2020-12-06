import '../../App.js';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import ProjectDetail from './ProjectDetail';
import {Navbar, Button} from 'react-bootstrap'

const ProjectViewer = (props) => {
  const history = useHistory();
  const [projectName, setProjectName] = useState(props.location.state[0].name);

  function resetProjectName(value){
    setProjectName(value);
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand>
        <Button variant="outline-light" onClick={() => history.push('/dashboard')}>Back</Button>  
      </Navbar.Brand>
      <h3 style={{color: 'white'}}>{projectName}</h3>
      </Navbar>
      <br />
      <ProjectDetail index={props.location.state[1]} projectName={projectName} resetProjectName={resetProjectName}/>
    </>
  );
};

export default ProjectViewer;