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
                        <div className= "s-category">
                                <button>TOP CHOICE</button>
                                <button>Key word</button>
                                <button>Key word</button>
                        </div>
                        
                        <button id={"block"}>Picture</button>
                        <button id={"block"}>Picture</button>
                        <button id={"block"}>Picture</button>

                        <br>
                        </br>

                        <button id={"block"}>Picture</button>
                        <button id={"block"}>Picture</button>
                        <button id={"block"}>Picture</button>
                
                    </div>
            </>
        )
}

export default Search;