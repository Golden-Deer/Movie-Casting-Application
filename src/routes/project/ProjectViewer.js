import db from '../../base';
import '../../App.js';
import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import ProjectDetail from './ProjectDetail';

const ProjectViewer = (props) => {
  const history = useHistory();
  return (
    <>
      <p>
        <h1 id='my-projects'>
          <a onClick={() => history.push('/')}>&lt; <b>{props.location.state[0].name}</b></a>
        </h1>
      </p>
      <ProjectDetail projectName={props.location.state[0].name}/>
      <div className='project-attributes'>
        <button onClick={() => history.push("/rolepage")}>Role</button>
      </div>
    </>
  );
};

export default ProjectViewer;