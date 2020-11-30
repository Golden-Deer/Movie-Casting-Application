import db from '../../base';
import '../../App.js';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class ExploreActor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profiles: [],
    };

    this.firebaseRef = db.database().ref('PROFILE');
    this.firebaseRef.on('value', (dataSnapshot) => {
      let profiles = [];
      dataSnapshot.forEach((childSnapshot) => {
        let profile = childSnapshot.val();
        profile['.key'] = childSnapshot.key;
        profiles.push(profile);
      });
      this.setState({ profiles });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }
  //const history = useHistory();

  // map image of actor to profile ID
  render() {
    const display = this.state.profiles.map((records) => (
      <Button id={'block'} key={records.name}>
        <div style={{ width: '80%', textAlign: 'center' }}>
          <img
            src={records.profilepic}
            style={{ width: '300px' }}
            alt='The Rock'
          />
        </div>
        <h5 style={{ width: '80%', textAlign: 'center' }}>
          Name: {records.name}
        </h5>
        <h5 style={{ width: '80%', textAlign: 'center' }}>
          Age: {records.tag.age} Gender: {records.tag.gender}
        </h5>
        <h5 style={{ width: '80%', textAlign: 'center' }}>
          Height: {records.tag.height} Weight: {records.tag.weight}
        </h5>
      </Button>
    ));
    return <div>{display}</div>;
  }
}

export default ExploreActor;
