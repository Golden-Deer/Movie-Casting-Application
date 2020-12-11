import {React, useState} from 'react';
import Button from 'react-bootstrap/Button'

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

    const handleSignUp = (event) => {
        event.preventDefault();
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                signUpEmail,
                signUpPassword,
                firstName,
                lastName,
                setIndicator,
                setPadding,
            })
          };
          
          fetch('http://localhost:8000/signUp', config)
            .catch(error => console.log(error));
        // closePopup('signUpPopup')
        // handleSignUp(event, signUpEmail, signUpPassword, firstName, lastName, closePopup, setIndicator, setPadding);
    }

    function login() {
        document.getElementById('loginPopup').style.visibility = 'visible'; // hide login popup
        document.getElementById('loginPopup').style.opacity = 100 + '%'; // show sign up popup
        document.getElementById('signUpPopup').style.opacity = 0 + '%'; // hide login popup
        document.getElementById('signUpPopup').style.visibility = 'hidden'; // hide login popup
        setIndicator('');
    }

    function closePopup(type) {
        document.getElementById(type).style.opacity = 0 + '%';
        setIndicator('');
    }

    return(
        <>
        <form onSubmit={handleSignUp} id='sign_up_form'></form>
        <table id='signUpPopup' class='extendedPopup' style={{opacity: 0 + '%', visibility: 'hidden'}}>
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
                        placeholder='Password (7+ characters)'
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
                    <Button
                        variant='primary'
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: [indicatorPadding] + 'px',
                        }}
                        form='sign_up_form'
                        type='submit'
                        disabled={
                            signUpEmail.length < 1 ||
                            signUpPassword.length < 7 ||
                            firstName.length < 1 ||
                            lastName.length < 1
                        }>
                        Sign Up
                    </Button>
                </tr>
            </table>
        </>
    );
}

export default SignUpPopup;


