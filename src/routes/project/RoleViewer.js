import '../../App.js';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import RolePage from "./RolePage";
import {Navbar, Button} from 'react-bootstrap'


const RoleViewer = (props) => {
    console.log(props.location.state);
    const history = useHistory();
    const [roleName, setRoleName] = useState(props.location.state[0]);

    function resetRoleName(value){
        setRoleName(value);
    }

    return (
        <>
        <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>
            <Button variant="outline-light" onClick={() => history.goBack()}>Back</Button>  
        </Navbar.Brand>
        <h3 style={{color: 'white'}}>{roleName}</h3>
        </Navbar>
        <br />
        <RolePage roleName={roleName} project={props.location.state[1]} projectKey={props.location.state[2]} roleKey={props.location.state[3]} resetRoleName={resetRoleName}/>
        </>
    );
};

export default RoleViewer;