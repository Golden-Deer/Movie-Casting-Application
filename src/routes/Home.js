import React, {useContext, useState, useEffect, useRef} from "react";
import { useHistory, Redirect } from "react-router-dom";
import {AuthContext} from "../auth/Auth";
import db from "../base";
import firebase from 'firebase';
import "../App.css";
import logo from "../images/logo.png";

const Home = () => {
    const history = useHistory();
    const {currentUser} = useContext(AuthContext);
    const[disableLogin, setDisableLogin] = useState(true);
    const[disableSignUp, setDisableSignUp] = useState(true);
    const[disableRecovery, setDisableRecovery] = useState(true);
    const[loginEmail, setLoginEmail] = useState('');
    const[loginPassword, setLoginPassword] = useState('');
    const[signUpEmail, setSignUpEmail] = useState('');
    const[signUpPassword, setSignUpPassword] = useState('');
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[recoveryEmail, setRecoveryEmail] = useState('');
    const[accountEmail, setAccountEmail] = useState('');
    const[indicator, setIndicator] = useState(' ');
    const[indicatorPadding, setPadding] = useState(60);
    const isFirstRender = useRef(true)

    // callback function for email and password changes in login form
    useEffect(() => {
        if (!isFirstRender.current){
            if ({loginEmail}.loginEmail!='' && {loginPassword}.loginPassword!='')
                setDisableLogin(false);
            else
                setDisableLogin(true); 
        }
     }, [loginEmail, loginPassword]);

     // callback function for email and password changes in sign up form
     useEffect(() => {
        if (!isFirstRender.current){
            if ({signUpEmail}.signUpemail!='' && {signUpPassword}.signUpPassword.length >= 6 && {firstName}.firstName!='' && {lastName}.lastName!='')
                setDisableSignUp(false);
            else
                setDisableSignUp(true);     
        }
     }, [signUpEmail, signUpPassword, firstName, lastName]);

     // callback function for email changes in password recovery form
     useEffect(() => {
        if (!isFirstRender.current){
            if ({recoveryEmail}.recoveryEmail!='')
                setDisableRecovery(false);
            else
                setDisableRecovery(true);     
        }
     }, [recoveryEmail]);

    useEffect(() => {isFirstRender.current = false;}, []);
    
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
            login();
        }
    }

    // login functions
    function login(){
        document.getElementById('signUpPopup').style = 'display: none'; // hide sign up popup
        document.getElementById('passwordRecoveryPopup').style = 'display: none'; // hide password recovery popup
        document.getElementById('loginPopup').style = ''; // show login popup
        document.getElementById('main').style.pointerEvents = 'none'; // disable interaction on main page
        document.getElementById('main').style.filter = "blur(8px)"; // blur out main page
        setPadding(60);
        setIndicator('');
    }

    const changeLoginEmail = (e) => {
        setLoginEmail(e.target.value);
        setPadding(60);
        setIndicator('');
    }

    const changeLoginPassword = (e) => {
        setLoginPassword(e.target.value);
        setPadding(60);
        setIndicator('');
    }

    const handleLogin = (event) => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try{
            db
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(() => {
                window.location.reload(); // reload the page
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
        window.location.reload(); // reload the page
    }

    // sign up functions
    function signUp(){
        document.getElementById('loginPopup').style = 'display: none'; // hide login popup
        document.getElementById('passwordRecoveryPopup').style = 'display: none'; // hide password recovery popup
        document.getElementById('signUpPopup').style = ''; // show sign up popup
        setPadding(54);
        setIndicator('');
    }

    const changeSignUpEmail = (e) => {
        setSignUpEmail(e.target.value);
        setPadding(54);
        setIndicator('');
    }

    const changeSignUpPassword = (e) => {
        setSignUpPassword(e.target.value);
        setPadding(54);
        setIndicator('');
    }

    const changeFirstName = (e) => {
        setFirstName(e.target.value);
        setPadding(54);
        setIndicator('');
    }

    const changeLastName = (e) => {
        setLastName(e.target.value);
        setPadding(54);
        setIndicator('');
    }    

    function handleSignUp(event){
        event.preventDefault();
        const {email, password} = event.target.elements;
        db
        .auth()
        //check if the account exists
        .fetchSignInMethodsForEmail(email.value)
        .then((signInMethods) => {
            // an empty array means the account doesn't exist
            if (signInMethods.length == 0){
                firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
                window.location.reload(); // reload the page
            }
            else{
                setIndicator("This email is already associated with an account");
                setPadding(20);
            }
        })
    }

    //reset password functions
    function resetPassword(){
        document.getElementById('loginPopup').style = 'display: none'; // hide login popup
        document.getElementById('signUpPopup').style = 'display: none'; // hide sign up popup
        document.getElementById('passwordRecoveryPopup').style = ''; // show password recovery popup
        setPadding(64);
        setIndicator('');
    }

    function changeRecoveryEmail(e){
        setRecoveryEmail(e.target.value);
        setPadding(64);
        setIndicator('');
    }

    function handlePasswordRecovery(event){
        event.preventDefault();
        const {email} = event.target.elements;
        try{
            db
            .auth()
            .fetchSignInMethodsForEmail(email.value)
            .then((signInMethods) => {
                // an empty array means the account doesn't exist
                if (signInMethods.length == 0){
                    setIndicator("No account in our database is associated with this email")
                    setPadding(30)
                }
                else{
                    setIndicator("Account found (email sending in progress)")
                    setPadding(30)
                }
            })
        } catch(error){
            alert(error);
        }
      }

    function closePopup(type){
        document.getElementById(type).style = 'display: none';
        document.getElementById('main').style.pointerEvents = '';
        document.getElementById('main').style.filter = "blur(0px)";
        // reset states
        setLoginEmail('');
        setLoginPassword('');
        setSignUpEmail('')
        setSignUpPassword('');
        setFirstName('');
        setLastName('');
        setRecoveryEmail('');
        setIndicator('');
    }

        return (
            <>
            <form onSubmit={handleLogin} id='login_form'></form>
            <form onSubmit={handleSignUp} id='sign_up_form'></form>
            <form onSubmit={handlePasswordRecovery} id='password_recovery_form'></form>
            <table id='loginPopup' class='popup' style={{display: 'none'}}>
                <tr class='center'><p class='closeButton' onClick={()=> closePopup('loginPopup')}>x</p></tr>
                <tr class='center'><p style={{fontSize: 25 + 'px' , textAlign: 'center'}}><b>Login</b></p></tr>
                <tr class='center' style={{marginTop: 35 + 'px'}}><input class='center' name="email" type="email" value={loginEmail} placeholder="Email" form='login_form' onChange={changeLoginEmail}/></tr>
                <tr class='center'><input class='center' name="password" type="password" value={loginPassword} placeholder="Password" form='login_form' onChange={changeLoginPassword}/></tr>
                <tr class='center'><button class='invisibleButton' onClick={signUp}>New to Golden Cast? Sign up here</button></tr>
                <tr class='center'><button class='invisibleButton' onClick={resetPassword}>Forgot your password? Reset it here</button></tr>
                <tr class='center'><p class='warning'>{indicator}</p></tr>
                <tr class='center' style={{marginTop: [indicatorPadding] + 'px'}}><button class='btn btn-primary' style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: [indicatorPadding] + 'px'}} form='login_form' disabled={disableLogin}>Sign In</button></tr>
            </table>
            <table id='signUpPopup' class='signUpPopup' style={{display: 'none'}}>
                <tr class='center'><p class='closeButton' onClick={()=> closePopup('signUpPopup')}>x</p></tr>
                <tr class='center'><p style={{fontSize: 25 + 'px' , textAlign: 'center'}}><b>Sign Up</b></p></tr>
                <tr class='center' style={{marginTop: 35 + 'px'}}><input class='center' name="email" type="email" value={signUpEmail} placeholder="Email" form='sign_up_form' onChange={changeSignUpEmail}/></tr>
                <tr class='center'><input class='center' name="password" type="password" value={signUpPassword} placeholder="Password (6+ characters)" form='sign_up_form' onChange={changeSignUpPassword}/></tr>
                <tr class='center'><input class='center' name="first_name" type="first_name" value={firstName} placeholder="First Name" form='sign_up_form' onChange={changeFirstName}/></tr>
                <tr class='center'><input class='center' name="last_name" type="last_name" value={lastName} placeholder="Last Name" form='sign_up_form' onChange={changeLastName}/></tr>
                <tr class='center'><button class='invisibleButton' onClick={login}>Have an account? Log in here</button></tr>
                <tr class='center'><p class='warning'>{indicator}</p></tr>
                <tr class='center' style={{marginTop: [indicatorPadding] + 'px'}}><button class='btn btn-primary' style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: [indicatorPadding] + 'px'}} form='sign_up_form' disabled={disableSignUp}>Sign Up</button></tr>
            </table>
            <table id='passwordRecoveryPopup' class='popup' style={{display: 'none'}}>
                <tr class='center'><p class='closeButton' onClick={()=> closePopup('passwordRecoveryPopup')}>x</p></tr>
                <tr class='center'><p style={{fontSize: 25 + 'px' , textAlign: 'center'}}><b>Password Recovery</b></p></tr>
                <tr class='center' style={{marginTop: 35 + 'px'}}><input class='center' name="email" type="email" value={recoveryEmail} placeholder="Email" form='password_recovery_form' onChange={changeRecoveryEmail}/></tr>
                <tr class='center'><button class='invisibleButton' onClick={signUp}>New to Golden Cast? Sign up here</button></tr>
                <tr class='center'><button class='invisibleButton' onClick={login}>Know your password? Login up here</button></tr>
                <tr class='center'><p class='warning'>{indicator}</p></tr>
                <tr class='center' style={{marginTop: [indicatorPadding] + 'px'}}><button class='btn btn-primary' style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: [indicatorPadding] + 'px'}} form='password_recovery_form' disabled={disableRecovery}>Send Email</button></tr>
            </table>
            <table id='accountPopup' class='popup' style={{display: 'none'}}>
                <tr><p class='closeButton' onClick={() => closePopup('accountPopup')}>x</p></tr>
                <tr><p style={{fontSize: 25 + 'px' , textAlign: 'center'}}><b>Your Account</b></p></tr>
                <tr><p class='popupText'>Account Email: {accountEmail}</p></tr>
                <tr ><button class='btn btn-primary' style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} onClick={handleLogout}>Sign Out</button></tr>
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