import db from "../../base";
import "../../App.js";
import React from 'react';
import { useHistory } from "react-router-dom";
import logo from "../../images/logo.png";

const Search = () => {
        const history = useHistory();
        return (
            <>

                    <div className="s-navbar">
                            <img src={logo} className="app-logo"/>
                            <h1 onClick={() => history.push("/")}>My Project</h1>
                            <button id={"your-account"}>Your Account</button>
                    </div>

                    <button onClick={() => history.push("/search")}>Search</button>
                    <button onClick={() => history.push("/discover")}>Discover</button>
                    <button onClick={() => db.auth().signOut()}>Sign Out</button>
            </>
        )
}

export default Search;