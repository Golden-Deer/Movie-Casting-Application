import { AuthContext } from '../auth/Auth';
import React, { useContext, useState} from 'react';
import firebase from 'firebase';

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
        var PROJECT = firebase.database().ref("/PROJECT");
        var projectId = PROJECT.push({ name: projectName, release_date: projectReleaseDate, genre: projectGenre, description: projectDescription, director: projectDirector, producer: projectProducer });
        // add this project to the project list of this user
        firebase.database().ref('USER/' + firebase.auth().currentUser.uid).child('projects').once('value', dataSnapshot => {
            var projects = dataSnapshot.val();
            if (projects === null) {
                projects = [];
            }
            projects.push(projectId.key);
            firebase.database().ref('USER/' + firebase.auth().currentUser.uid).child('projects').set(projects);
        });
        // close project popup
        closePopup('projectPopup');
    }

    function changeProjectReleaseDate(e) {
        // restrict input to 4 integers
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value) && e.target.value.length <= 4) {
            setProjectReleaseDate(e.target.value)
        }
    }

    // project popup
    function projectPopup() {
        document.getElementById('projectPopup').style = ''; // show project popup
    }

    function closePopup(type) {
        document.getElementById(type).style = 'display: none';
        document.getElementById('main').style.pointerEvents = '';
        document.getElementById('main').style.filter = 'blur(0px)';
    }

    return(
        <>
        <table id='projectPopup' class='largePopup' style={{ display: 'none' }}>
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
                    <button
                        class='btn btn-primary'
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 20 + 'px',
                        }}
                        onClick={createProject}
                        disabled={projectName.length < 1 || projectReleaseDate.length != 4}>
                        Create Project
                    </button>
                </tr>
        </table>
        {currentUser ? (
            <table id='projectDisplay'>
                <tr>
                    <h2 style={{ marginLeft: 30 + 'px', display: 'inline-block' }}>
                        <b>My Projects&nbsp;</b>
                    </h2>
                    <button class='invisibleButton' onClick={projectPopup}>
                        <b>+</b>
                    </button>
                </tr>
            </table>
        ) : (
                <table id='genericDisplay'>
                    <tr>
                        <h2 style={{ marginLeft: 30 + 'px' }}>
                            <b>Who are We?</b>
                        </h2>
                    </tr>
                    <tr>
                        <label style={{ marginLeft: 30 + 'px' }}>
                            Golden Cast is a premium service to help your casting crew
                            quickly find the right actors and actresses for your casting
                            roles
                        </label>
                    </tr>
                    <tr>
                        <h2 style={{ marginLeft: 30 + 'px', marginTop: 50 + 'px' }}>
                            <b>How to get Started</b>
                        </h2>
                    </tr>
                    <tr>
                        <label style={{ marginLeft: 30 + 'px' }}>
                            Sign up with the Account button to gain access to Golden Cast
                            services. With Golden Cast, you can search for new actors,
                            create and manage your projects, and build your professional
                            network
                        </label>
                    </tr>
                </table>
            )
        }
        </>
    )
};

export default Body;