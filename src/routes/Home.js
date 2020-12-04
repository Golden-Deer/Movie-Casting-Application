import React from 'react';
import {useHistory} from 'react-router-dom';
import Body from './Body';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
    const history = useHistory();

    return (
            <div class='body' id='main'>
                <div className='jumbotron'>
                    <label class='main-title'><b>GOLDEN CAST</b></label>
                </div>
                <Body/>
            </div>
    );
};

export default Home;
