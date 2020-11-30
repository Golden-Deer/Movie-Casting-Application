import db from '../../base';
import '../../App.js';
import React, { Component } from 'react';
import ExploreActor from './ExploreActor';
import { useHistory, useState } from 'react-router-dom';

const Discover = () => {
  const history = useHistory();
  const [count, setCount] = useState(6);
  const tags = {
    gender: 'male',
  };

  window.onscroll = function (ev) {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight
    ) {
      setCount(count + 6);
    }
  };

  return (
    <div>
      <div className='s-navbar'>
        <h1 onClick={() => history.push('/')}>
          My Project <a>Showing result for Role1</a>{' '}
          {/*TODO: change is to new*/}
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
      </div>
      <ExploreActor tags={tags} numActor={count} />
    </div>
  );
};

export default Discover;
