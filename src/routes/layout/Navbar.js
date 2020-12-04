import React from 'react';
import logo from '../../images/logo.png';
import Account from '../Account';
import { Navbar, Nav } from 'react-bootstrap';

export const Navbar1 = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='/'>
        <img
          alt='Golden Cast'
          className='d-inline-block align-top'
          width='45'
          height='45'
          src={logo}
        />
      </Navbar.Brand>
<<<<<<< HEAD
      <Nav className='mr-auto'>
        <Nav.Link href='/about'>About Us</Nav.Link>
        <Nav.Link href='/discover'>Discover</Nav.Link>
        <Nav.Link href='/'>Projects</Nav.Link>
      </Nav>
      <Account />
    </Navbar>
=======
    <Nav className="mr-auto">
      <Nav.Link href="/dashboard">Projects</Nav.Link>
      <Nav.Link href="/about">About Us</Nav.Link>
      <Nav.Link href="/discover">Discover</Nav.Link>
    </Nav>
    <Account/>
  </Navbar>
>>>>>>> 958ef9dc201e7536a931a6f438c6aba482a569be
  );
};

export default Navbar1;
