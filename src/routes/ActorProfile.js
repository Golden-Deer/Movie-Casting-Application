import '../App.js';
import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import ActorDetail from './ActorDetail';

const ActorProfile = (props) => {
  const history = useHistory();
  return (
    <div>
      <p>
        <h1 id='my-projects'>
          <a onClick={() => history.goBack()}>&lt; <b>{props.location.state[0].name}</b></a>
        </h1>
      </p>
      <ActorDetail actor={props.location.state[0]} projectKey={props.location.state[1]} role={props.location.state[2]} />
    </div>
  );
};

export default ActorProfile;