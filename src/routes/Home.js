import React, {useContext} from "react";
import { useHistory, Redirect } from "react-router-dom";
import {AuthContext} from "../auth/Auth";

import db from "../base";
import "../App.css";
import logo from "../images/logo.png";

const Home = () => {
    const history = useHistory();

        return (
            <>
                <div className="jumbotron">
                    <img src={logo} className="app-logo"/>
                    <button id={"your-account"}>Your Account</button>
                    <h1 onClick={() => history.push('/discover')}>DISCOVERY</h1>
                </div>

                <button onClick={() => history.push("/search")}>Search</button>
                <button onClick={() => history.push("/discover")}>Discover</button>
                <button onClick={() => db.auth().signOut()}>Sign Out</button>
            </>
        )
}

export default Home;