import db from "../../base";
import "../../App.js";
import React from 'react';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'

const Discover = () => {
        const history = useHistory();
        return (
            <>
                <h1>Discover</h1>
                <Button onClick={() => history.push("/")}>Home</Button>
                <Button onClick={() => history.push("/search")}>Search</Button>
            </>
        )
}

export default Discover;