import '../../App.js';
import React from 'react';
import ExploreActor from './ExploreActor';
import {Container, Row, Col} from 'react-bootstrap';

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
                        <ExploreActor numActor={25}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Popular Male Actors</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ExploreActor tags={{gender: 'male'}} numActor={25}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Popular Female Actors</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ExploreActor tags={{gender: 'female'}} numActor={25}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Popular Young Actors</h1>
                    </Col>
                    <Col>
                        <ExploreActor tags={{age: '0-25'}} numActor={25}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Discover;
