import { AuthContext } from '../auth/Auth';
import React, {useContext, useState, useEffect} from 'react';
import Login from './LoginPopup'
import '../App.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import User from '../controller/User';
import { useHistory } from 'react-router-dom';



// The Account component handles login, account, and password recovery popup windows and logistics
const Account = () => {
    const history = useHistory();
    const {currentUser} = useContext(AuthContext);
    const [accountEmail, setAccountEmail] = useState('');
    const [firstName, setFirstName] = useState('Your')
    const [lastName, setLastName] = useState('Account')

    useEffect(() => {
        if (User.isSignedIn()){
            User.get().then((user) => {
            console.log('account ' + user.val());
            setFirstName(user.val().firstName);
            setLastName(user.val().lastName)});
        }
    });
    
    const viewAccount = () => {
        // user is logged in
        if (currentUser) {
            // show account popup
            document.getElementById('accountPopup').style.visibility = 'visible';
            document.getElementById('accountPopup').style.opacity = 100 + '%';
            setAccountEmail(currentUser.email);
            console.log(currentUser);
        } else {
            document.getElementById('loginPopup').style.opacity = 100 + '%';
            document.getElementById('loginPopup').style.visibility = 'visible'; // show login popup
        }
    }; 

    const closingPopup = (type) => {
        document.getElementById(type).style.opacity = 0 + '%';
        document.getElementById(type).style.visibility = 'hidden';
        
    }

    function handleLogout() {
        User.signOut();
        setFirstName('Your');
        setLastName('Account');
        history.push('/');
        closingPopup('accountPopup');
    }

    function deleteAccount() {
        if (!User.isSignedIn()) {
            alert("Please log in again to delete account.");
        }
        else {
            User.delete();
            handleLogout();
        }
    }
    
    return(
        
        <>
        <Button variant="primary" onClick={viewAccount} style={{marginRight: 35 + 'px'}}>
            {firstName + ' ' + lastName} 
        </Button>
        <Login/>
        <table id='accountPopup' class='popup' style={{opacity: 0 + '%', visibility: 'hidden'}}>
                <tr>
                    <p class='closeButton' onClick={()=>closingPopup('accountPopup')}>
                        x
                    </p>
                </tr>
                <tr>
                    <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                        <b>Welcome, {firstName + ' ' + lastName}!</b>
                    </p>
                </tr>
                <tr>
                    <p class='popupText'>Account Email: {accountEmail}</p>
                </tr>
                <tr class='center'>
                    <td style={{display: 'inline-block', marginLeft: 10 + 'px', marginRight: 30 + 'px'}}>
                        <Button
                        variant='primary'
                        style={{
                            textAlign: 'center',
                            marginTop: 20 + 'px',
                        }}
                        onClick={handleLogout}>
                        Sign Out
                        </Button>
                    </td>
                    <td style={{display: 'inline-block', marginLeft: 30 + 'px', marginRight: 10 + 'px'}}>
                        <Button
                        variant='danger'
                        style={{
                            textAlign: 'center',
                            marginTop: 20 + 'px',
                        }} onClick={deleteAccount}>
                            Delete Account
                        </Button>
                    </td>
                    
                </tr>
        </table>
        </>
    )
};

export default Account;