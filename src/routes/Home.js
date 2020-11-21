import React, {useContext, useState, useEffect, useRef} from "react";
import { useHistory, Redirect } from "react-router-dom";
import {AuthContext} from "../auth/Auth";
import db from "../base";
import "../App.css";
import logo from "../images/logo.png";

const Home = () => {
    const history = useHistory();
    const {currentUser} = useContext(AuthContext);
    const[disableLogin, setDisableLogin] = useState(true);
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[accountEmail, setAccountEmail] = useState('');
    const[indicator, setIndicator] = useState(' ');
    const[indicatorPadding, setPadding] = useState(60);
    const isFirstRender = useRef(true)

    // callback functions for email and password changes
    useEffect(() => {
        if (!isFirstRender.current){
            if ({email}.email!='' && {password}.password!='')
                setDisableLogin(false);
            else
                setDisableLogin(true);
        }
     }, [email, password]);

    useEffect(() => {
        isFirstRender.current = false;
      }, []);
    
    // handle account button press
    const viewAccount = () => {
        // user is logged in
        if (currentUser){
            // show account popup
            document.getElementById('accountPopup').style = '';
            // blur out main page
            var main = document.getElementById('main');
            main.style.filter = "blur(8px)";
            // set account email state (currentUser variable doesn't load immediately)
            setAccountEmail(currentUser.email);
        }
        else{
            // show login popup
            document.getElementById('loginPopup').style = '';
            // blur out main page
            document.getElementById('main').style.filter = "blur(8px)";
        }
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
        setPadding(60);
        setIndicator('')
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
        setPadding(60);
        setIndicator('')
    }
    
    const handleLogin = (event) => {
        event.preventDefault();
        const {email, password} = event.target.elements;

        try{
            db
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(() => {
                // reload the page
                window.location.reload();
            })
            .catch(() => {
                setIndicator('Incorrect Email or Password');
                setPadding(26);
            })
            
        } catch (error){
            alert(error);
        }
    }

    function handleLogout(){
        db.auth().signOut();
        // reload the page
        window.location.reload();
    }

    function closePopup(type){
        document.getElementById(type).style = 'display: none';
        var main = document.getElementById('main');
        main.style.filter = "blur(0px)";
        setIndicator('');
    }

        return (
            <>
            <table id='accountPopup' class='popup' style={{display: 'none'}}>
                    <tr><p style={{fontSize: 20 + 'px', textAlign: 'right', marginTop: 15 + 'px', marginRight: 20 + 'px'}} onClick={() => closePopup('accountPopup')}>x</p></tr>
                    <tr><p style={{fontSize: 25 + 'px' , textAlign: 'center'}}><b>Your Account</b></p></tr>
                    <tr><p class='popupText'>Account Email: {accountEmail}</p></tr>
                    <tr ><button class='btn btn-primary' style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} onClick={handleLogout}>Sign Out</button></tr>
                </table>
                <form onSubmit={handleLogin} id='login_form'></form>
                <table id='loginPopup' class='popup' style={{display: 'none'}}>
                    <tr class='center'><p style={{fontSize: 20 + 'px', textAlign: 'right', marginTop: 15 + 'px', marginRight: 20 + 'px'}} onClick={()=> closePopup('loginPopup')}>x</p></tr>
                    <tr class='center'><p style={{fontSize: 25 + 'px' , textAlign: 'center'}}><b>Login</b></p></tr>
                    <tr class='center' style={{marginTop: 50 + 'px'}}><input class='center' name="email" type="email" placeholder="Email" form='login_form' onChange={changeEmail}/></tr>
                    <tr class='center'><input class='center' name="password" type="password" placeholder="Password" form='login_form' onChange={changePassword}/></tr>
                    <tr class='center'><p class='warning'>{indicator}</p></tr>
                    <tr class='center' style={{marginTop: [indicatorPadding] + 'px'}}><button class='btn btn-primary' style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: [indicatorPadding] + 'px'}} form='login_form' disabled={disableLogin}>Sign In</button></tr>
                </table>
            <div id='main'>
                <div className="jumbotron">
                    <img src={logo} className="app-logo"/>
                    <button id={"your-account"} onClick={viewAccount}>Your Account</button>
                    <h1 onClick={() => history.push('/discover')}>DISCOVERY</h1>
                </div>

                <button onClick={() => history.push("/search")}>Search</button>
                <button onClick={() => history.push("/discover")}>Discover</button>
            </div>
            </>
        )
}

export default Home;