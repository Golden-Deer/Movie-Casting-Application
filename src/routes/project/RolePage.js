import db from "../../base";
import "../../App.js";
import React from 'react';
import { useHistory } from "react-router-dom";
import logo from "../../../images/logo.png"

const RolePage = () => {
    const history = useHistory();
    return (
        <>
            <header class="container">
                <img src={logo} className="app-logo"/>
                <button id={"your-account"}>Your Account</button>
            </header>

            <div className="back-to-project">
                <a onClick={() => history.push('/')}>&lt;&lt; Back to Project</a>
            </div>

            <div className="role-info">
                Role Basic Info
            </div>

            <div className="project-attributes">
                Casting Candidates
                <>
                    Candidate
                </>
            </div>
        </>
    )
}

export default RolePage;