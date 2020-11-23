import React, { useContext, useState, useEffect, useRef } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth/Auth';
import db from '../base';
import firebase from 'firebase';
import '../App.css';

const Home = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [indicator, setIndicator] = useState(' ');
  const [indicatorPadding, setPadding] = useState(60);

  // login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  // sign up states
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // password recovery states
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  //project creation states
  const [projectName, setProjectName] = useState('');
  const [projectReleaseDate, setProjectReleaseDate] = useState('');
  const [projectGenre, setProjectGenre] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDirector, setProjectDirector] = useState('');
  const [projectProducer, setProjectProducer] = useState('');

  // handle account button press
  const viewAccount = () => {
    // user is logged in
    if (currentUser) {
      // show account popup
      document.getElementById('accountPopup').style = '';
      // blur out main page
      var main = document.getElementById('main');
      main.style.filter = 'blur(8px)';
      // set account email state (currentUser variable doesn't load immediately)
      setAccountEmail(currentUser.email);
    } else {
      login();
    }
  };

  // login functions
  function login() {
    document.getElementById('signUpPopup').style = 'display: none'; // hide sign up popup
    document.getElementById('passwordRecoveryPopup').style = 'display: none'; // hide password recovery popup
    document.getElementById('loginPopup').style = ''; // show login popup
    document.getElementById('main').style.pointerEvents = 'none'; // disable interaction on main page
    document.getElementById('main').style.filter = 'blur(8px)'; // blur out main page
    setPadding(60);
    setIndicator('');
  }

  const changeLoginEmail = (e) => {
    setLoginEmail(e.target.value);
    setPadding(60);
    setIndicator('');
  };

  const changeLoginPassword = (e) => {
    setLoginPassword(e.target.value);
    setPadding(60);
    setIndicator('');
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      db.auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
          window.location.reload(); // reload the page
        })
        .catch(() => {
          setIndicator('Incorrect Email or Password');
          setPadding(26);
        });
    } catch (error) {
      alert(error);
    }
  };

  function handleLogout() {
    db.auth().signOut();
    window.location.reload(); // reload the page
  }

  // sign up functions
  function signUp() {
    document.getElementById('loginPopup').style = 'display: none'; // hide login popup
    document.getElementById('passwordRecoveryPopup').style = 'display: none'; // hide password recovery popup
    document.getElementById('signUpPopup').style = ''; // show sign up popup
    setPadding(54);
    setIndicator('');
  }

  const changeSignUpEmail = (e) => {
    setSignUpEmail(e.target.value);
    setPadding(54);
    setIndicator('');
  };

  const changeSignUpPassword = (e) => {
    setSignUpPassword(e.target.value);
    setPadding(54);
    setIndicator('');
  };

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
    setPadding(54);
    setIndicator('');
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
    setPadding(54);
    setIndicator('');
  };

  function handleSignUp(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;
    db.auth()
      //check if the account exists
      .fetchSignInMethodsForEmail(email.value)
      .then((signInMethods) => {
        // an empty array means the account doesn't exist
        if (signInMethods.length == 0) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
          window.location.reload(); // reload the page
        } else {
          setIndicator('This email is already associated with an account');
          setPadding(20);
        }
      });
  }

  //reset password functions
  function resetPassword() {
    document.getElementById('loginPopup').style = 'display: none'; // hide login popup
    document.getElementById('signUpPopup').style = 'display: none'; // hide sign up popup
    document.getElementById('passwordRecoveryPopup').style = ''; // show password recovery popup
    setPadding(64);
    setIndicator('');
  }

  function changeRecoveryEmail(e) {
    setRecoveryEmail(e.target.value);
    setPadding(64);
    setIndicator('');
  }

  function handlePasswordRecovery(event) {
    event.preventDefault();
    const { email } = event.target.elements;
    try {
      db.auth()
        .fetchSignInMethodsForEmail(email.value)
        .then((signInMethods) => {
          // an empty array means the account doesn't exist
          if (signInMethods.length == 0) {
            setIndicator(
              'No account in our database is associated with this email'
            );
            setPadding(30);
          } else {
            setIndicator('Account found (email sending in progress)');
            setPadding(30);
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  // project popup
  function projectPopup() {
    document.getElementById('projectPopup').style = ''; // show project popup
    // blur out main page
    var main = document.getElementById('main');
    main.style.filter = 'blur(8px)';
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

  // store project in firebase
  function createProject(e) {
    var PROJECT = firebase.database().ref('/PROJECT');
    PROJECT.push({
      name: projectName,
      release_date: projectReleaseDate,
      genre: projectGenre,
      description: projectDescription,
      director: projectDirector,
      producer: projectProducer,
    });
    // close project popup
    closePopup('projectPopup');
  }

  function closePopup(type) {
    document.getElementById(type).style = 'display: none';
    document.getElementById('main').style.pointerEvents = '';
    document.getElementById('main').style.filter = 'blur(0px)';
    // reset states
    setLoginEmail('');
    setLoginPassword('');
    setSignUpEmail('');
    setSignUpPassword('');
    setFirstName('');
    setLastName('');
    setRecoveryEmail('');
    setIndicator('');
  }

  return (
    <>
      <form onSubmit={handleLogin} id='login_form'></form>
      <form onSubmit={handleSignUp} id='sign_up_form'></form>
      <form
        onSubmit={handlePasswordRecovery}
        id='password_recovery_form'></form>
      <table id='loginPopup' class='popup' style={{ display: 'none' }}>
        <tr class='center'>
          <p class='closeButton' onClick={() => closePopup('loginPopup')}>
            x
          </p>
        </tr>
        <tr class='center'>
          <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
            <b>Login</b>
          </p>
        </tr>
        <tr class='center' style={{ marginTop: 35 + 'px' }}>
          <input
            class='center'
            name='email'
            type='email'
            value={loginEmail}
            placeholder='Email'
            form='login_form'
            onChange={changeLoginEmail}
          />
        </tr>
        <tr class='center'>
          <input
            class='center'
            name='password'
            type='password'
            value={loginPassword}
            placeholder='Password'
            form='login_form'
            onChange={changeLoginPassword}
          />
        </tr>
        <tr class='center'>
          <button class='invisibleMiniButton' onClick={signUp}>
            New to Golden Cast? Sign up here
          </button>
        </tr>
        <tr class='center'>
          <button class='invisibleMiniButton' onClick={resetPassword}>
            Forgot your password? Reset it here
          </button>
        </tr>
        <tr class='center'>
          <p class='warning'>{indicator}</p>
        </tr>
        <tr class='center' style={{ marginTop: [indicatorPadding] + 'px' }}>
          <button
            class='btn btn-primary'
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: [indicatorPadding] + 'px',
            }}
            form='login_form'
            disabled={loginEmail.length < 1 || loginPassword.length < 1}>
            Sign In
          </button>
        </tr>
      </table>
      <table id='signUpPopup' class='extendedPopup' style={{ display: 'none' }}>
        <tr class='center'>
          <p class='closeButton' onClick={() => closePopup('signUpPopup')}>
            x
          </p>
        </tr>
        <tr class='center'>
          <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
            <b>Sign Up</b>
          </p>
        </tr>
        <tr class='center' style={{ marginTop: 35 + 'px' }}>
          <input
            class='center'
            name='email'
            type='email'
            value={signUpEmail}
            placeholder='Email'
            form='sign_up_form'
            onChange={changeSignUpEmail}
          />
        </tr>
        <tr class='center'>
          <input
            class='center'
            name='password'
            type='password'
            value={signUpPassword}
            placeholder='Password (6+ characters)'
            form='sign_up_form'
            onChange={changeSignUpPassword}
          />
        </tr>
        <tr class='center'>
          <input
            class='center'
            name='first_name'
            type='first_name'
            value={firstName}
            placeholder='First Name'
            form='sign_up_form'
            onChange={changeFirstName}
          />
        </tr>
        <tr class='center'>
          <input
            class='center'
            name='last_name'
            type='last_name'
            value={lastName}
            placeholder='Last Name'
            form='sign_up_form'
            onChange={changeLastName}
          />
        </tr>
        <tr class='center'>
          <button class='invisibleMiniButton' onClick={login}>
            Have an account? Log in here
          </button>
        </tr>
        <tr class='center'>
          <p class='warning'>{indicator}</p>
        </tr>
        <tr class='center' style={{ marginTop: [indicatorPadding] + 'px' }}>
          <button
            class='btn btn-primary'
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: [indicatorPadding] + 'px',
            }}
            form='sign_up_form'
            disabled={
              signUpEmail.length < 1 ||
              signUpPassword.length < 7 ||
              firstName.length < 1 ||
              lastName.length < 1
            }>
            Sign Up
          </button>
        </tr>
      </table>
      <table
        id='passwordRecoveryPopup'
        class='popup'
        style={{ display: 'none' }}>
        <tr class='center'>
          <p
            class='closeButton'
            onClick={() => closePopup('passwordRecoveryPopup')}>
            x
          </p>
        </tr>
        <tr class='center'>
          <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
            <b>Password Recovery</b>
          </p>
        </tr>
        <tr class='center' style={{ marginTop: 35 + 'px' }}>
          <input
            class='center'
            name='email'
            type='email'
            value={recoveryEmail}
            placeholder='Email'
            form='password_recovery_form'
            onChange={changeRecoveryEmail}
          />
        </tr>
        <tr class='center'>
          <button class='invisibleMiniButton' onClick={signUp}>
            New to Golden Cast? Sign up here
          </button>
        </tr>
        <tr class='center'>
          <button class='invisibleMiniButton' onClick={login}>
            Know your password? Login up here
          </button>
        </tr>
        <tr class='center'>
          <p class='warning'>{indicator}</p>
        </tr>
        <tr class='center' style={{ marginTop: [indicatorPadding] + 'px' }}>
          <button
            class='btn btn-primary'
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: [indicatorPadding] + 'px',
            }}
            form='password_recovery_form'
            disabled={recoveryEmail.length < 1}>
            Send Email
          </button>
        </tr>
      </table>
      <table id='accountPopup' class='popup' style={{ display: 'none' }}>
        <tr>
          <p class='closeButton' onClick={() => closePopup('accountPopup')}>
            x
          </p>
        </tr>
        <tr>
          <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
            <b>Your Account</b>
          </p>
        </tr>
        <tr>
          <p class='popupText'>Account Email: {accountEmail}</p>
        </tr>
        <tr>
          <button
            class='btn btn-primary'
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onClick={handleLogout}>
            Sign Out
          </button>
        </tr>
      </table>
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
      <div id='main'>
        <div className='jumbotron'>
          <button id={'your-account'} onClick={viewAccount}>
            Your Account
          </button>
          <h1 onClick={() => history.push('/discover')}>About Us</h1>
          {/* <button onClick={() => history.push('/search')}>Search</button>
          <button onClick={() => history.push('/discover')}>Discover</button> */}
        </div>
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
        )}
      </div>
    </>
  );
};

export default Home;
