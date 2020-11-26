import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import Account from '../Account';

export const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <img className='nav-img' alt='Golden Cast' src={logo} />
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/discover'>Discover</Link>
        </li>
        <li>
          <Link to='/search'>Search</Link>
        </li>
        <li>
          <Link to='/project'>Projects</Link>
        </li>
        <li>
          <Link to='/about'>About Us</Link>
        </li>
        <li>
          <Account/>

          {/* <Link to='/'>Account</Link> */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
