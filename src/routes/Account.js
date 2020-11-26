import { AuthContext } from '../auth/Auth';
import React, { useContext, useState} from 'react';
import Login from './LoginPopup'
import db from '../base';
import '../App.css';
import Button from 'react-bootstrap/Button'

// The Account component handles login, account, and password recovery popup windows and logistics
const Account = () => {
    const {currentUser} = useContext(AuthContext);
    const [accountEmail, setAccountEmail] = useState('');

    const viewAccount = () => {
        // user is logged in
        if (currentUser) {
            // show account popup
            document.getElementById('accountPopup').style.opacity = 100 + '%';
            document.getElementById('accountPopup').style.visibility = 'visible';
            // set account email state (currentUser variable doesn't load immediately)
            setAccountEmail(currentUser.email);
        } else {
            document.getElementById('loginPopup').style.opacity = 100 + '%';
            document.getElementById('loginPopup').style.visibility = 'visible'; // show login popup
            // setPadding(60);
            // setIndicator('');
        }
    }; 

    const closingPopup = (type) => {
        document.getElementById(type).style.opacity = 0 + '%';
        document.getElementById(type).style.visibility = 'hidden';
    }

    function handleLogout() {
        db.auth().signOut();
        closingPopup('accountPopup');
    }

    function deleteAccount() {
        if (db.auth().currentUser === null) {
            alert("Please log in again to delete account.");
        }
        else {
            var user = db.auth().currentUser;
            user.delete().then(() => {
                db.database().ref('USER/' + user.uid).remove();
            }).catch((error) => {
                alert(error);
            });
            closingPopup('accountPopup');
        }
    }
    
    return(
        <>
        <Button variant="primary" onClick={viewAccount} > Your Account </Button>
        {/* <button class='btn btn-primary' id={'your-account'} onClick={viewAccount}>
            Your Account
        </button> */}
        <Login/>
        <table id='accountPopup' class='popup' style={{opacity: 0 + '%', visibility: 'hidden'}}>
                <tr>
                    <p class='closeButton' onClick={()=>closingPopup('accountPopup')}>
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
                <tr class='center'>
                    <td style={{display: 'inline-block', marginLeft: 10 + 'px', marginRight: 30 + 'px'}}>
                        <button
                        class='btn btn-primary'
                        style={{
                            textAlign: 'center',
                            marginTop: 20 + 'px',
                        }}
                        onClick={handleLogout}>
                        Sign Out
                        </button>
                    </td>
                    <td style={{display: 'inline-block', marginLeft: 30 + 'px', marginRight: 10 + 'px'}}>
                        <button class='btn btn-danger'
                        style={{
                            textAlign: 'center',
                            marginTop: 20 + 'px',
                        }} onClick={deleteAccount}>
                            Delete Account
                        </button>
                    </td>
                    
                </tr>
        </table>
        </>
    )
};

export default Account;