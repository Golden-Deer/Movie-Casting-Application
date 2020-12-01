import db from '../../base';
import '../../App.js';
import React, { Component } from 'react';
import ExploreActor from './ExploreActor';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Discover = () => {
  const history = useHistory();
  // const [count, setCount] = useState(6);
  const tags = {
    gender: 'male',
  };

  // window.onscroll = function (ev) {
  //   if (
  //     Math.ceil(window.innerHeight + window.scrollY) >=
  //     document.documentElement.scrollHeight
  //   ) {
  //     // setCount(count + 6);
  //   }
  // };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1>Popular Male Actors</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ExploreActor tags={'male'} numActor={9} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Popular Female Actors</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ExploreActor tags={'female'} numActor={9} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Popular Young Actors</h1>
          </Col>
          <Col>
            <ExploreActor tags={'age'} numActor={9} />
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
