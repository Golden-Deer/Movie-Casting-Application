import '../App.js';
import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';

const ActorProfile = (props) => {
  const history = useHistory();
  return (
    <>
      <p>
        <h1 id='my-projects'>
          <a onClick={() => history.goBack()}>&lt; <b>{props.location.state.name}</b></a>
        </h1>
      </p>
    </>
  );
};

export default ActorProfile;