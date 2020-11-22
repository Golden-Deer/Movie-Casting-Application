import db from '../../base';
import '../../App.js';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';

const ProjectList = () => {
  const history = useHistory();
  return (
    <>
      <div>
        <h1 id='my-projects'>
          <a onClick={() => history.push('/')}>&lt; My Projects</a>
        </h1>
        <button id={'your-account'}>Your Account</button>
      </div>
      <div className='project-attributes'>Project Name</div>
      <div className='project-attributes'>Description</div>
      <div className='project-attributes'>Logistic</div>
      <div className='project-attributes'>Role</div>
    </>
  );
};

export default ProjectList;
