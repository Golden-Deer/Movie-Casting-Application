import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import Account from '../Account';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Form} from 'react-bootstrap'

export const Navbar1 = () => {
  return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">
      <img className='nav-img' alt='Golden Cast' src={logo} />
      Golden Cast
      </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/discover">Discover</Nav.Link>
      <Nav.Link href="/project">Projects</Nav.Link>
      <Nav.Link href="/about">About Us</Nav.Link>
    </Nav>
    <Account/>
  </Navbar>
  );
};

export default Navbar1;
