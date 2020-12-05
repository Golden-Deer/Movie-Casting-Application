import db from "../../base";
import "../../App.js";
import React, { useEffect, useState } from 'react';
import { Navbar, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import logo from "../../images/logo.png";
import DisplayActor from "./DisplayActor"
import ToggleBar from "./ToggleBar"

const Search = (props) => {
        console.log(props.location.state);
        const history = useHistory();
        const [count, setCount] = useState(6);
        var tags = {
                gender: 'unspecified',
                age: 'unspecified',
                height: 'unspecified',
                weight: 'unspecified'
        };
        //FIXME: var or const?
        var projectKey = 'unspecified'
        var role = 'unspecified'

        //if the role is not created, skip the part for searching and set to default
        if(props.location.state != null){
                tags = {
                        gender: props.location.state[2].gender,
                        age: props.location.state[2].age,
                        height: props.location.state[2].height,
                        weight: props.location.state[2].weight
                }; 
                
                projectKey = props.location.state[1]
                role = props.location.state[2]
        }
        

        window.onscroll = function (ev) {
                if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
                        setCount(count + 6);
                }
        };

        var topDisplay = null;
        if (props.location.state != null) {
            topDisplay =  <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand>
                <Button variant="outline-light" onClick={() => history.goBack()}>Back</Button>  
            </Navbar.Brand>
                <h3 style={{color: 'white'}}>Showing result for {props.location.state[2].name} in {props.location.state[0].name}</h3>
            </Navbar>
     
        } else {
            topDisplay = 
            <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand>
                <Button variant="outline-light" onClick={() => history.goBack()}>Back</Button>  
            </Navbar.Brand>
                <h3 style={{color: 'white'}}>My Projects</h3>
            </Navbar>
        }

        return (
                <div>
                        {topDisplay}
                        {/* <div className="s-main">
                            <div className="s-sidebar">
                                        <h1>Project list</h1>
                                        <h2> - Project1</h2>
                                        <div id={"mini-project"}>
                                                <h2>project</h2>
                                        </div>
                                </div>
                        </div> */}
                        <div class="body">
                        {/* <ToggleBar /> */}
                        <br />
                        <DisplayActor project={props.location.state[0]} roleName={props.location.state[2].name} tags={tags} numActor={count} projectKey={projectKey} role={role}/>
                        </div>

                </div>
        )
}

export default Search;