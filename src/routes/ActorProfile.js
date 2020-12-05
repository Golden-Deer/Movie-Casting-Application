import '../App.js';
import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import ActorDetail from './ActorDetail';

const ActorProfile = (props) => {
  console.log(props.location.state);
  const history = useHistory();
  return (
    <div class="body">
      <p>
        <h1 id='my-projects'>
          <a onClick={() => history.goBack()}>&lt; <b>{props.location.state[0].name}</b></a>
        </h1>
      </p>
      <ActorDetail roleName={props.location.state[0]} actor={props.location.state[1]} projectKey={props.location.state[2]} role={props.location.state[3]} project={props.location.state[4]} />
    </div>
  );
};

export default ActorProfile;