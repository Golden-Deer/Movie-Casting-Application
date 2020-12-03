import db from '../../base';
import '../../App.js';
import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import RolePage from "./RolePage";

const RoleViewer = (props) => {
    const history = useHistory();
    return (
        <>
            <p>
                <h1 id='my-projects'>
                    <a onClick={() => history.goBack()}>&lt;&lt; <b>{props.location.state[0]}</b></a>
                </h1>
            </p>
            <RolePage roleName={props.location.state[0]} project={props.location.state[1]} projectKey={props.location.state[2]} />
        </>
    );
};

export default RoleViewer;