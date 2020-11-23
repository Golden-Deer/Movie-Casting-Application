import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

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
          <Link to='/'>Projects</Link>
        </li>
        <li>
          <Link to='/'>About Us</Link>
        </li>
        <li>
          <Link to='/'>Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
