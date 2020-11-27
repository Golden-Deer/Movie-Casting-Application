import {React, useState} from 'react';
import db from '../base';
import SignUpPopup from './SignUpPopup';
import Button from 'react-bootstrap/Button'

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
        const { email } = event.target.elements;
        try {
            db
                .auth()
                .fetchSignInMethodsForEmail(email.value)
                .then((signInMethods) => {
                    // an empty array means the account doesn't exist
                    if (signInMethods.length == 0) {
                        setIndicator("No account in our database is associated with this email")
                        setPadding(30)
                    }
                    else {
                        db.auth().sendPasswordResetEmail(email.value).then(function () {
                            setIndicator("Email sent")
                        }).catch(function (error) {
                            setIndicator(error);
                        });
                        setPadding(30)
                    }
                })
        } catch (error) {
            alert(error);
        }
    }  

    function signUp() {
        document.getElementById('passwordRecoveryPopup').style.opacity = 0 + '%';
        document.getElementById('passwordRecoveryPopup').style.visibility = 'hidden'; // hide password recovery popup
        document.getElementById('signUpPopup').style.visibility = 'visible';
        document.getElementById('signUpPopup').style.opacity = 0 + '%'; // show sign up popup
        setIndicator('');
    }

    function login() {
        document.getElementById('passwordRecoveryPopup').style.opacity = 0 + '%';
        document.getElementById('passwordRecoveryPopup').style.visibility = 'hidden'; // hide password recovery popup
        document.getElementById('loginPopup').style.visibility = 'visible';
        document.getElementById('loginPopup').style.opacity = 100 + '%'; // show sign up popup
        setIndicator('');
    }

    function closePopup(type) {
        document.getElementById(type).style.opacity = 0 + '%';
        document.getElementById(type).style.visibility = 'hidden';
        setIndicator('');
    }

    return(
            <>
            <SignUpPopup/>
            <form
                onSubmit={handlePasswordRecovery}
                id='password_recovery_form'>
            </form>
            <table
                id='passwordRecoveryPopup'
                class='popup'
                style={{opacity: 100 + '%', visibility: 'hidden'}}>
                <tr class='center'>
                    <p
                        class='closeButton'
                        onClick={() => closePopup('passwordRecoveryPopup')}>
                        x
                    </p>
                </tr>
                <tr class='center'>
                    <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                        <b>Password Recovery</b>
                    </p>
                </tr>
                <tr class='center' style={{ marginTop: 35 + 'px' }}>
                    <input
                        class='center'
                        name='email'
                        type='email'
                        value={recoveryEmail}
                        placeholder='Email'
                        form='password_recovery_form'
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
                        Know your password? Login up here
                    </button>
                </tr>
                <tr class='center'>
                    <p class='warning'>{indicator}</p>
                </tr>
                <tr class='center' style={{ marginTop: [indicatorPadding] + 'px' }}>
                    <Button
                        variant='primary'
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: [indicatorPadding] + 'px',
                        }}
                        form='password_recovery_form'
                        disabled={recoveryEmail.length < 1}>
                        Send Email
                    </Button>
                </tr>
            </table>
            </>
    )
};

export default PasswordRecoveryPopup;