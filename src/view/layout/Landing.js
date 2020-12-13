import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import Account from '../account/Account';
import PropTypes from 'prop-types';
import logo from '../../images/logo.png';
import Body from '../Body';

const Landing = ({isAuthenticated}) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard'/>;
    }
    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <img src={logo} alt='Golden Cast Logo' className='landing-logo'></img>
                    <h1 className='x-large'>Golden Cast</h1>
                    <p className='lead'>
                        Golden Cast is a premium service to help your casting crew quickly
                        find the right actors and actresses for your casting roles
                    </p>
                    <Account/>
                </div>
            </div>
        </section>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default Landing;
