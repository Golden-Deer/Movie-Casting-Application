import db from "../../base";
import "../../App.js";
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import logo from "../../images/logo.png";
import DisplayActor from "./DisplayActor"

const Search = () => {
        const history = useHistory();
        const [count, setCount] = useState(9);

        window.onscroll = function (ev) {
                if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
                        setCount(count + 6);
                }
        };

        return (
                <div>
                        <div className="s-navbar">
                                {/*<img src={logo} className="app-logo"/>*/}
                                <h1 onClick={() => history.push("/")}>
                                        My Project <a>Showing result for Role1</a> {/*TODO: change is to new*/}
                                        <button id={"your-account"}>Your Account</button>
                                </h1>

                        </div>
                        <div className="s-main">
                                <div className="s-sidebar">
                                        <h1>Project list</h1>
                                        <h2> - Project1</h2>
                                        <div id={"mini-project"}>
                                                <h2>project</h2>
                                        </div>
                                </div>
                        </div>
                        <div className="s-category">
                                <button>TOP CHIOCE</button>
                                <button>Key word</button>
                                <button>Key word</button>
                        </div>
                        <DisplayActor numActor={count} />

                </div>
        )
}

export default Search;