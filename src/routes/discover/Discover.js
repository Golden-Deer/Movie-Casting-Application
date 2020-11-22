import db from "../../base";
import "../../App.js";
import React from 'react';
import { useHistory } from "react-router-dom";

const Discover = () => {
        const history = useHistory();
        return (
            <>
                <h1>Discover</h1>
                <button onClick={() => history.push("/")}>Home</button>
                <button onClick={() => history.push("/search")}>Search</button>
            </>
        )
}

export default Discover;