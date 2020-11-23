import db from '../base';
import React, { useContext, useState} from 'react';
import SignUpPopup from './SignUpPopup';
import passwordRecoveryPopupPoup from './passwordRecoveryPopup';
import PasswordRecoveryPopup from './passwordRecoveryPopup';

const Login = () => {

// login states
const [loginEmail, setLoginEmail] = useState('');
const [loginPassword, setLoginPassword] = useState('');
const [indicator, setIndicator] = useState(' ');
const [indicatorPadding, setPadding] = useState(60);

const changeLoginEmail = (e) => {
    setLoginEmail(e.target.value);
    setPadding(60);
    setIndicator('');
};

const changeLoginPassword = (e) => {
    setLoginPassword(e.target.value);
    setPadding(60);
    setIndicator('');
};

const handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
        db.auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(() => {
                closePopup('loginPopup') // close login popup
            })
            .catch(() => {
                setIndicator('Incorrect Email or Password');
                setPadding(26);
            });
    } catch (error) {
        alert(error);
    }
};

//reset password functions
function resetPassword() {
    document.getElementById('loginPopup').style = 'display: none'; // hide login popup
    document.getElementById('signUpPopup').style = 'display: none'; // hide sign up popup
    document.getElementById('passwordRecoveryPopup').style = ''; // show password recovery popup
    setIndicator('');
}

function signUp() {
    document.getElementById('loginPopup').style = 'display: none'; // hide login popup
    // document.getElementById('passwordRecoveryPopup').style = 'display: none'; // hide password recovery popup
    document.getElementById('signUpPopup').style = ''; // show sign up popup
    setIndicator('');
}

function closePopup(type) {
    document.getElementById(type).style = 'display: none';
    document.getElementById('main').style.pointerEvents = '';
    document.getElementById('main').style.filter = 'blur(0px)';
    // reset states
    setLoginEmail('');
    setLoginPassword('');
    // setSignUpEmail('');
    // setSignUpPassword('');
    // setFirstName('');
    // setLastName('');
    // setRecoveryEmail('');
    setIndicator('');
}

return(
    <>
    <SignUpPopup/>
    <PasswordRecoveryPopup/>
    <form onSubmit={handleLogin} id='login_form'></form>
    <table id='loginPopup' class='popup' style={{ display: 'none' }}>
        <tr class='center'>
            <p class='closeButton' onClick={() => closePopup('loginPopup')}>
                x
            </p>
        </tr>
        <tr class='center'>
            <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                <b>Login</b>
            </p>
        </tr>
        <tr class='center' style={{ marginTop: 35 + 'px' }}>
            <input
                class='center'
                name='email'
                type='email'
                value={loginEmail}
                placeholder='Email'
                form='login_form'
                onChange={changeLoginEmail}
            />
        </tr>
        <tr class='center'>
            <input
                class='center'
                name='password'
                type='password'
                value={loginPassword}
                placeholder='Password'
                form='login_form'
                onChange={changeLoginPassword}
            />
        </tr>
        <tr class='center'>
            <button class='invisibleMiniButton' onClick={signUp}>
                New to Golden Cast? Sign up here
            </button>
        </tr>
        <tr class='center'>
            <button class='invisibleMiniButton' onClick={resetPassword}>
                Forgot your password? Reset it here
            </button>
        </tr>
        <tr class='center'>
            <p class='warning'>{indicator}</p>
        </tr>
        <tr class='center' style={{ marginTop: [indicatorPadding] + 'px' }}>
            <button
                class='btn btn-primary'
                style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: [indicatorPadding] + 'px',
                }}
                form='login_form'
                disabled={loginEmail.length < 1 || loginPassword.length < 1}>
                Sign In
            </button>
        </tr>
    </table>
    </>
    )
};

export default Login;