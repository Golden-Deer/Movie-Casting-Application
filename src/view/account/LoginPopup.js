import {React, useState} from 'react';
import SignUpPopup from './SignUpPopup';
import PasswordRecoveryPopup from './PasswordRecoveryPopup';
import Button from 'react-bootstrap/Button';
import User from '../../controller/User';

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
        const {email, password} = event.target.elements;
        try {
            User.signIn(email.value, password.value)
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
        document.getElementById('passwordRecoveryPopup').style.visibility = 'visible';
        document.getElementById('passwordRecoveryPopup').style.opacity = 100 + '%'; // show password recovery popup
        document.getElementById('loginPopup').style.opacity = 0 + '%'; // hide login popup
        document.getElementById('loginPopup').style.visibility = 'hidden';

        setIndicator('');
    }

    function signUp() {
        document.getElementById('signUpPopup').style.visibility = 'visible';
        document.getElementById('signUpPopup').style.opacity = 100 + '%'; // show sign up popup
        document.getElementById('loginPopup').style.opacity = 0 + '%'; // hide login popup
        document.getElementById('loginPopup').style.visibility = 'hidden';

        setIndicator('');
    }

    function closePopup(type) {
        document.getElementById(type).style.opacity = 0 + '%';
        document.getElementById(type).style.visibility = 'hidden';
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

    return (
        <>
            <SignUpPopup/>
            <PasswordRecoveryPopup/>
            <form onSubmit={handleLogin} id='login_form'></form>
            <table id='loginPopup' class='popup' style={{opacity: 0 + '%', visibility: 'hidden'}}>
                <tr class='center'>
                    <p class='closeButton' onClick={() => closePopup('loginPopup')}>
                        x
                    </p>
                </tr>
                <tr class='center'>
                    <p style={{fontSize: 25 + 'px', textAlign: 'center'}}>
                        <b>Login</b>
                    </p>
                </tr>
                <tr class='center' style={{marginTop: 35 + 'px'}}>
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
                    <label class='invisibleMiniButton' onClick={signUp}>
                        New to Golden Cast? Sign up here
                    </label>
                </tr>
                <tr class='center'>
                    <label class='invisibleMiniButton' onClick={resetPassword}>
                        Forgot your password? Reset it here
                    </label>
                </tr>
                <tr class='center'>
                    <p class='warning'>{indicator}</p>
                </tr>
                <tr class='center' style={{marginTop: [indicatorPadding] + 'px'}}>
                    <Button
                        variant='primary'
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: [indicatorPadding] + 'px',
                        }}
                        form='login_form'
                        type='submit'
                        disabled={loginEmail.length < 1 || loginPassword.length < 1}>
                        Sign In
                    </Button>
                </tr>
            </table>
        </>
    )
};

export default Login;