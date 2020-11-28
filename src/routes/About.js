import db from "../base";
import "../App.js";
import React from 'react';
import { useHistory } from "react-router-dom";
import Logo from '../images/logo.png';

const About = () => {
        const history = useHistory();
        return (
            <>
                <h2 style={{ marginLeft: 30 + 'px', marginTop: 30 + 'px'}}><b>About Us</b></h2>
                <p style={{ marginLeft: 30 + 'px', maxWidth: 1000 + 'px', marginTop: 20 + 'px', display: 'inline-block' }}>The Golden Deer is a non-profit organization represented by a small group of eleven juvenile delinquients, each more barbarous than the last, who coincidentally crossed paths during the Fall 2020 academic term while taking courses to obtain a degree in Critical Gender and Sexuality Studies. They banded together early in the quarter and unanimously decided that forming an underground brothel network under the thinly-veiled disguise of a professional casting and hiring service would best serve their nefarious interests. Their tireless labor over the next ten weeks bore fruit in the form of a website bearing the name Golden Cast, a subtle nod to the reflective, dappled sheen of saturated urine droplets cast under direct sunlight, which not only provides an incredible visual spectacle but also serves as a vital source of hydration as well for those living in the scorching conditions of California's desert terrain.</p>
                <img style={{display: 'inline-block', marginLeft: 50 + 'px', marginTop: -100 + 'px', width: 350 + 'px', height: 350 + 'px'}} src={Logo}/>
                <p style={{ marginLeft: 30 + 'px', marginTop: 10 + 'px'}}>The Golden Deer team name is in no way shape or form associated with the Fire Emblem video game franchise</p>
            </>
        )
}

export default About;