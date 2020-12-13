import '../../App.js';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import '../../App.css';
import RolePage from "./RolePage";
import {Navbar, Button} from 'react-bootstrap'


const RoleViewer = (props) => {
    const history = useHistory();
    const [roleName, setRoleName] = useState(props.location.state[0].name);

    function resetRoleName(value) {
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
            <br/>
            <RolePage role={props.location.state[0]} project={props.location.state[1]} resetRoleName={resetRoleName}/>
        </>
    );
};

export default RoleViewer;