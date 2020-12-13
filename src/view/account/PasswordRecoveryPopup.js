import {React, useState} from 'react';
import SignUpPopup from './SignUpPopup';
import Button from 'react-bootstrap/Button';
import User from '../../controller/User';

const PasswordRecoveryPopup = () => {
    // password recovery state
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [indicator, setIndicator] = useState(' ');
    const [indicatorPadding, setPadding] = useState(64);

    function changeRecoveryEmail(e) {
        setRecoveryEmail(e.target.value);
        setPadding(64);
        setIndicator('');
    }

    function handlePasswordRecovery(event) {
        event.preventDefault();
        User.passwordRecovery(recoveryEmail)
            .then(function () {
                setIndicator('Email sent');
                setPadding(30);
            }).catch((error) => {
            var errorCode = error.code;
            if (errorCode == 'auth/user-not-found') {
                setIndicator('No account in our database is associated with this email');
                setPadding(20);
            }
            console.log(error.code)
        });
    }

    function signUp() {
        document.getElementById('passwordRecoveryPopup').style.opacity = 0 + '%';
        document.getElementById('passwordRecoveryPopup').style.visibility =
            'hidden'; // hide password recovery popup
        document.getElementById('signUpPopup').style.visibility = 'visible';
        document.getElementById('signUpPopup').style.opacity = 100 + '%'; // show sign up popup
        setIndicator('');
    }

    function login() {
        document.getElementById('passwordRecoveryPopup').style.opacity = 0 + '%';
        document.getElementById('passwordRecoveryPopup').style.visibility =
            'hidden'; // hide password recovery popup
        document.getElementById('loginPopup').style.visibility = 'visible';
        document.getElementById('loginPopup').style.opacity = 100 + '%'; // show sign up popup
        setIndicator('');
    }

    function closePopup(type) {
        document.getElementById(type).style.opacity = 0 + '%';
        document.getElementById(type).style.visibility = 'hidden';
        setIndicator('');
    }

    return (
        <>
            <SignUpPopup/>
            <table
                id='passwordRecoveryPopup'
                class='popup'
                style={{opacity: 0 + '%', visibility: 'hidden'}}>
                <tr class='center'>
                    <p
                        class='closeButton'
                        onClick={() => closePopup('passwordRecoveryPopup')}>
                        x
                    </p>
                </tr>
                <tr class='center'>
                    <p style={{fontSize: 25 + 'px', textAlign: 'center'}}>
                        <b>Password Recovery</b>
                    </p>
                </tr>
                <tr class='center' style={{marginTop: 35 + 'px'}}>
                    <input
                        class='center'
                        name='email'
                        type='email'
                        value={recoveryEmail}
                        placeholder='Email'
                        onChange={changeRecoveryEmail}
                    />
                </tr>
                <tr class='center'>
                    <label class='invisibleMiniButton' onClick={signUp}>
                        New to Golden Cast? Sign up here
                    </label>
                </tr>
                <tr class='center'>
                    <button class='invisibleMiniButton' onClick={login}>
                        Know your password? Login here
                    </button>
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
                        onClick={handlePasswordRecovery}
                        disabled={recoveryEmail.length < 1}>
                        Send Email
                    </Button>
                </tr>
            </table>
        </>
    );
};

export default PasswordRecoveryPopup;
