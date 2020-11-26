import { AuthContext } from '../auth/Auth';
import React, { useContext, useState} from 'react';
import Login from './LoginPopup'
import db from '../base';
import '../App.css';

// The Account component handles login, account, and password recovery popup windows and logistics
const Account = () => {
    const {currentUser} = useContext(AuthContext);
    const [accountEmail, setAccountEmail] = useState('');

    const viewAccount = () => {
        // user is logged in
        if (currentUser) {
            // show account popup
            document.getElementById('accountPopup').style.display = '';
            // set account email state (currentUser variable doesn't load immediately)
            setAccountEmail(currentUser.email);
        } else {
            document.getElementById('loginPopup').style.display = ''; // show login popup
            // setPadding(60);
            // setIndicator('');
        }
    }; 

    function closePopup(type) {
        document.getElementById(type).style.display = 'none';
    }

    function handleLogout() {
        db.auth().signOut();
        closePopup('accountPopup');
    }
    
    return(
        <>
        <button id={'your-account'} onClick={viewAccount}>
            Your Account
        </button>
        <Login/>
        <table id='accountPopup' class='popup' style={{ display: 'none' }}>
                <tr>
                    <p class='closeButton' onClick={() => closePopup('accountPopup')}>
                        x
                    </p>
                </tr>
                <tr>
                    <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                        <b>Your Account</b>
                    </p>
                </tr>
                <tr>
                    <p class='popupText'>Account Email: {accountEmail}</p>
                </tr>
                <tr>
                    <button
                        class='btn btn-primary'
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                        onClick={handleLogout}>
                        Sign Out
          </button>
                </tr>
        </table>
        </>
    )
};

export default Account;