import '../../App.js';
import React from 'react';
import ExploreActor from './ExploreActor';
import { Container, Row, Col } from 'react-bootstrap';

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
    </div>
  );
};

export default Discover;
