import db from '../../base';
import '../../App.js';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import ProjectDetail from './ProjectDetail';

const Project = (props) => {
  const history = useHistory();
  return (
    <>
      <div>
        <h1 id='my-projects'>
          <a onClick={() => history.push('/')}>&lt; My Projects</a>
        </h1>
      </div>
      <ProjectDetail projectName={props.location.state.name} />
      <div className='project-attributes'>
        <button onClick={() => history.push("/rolepage")}>Role</button>
      </div>
    </>
  );
};

export default Project;
