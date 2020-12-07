import '../../App.js';
import React, { Component } from 'react';
import ExploreActor from './ExploreActor';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Discover = () => {
  return (
    <div className='about-page'>
      <Container>
        <Row>
          <Col>
            <h1>Trending Actors</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ExploreActor numActor={25} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Popular Male Actors</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ExploreActor tags={{ gender: 'male' }} numActor={25} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Popular Female Actors</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ExploreActor tags={{ gender: 'female' }} numActor={25} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Popular Actors Between Ages 0 to 30</h1>
          </Col>
          <Col>
            <ExploreActor tags={{ age: '0-25' }} numActor={25} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Popular Actors Between Ages 30 to 100</h1>
          </Col>
          <Col>
            <ExploreActor tags={{ age: '50-100' }} numActor={25} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Actors With Height Between 170 and 250 cm</h1>
          </Col>
          <Col>
            <ExploreActor tags={{ height: '170-250' }} numActor={25} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Actors With Height Between 50 and 170 cm</h1>
          </Col>
          <Col>
            <ExploreActor tags={{ height: '50-170' }} numActor={25} />
          </Col>
        </Row>
      </Container>
      {/* <div className='s-navbar'>
        <h1 onClick={() => history.push('/')}>
          My Project <a>Showing result for Role1</a>{' '}
          TODO: change is to new
        </h1>
      </div>
      <div className='s-main'>
        <div className='s-sidebar'>
          <h1>Project list</h1>
          <h2> - Project1</h2>
          <div id={'mini-project'}>
            <h2>project</h2>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Discover;
