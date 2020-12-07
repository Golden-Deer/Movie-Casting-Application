import { AuthContext } from '../auth/Auth';
import React, { useContext, useState } from 'react';
import firebase from 'firebase';
import ProjectList from './ListProjects';
import Button from 'react-bootstrap/Button';

import { Redirect } from 'react-router';

// The Body component renders the user's projects, or the GC marketing pitch if the user is not logged in
const Body = () => {
  const { currentUser } = useContext(AuthContext);
  const [projectName, setProjectName] = useState('');
  const [projectReleaseDate, setProjectReleaseDate] = useState('');
  const [projectGenre, setProjectGenre] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDirector, setProjectDirector] = useState('');
  const [projectProducer, setProjectProducer] = useState('');

  // store project in firebase
  function createProject(e) {
    // add this project to the project list of this user
    firebase
      .database()
      .ref('USER/' + firebase.auth().currentUser.uid)
      .child('projects')
      .once('value', (dataSnapshot) => {
        var projects = dataSnapshot.val();
        if (projects === null) {
          projects = [];
        }
        projects.push({
          name: projectName,
          release_date: projectReleaseDate,
          genre: projectGenre,
          description: projectDescription,
          director: projectDirector,
          producer: projectProducer,
        });
        firebase
          .database()
          .ref('USER/' + firebase.auth().currentUser.uid)
          .child('projects')
          .set(projects);
      });
    // reset states
    setProjectName('');
    setProjectReleaseDate('');
    setProjectGenre('');
    setProjectDescription('');
    setProjectDirector('');
    setProjectProducer('');
    // close project popup
    closePopup('projectPopup');
  }

  function changeProjectReleaseDate(e) {
    // restrict input to 4 integers
    const re = /^[0-9\b]+$/;
    if (
      e.target.value === '' ||
      (re.test(e.target.value) && e.target.value.length <= 4)
    ) {
      setProjectReleaseDate(e.target.value);
    }
  }

  // project popup
  function projectPopup() {
    document.getElementById('projectPopup').style.visibility = 'visible'; // show project popup
    document.getElementById('projectPopup').style.opacity = 100 + '%'; // show project popup
  }

  function closePopup(type) {
    document.getElementById(type).style.opacity = 0 + '%';
    document.getElementById('projectPopup').style.visibility = 'hidden'; // show project popup
  }

  return (
    <div class='body'>
      <table
        id='projectPopup'
        class='largePopup'
        style={{ opacity: 0 + '%', visibility: 'hidden' }}>
        <tr>
          <p class='closeButton' onClick={() => closePopup('projectPopup')}>
            x
          </p>
        </tr>
        <tr class='center'>
          <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
            <b>Create New Project</b>
          </p>
        </tr>
        <tr class='center' style={{ marginTop: 15 + 'px' }}>
          <input
            class='projectInputField'
            value={projectName}
            placeholder='Project Name *'
            form='project_creation_form'
            onChange={(e) => setProjectName(e.target.value)}
          />
        </tr>
        <tr class='center' style={{ marginTop: 15 + 'px' }}>
          <input
            class='projectInputField'
            value={projectReleaseDate}
            placeholder='Projected Release Year *'
            form='project_creation_form'
            onChange={changeProjectReleaseDate}
          />
        </tr>
        <tr class='center' style={{ marginTop: 15 + 'px' }}>
          <input
            class='projectInputField'
            value={projectGenre}
            placeholder='Genre(s)'
            form='project_creation_form'
            onChange={(e) => setProjectGenre(e.target.value)}
          />
        </tr>
        <tr class='center' style={{ marginTop: 15 + 'px' }}>
          <textarea
            class='center'
            cols='41'
            rows='3'
            value={projectDescription}
            placeholder='Brief Description'
            form='project_creation_form'
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </tr>
        <tr class='center' style={{ marginTop: 15 + 'px' }}>
          <input
            class='projectInputField'
            name='director'
            value={projectDirector}
            placeholder='Director(s)'
            form='project_creation_form'
            onChange={(e) => setProjectDirector(e.target.value)}
          />
        </tr>
        <tr class='center' style={{ marginTop: 15 + 'px' }}>
          <input
            class='projectInputField'
            name='producer'
            value={projectProducer}
            placeholder='Producer(s)'
            form='project_creation_form'
            onChange={(e) => setProjectProducer(e.target.value)}
          />
        </tr>
        <tr class='center'>
          <label class='center' style={{ fontSize: 12 + 'px' }}>
            Fields with an asterisk are mandatory
          </label>
        </tr>
        <tr class='center'>
          <Button
            variant='primary'
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 20 + 'px',
            }}
            onClick={createProject}
            disabled={projectName.length < 1 || projectReleaseDate.length != 4}>
            Create Project
          </Button>
        </tr>
      </table>
      {currentUser ? (
        <table id='projectDisplay' style={{ width: 100 + '%' }}>
          <tr>
            <h2 style={{ marginLeft: 30 + 'px', display: 'inline-block' }}>
              <b>My Projects&nbsp;&nbsp;</b>
            </h2>
            <label
              class='invisibleButton'
              onClick={projectPopup}
              style={{ fontSize: 40 + 'px' }}>
              <b>+</b>
            </label>
            <ProjectList />
          </tr>
        </table>
      ) : (
        <></> // implement redirect to about page if user is not logged in
      )}
    </div>
  );
};

export default Body;
