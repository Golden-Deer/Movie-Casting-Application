import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { Container, Row, Col } from 'react-bootstrap';
//import ActingRed from '../images/acting-red-back.jpg';
import FilmingWater from '../images/filming-water.jpg';

const About = () => {
  return (
    <div class='App Fade about-page'>
      <section className='landing1'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <img
              src={logo}
              alt='Golden Cast Logo'
              className='landing-logo'></img>
            <h1 className='x-large'>Golden Cast</h1>
            <p className='lead'>
              Golden Cast is a premium service to help your casting crew quickly
              find the right actors and actresses for your casting roles.
            </p>
            <div className='about-buttons'>
              <Link to='/discover' className='about-button'>
                Discover
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className='landing2'>
        <Container className='container-about'>
          <Row>
            <Col sm={true}>
              <img src={FilmingWater} alt='Actors' className='page-img'></img>
            </Col>
            <Col sm={true}>
              <h1>Find Great Talent</h1>
              <p>
                With our intuitive interface and wide range of actors to choose
                from, Golden Cast guarantess that you will find the perfect
                actor for your role. Whether you have a specific actor you are
                looking for or simply want to browse our collection, use our
                Discover page to find popular, up-and-coming actors or use our
                Search page to find results for actors with the specific traits
                you are looking for. Golden Cast is even free to use so you
                don't have to worry about using your film budget towards finding
                great talent and instead making cinematic masterpieces. What are
                you waiting for? Go ahead and make an account and see what
                Golden Cast can do for your film crew.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='landing3'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Casting Made Easy</h1>
            <p className='lead'>
              Golden Cast makes it easy to find the great actors and actresses
              needed to make your cinematic masterpiece. We make it easy to
              manage the casting and audition process by allowing you to create
              projects with role openings. Then, you can browse our Discover
              page or Search for a specific actor or actress to add to a role in
              your project. You can make any changes needed to the projects or
              roles at any time and once all roles are filled, you can easily
              get into contact with each one to arrange auditions. Golden Cast
              is simply casting made easy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
