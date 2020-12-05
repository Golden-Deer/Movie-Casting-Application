import '../../App.js';
import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import ProjectDetail from './ProjectDetail';
import {Navbar, Button} from 'react-bootstrap'

const ProjectViewer = (props) => {
  const history = useHistory();
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand>
        <Button variant="outline-light" onClick={() => history.push('/dashboard')}>Back</Button>  
      </Navbar.Brand>
      <h3 style={{color: 'white'}}>{props.location.state[0].name}</h3>
      </Navbar>
      <br />
      <ProjectDetail projectName={props.location.state[0].name}/>
    </>
  );
};

export default ProjectViewer;