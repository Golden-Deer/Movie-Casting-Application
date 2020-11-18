import React from 'react';
import { Redirect } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>
        <Redirect to='/'>Golden Cast</Redirect>
      </h1>
      <ul>
        <li>
          <Redirect to='/discover'>Explore</Redirect>
        </li>
        <li>
          <Redirect to='/search'>Search</Redirect>
        </li>
        <li>
          <Redirect to='/'>Projects</Redirect>
        </li>
      </ul>
    </nav>
  );
};
