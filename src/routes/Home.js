import React from "react";
import { useHistory } from "react-router-dom";

import db from "../base";
import "../App.css";

const Home = () => {
    const history = useHistory();

        return (
            <>
                <h1>Home</h1>
                <button onClick={() => history.push("/search")}>Search</button>
                <button onClick={() => history.push("/discover")}>Discover</button>
                <button onClick={() => db.auth().signOut()}>Sign Out</button>
            </>
        )
}

export default Home;