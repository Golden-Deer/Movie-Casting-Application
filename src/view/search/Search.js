import "../../App.js";
import React, {useState} from 'react';
import {Navbar, Button} from "react-bootstrap"
import {useHistory} from "react-router-dom";
import DisplayActor from "./DisplayActor";

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
    //FIXME: var or const?0
    var role = 'unspecified'

    //if the role is not created, skip the part for searching and set to default
    if (props.location.state != null) {
        tags = {
            gender: props.location.state[0].gender,
            age: props.location.state[0].age,
            height: props.location.state[0].height,
            weight: props.location.state[0].weight
        };
        role = props.location.state[0]
    }


    window.onscroll = function (ev) {
        if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
            setCount(count + 6);
        }
    };

    var topDisplay = null;
    if (props.location.state != null) {
        topDisplay = <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand>
                <Button variant="outline-light" onClick={() => history.goBack()}>Back</Button>
            </Navbar.Brand>
            <h3 style={{color: 'white'}}>Showing result for {props.location.state[0].name}</h3>
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
            <div class="body">
                {/* <ToggleBar /> */}
                <br/>
                <DisplayActor role={props.location.state[0]} tags={tags} numActor={count}/>
            </div>

        </div>
    )
}

export default Search;