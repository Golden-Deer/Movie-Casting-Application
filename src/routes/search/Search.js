import db from "../../base";
import "../../App.js";
import React from 'react';
import { useHistory } from "react-router-dom";

const Search = () => {
        const history = useHistory();
        return (
            <>
                <h1>Search</h1>
                <button onClick={() => history.push("/")}>Home</button>
                <button onClick={() => history.push("/discover")}>Discover</button>
            </>
        )
}

export default Search;