import React from 'react';
import logo from '../../images/logo.png';
import Account from '../Account';
import { Navbar, Nav } from 'react-bootstrap';

export const Navbar1 = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='/dashboard'>
        <img
          alt='Golden Cast'
          className='d-inline-block align-top'
          width='45'
          height='45'
          src={logo}
        />
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='/dashboard'>Projects</Nav.Link>
        <Nav.Link href='/about'>About Us</Nav.Link>
        <Nav.Link href='/discover'>Discover</Nav.Link>
      </Nav>
      <Account />
    </Navbar>
  );
};

export default Navbar1;
