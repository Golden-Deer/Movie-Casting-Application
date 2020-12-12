/*
 * @Author: your name
 * @Date: 2020-12-04 07:43:34
 * @LastEditTime: 2020-12-10 02:41:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Movie-Casting-Application\src\routes\Home.js
 */
import React from 'react';
import {useHistory} from 'react-router-dom';
import Body from './Body';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
    const history = useHistory();

    return (
            <div id='main'>
                <div className='jumbotron'>
                    <div className='dark-overlay'>
                        <h1 className='main-title'>Golden Cast</h1>
                    </div>
                </div>
                <Body/>
            </div>
    );
};

export default Home;
