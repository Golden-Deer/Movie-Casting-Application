import '../../App.js';
import React from 'react';
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
        <Button variant="outline-light" onClick={() => history.goBack()}>Back</Button>
      </Navbar.Brand>
      <h3 style={{color: 'white'}}>{props.location.state[1].name}</h3>
      </Navbar>
      <br />
      <ActorDetail role={props.location.state[0]} actor={props.location.state[1]}/>
    </>
    
  );
};

export default ActorProfile;