import '../../App.js';
import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import RolePage from "./RolePage";
import {Navbar, Button} from 'react-bootstrap'


const RoleViewer = (props) => {
    const history = useHistory();
    return (
        <>
        <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>
            <Button variant="outline-light" onClick={() => history.goBack()}>Back</Button>  
        </Navbar.Brand>
        <h3 style={{color: 'white'}}>{props.location.state[0]}</h3>
        </Navbar>
        <br />
        <RolePage roleName={props.location.state[0]} project={props.location.state[1]} projectKey={props.location.state[2]} />
        </>
    );
};

export default RoleViewer;