import db from '../base';
import {React, useState} from 'react';

const SignUpPopup = () => {
    // sign up states
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [indicator, setIndicator] = useState(' ');
    const [indicatorPadding, setPadding] = useState(54);

    const changeSignUpEmail = (e) => {
        setSignUpEmail(e.target.value);
        setPadding(54);
        setIndicator('');
    };

    const changeSignUpPassword = (e) => {
        setSignUpPassword(e.target.value);
        setPadding(54);
        setIndicator('');
    };

    const changeFirstName = (e) => {
        setFirstName(e.target.value);
        setPadding(54);
        setIndicator('');
    };

    const changeLastName = (e) => {
        setLastName(e.target.value);
        setPadding(54);
        setIndicator('');
    };

    function handleSignUp(event) {
        event.preventDefault();
        db
            .auth()
            //check if the account exists
            .fetchSignInMethodsForEmail(signUpEmail)
            .then((signInMethods) => {
                // an empty array means the account doesn't exist
                if (signInMethods.length == 0) {
                    db.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword)
                        .then((user) => {
                            window.location.reload(); // reload the page
                            var user = db.auth().currentUser;
                            db.database().ref('USER/' + user.uid).set({
                                email: user.email,
                                firstName: firstName,
                                lastName: lastName,
                                projects: []
                            }).then(() => {
                                console.log("new user pushed");
                            }).catch((error) => {
                                alert(error);
                            });
                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            alert(errorCode + errorMessage);
                        });
                }
                else {
                    setIndicator("This email is already associated with an account");
                    setPadding(20);
                }
            })
    }

    function login() {
        document.getElementById('signUpPopup').style = 'display: none'; // hide login popup
        // document.getElementById('passwordRecoveryPopup').style = 'display: none'; // hide password recovery popup
        document.getElementById('loginPopup').style = ''; // show sign up popup
        setIndicator('');
    }

    function closePopup(type) {
        document.getElementById(type).style.opacity = 0 + '%';
        setIndicator('');
    }

    return(
        <>
        <form onSubmit={handleSignUp} id='sign_up_form'></form>
        <table id='signUpPopup' class='extendedPopup' style={{ display: 'none' }}>
                <tr class='center'>
                    <p class='closeButton' onClick={() => closePopup('signUpPopup')}>
                        x
                    </p>
                </tr>
                <tr class='center'>
                    <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                        <b>Sign Up</b>
                    </p>
                </tr>
                <tr class='center' style={{ marginTop: 35 + 'px' }}>
                    <input
                        class='center'
                        name='email'
                        type='email'
                        value={signUpEmail}
                        placeholder='Email'
                        form='sign_up_form'
                        onChange={changeSignUpEmail}
                    />
                </tr>
                <tr class='center'>
                    <input
                        class='center'
                        name='password'
                        type='password'
                        value={signUpPassword}
                        placeholder='Password (6+ characters)'
                        form='sign_up_form'
                        onChange={changeSignUpPassword}
                    />
                </tr>
                <tr class='center'>
                    <input
                        class='center'
                        name='first_name'
                        type='first_name'
                        value={firstName}
                        placeholder='First Name'
                        form='sign_up_form'
                        onChange={changeFirstName}
                    />
                </tr>
                <tr class='center'>
                    <input
                        class='center'
                        name='last_name'
                        type='last_name'
                        value={lastName}
                        placeholder='Last Name'
                        form='sign_up_form'
                        onChange={changeLastName}
                    />
                </tr>
                <tr class='center'>
                    <button class='invisibleMiniButton' onClick={login}>
                        Have an account? Log in here
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
                        form='sign_up_form'
                        disabled={
                            signUpEmail.length < 1 ||
                            signUpPassword.length < 7 ||
                            firstName.length < 1 ||
                            lastName.length < 1
                        }>
                        Sign Up
                    </button>
                </tr>
            </table>
        </>
    );
}

export default SignUpPopup;