import '../../App.js';
import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import ActorDetail from './ActorDetail';
import {Navbar, Button} from 'react-bootstrap'

const ActorProfile = (props) => {
  const history = useHistory();
  return (
    <>
    <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand>
        <Button variant="outline-light" onClick={() => history.push('/discover')}>Back</Button>
      </Navbar.Brand>
      <h3 style={{color: 'white'}}>{props.location.state[1].name}</h3>
      </Navbar>
      <br />
      <ActorDetail roleName={props.location.state[0]} actor={props.location.state[1]} projectKey={props.location.state[2]} role={props.location.state[3]} project={props.location.state[4]} roleKey={props.location.state[5]}/>
    </>
    
  );
};

export default ActorProfile;