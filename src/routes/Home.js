import React from 'react';
import {useHistory} from 'react-router-dom';
import Account from './Account';
import Body from './Body';
import '../App.css';

const Home = () => {
    const history = useHistory();

/*  not working yet
    function uploadUser(user) {
        var user = db.auth().currentUser;
        db.database().ref('USER').set({
            email: 'db.auth().currentUser.email,',
            firstName: firstName,
            lastName: lastName,
            projects: []
        });
    } */

    return (
            <div id='main'>
                <div className='jumbotron'>
                    <label class='main-title'><b>GOLDEN CAST</b></label>
                </div>
                <Body/>
            </div>
    );
};

export default Home;
