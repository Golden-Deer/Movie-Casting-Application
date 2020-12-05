import db from '../../base';
import '../../App.js';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { withRouter } from "react-router-dom";

class ExploreActor extends Component {
  constructor(props) {
    super(props);

    this.state = {
        actors: [],
        records: []
    };
    this.profileRef = db.database().ref("PROFILE");
    this.pictureRef = db.storage().ref("Actor Pictures");
    var newactors = [];
    console.log(props.tags)
    this.profileRef.orderByChild('name').on('value', dataSnapshot => {
        dataSnapshot.forEach(childSnapshot => {
            let actor = childSnapshot.val();
            actor.key = childSnapshot.key;
            this.pictureRef.child(actor.profilepic).getDownloadURL().then((url) => {
                actor.profilepic = url;
                newactors.push(actor);
                for (const tag in props.tags) {
                    if (tag === "age" && props.tags[tag] !== 'unspecified') {
                        newactors = this.filterAge(newactors, props.tags[tag]);
                    }
                    if (tag === "gender" && props.tags[tag] !== 'unspecified') {
                        newactors = this.filterGender(newactors, props.tags[tag]);
                    }
                    if (tag === "height" && props.tags[tag] !== 'unspecified') {
                        newactors = this.filterHeight(newactors, props.tags[tag]);
                    }
                    if (tag === "weight" && props.tags[tag] !== 'unspecified') {
                        newactors = this.filterWeight(newactors, props.tags[tag]);
                    }
                }
                this.setState({ actors: newactors });
                this.setState({ records: this.state.actors.slice(0, this.props.numActor) });
            }).catch(function(error) {
                alert(error);
              });
        });
    });
}

filterGender(actors, gender) {
    for (var i = actors.length - 1; i >= 0; i--) {
        if (actors[i].tag.gender !== gender) {
            actors.splice(i, 1);
        }
    }
    return actors;
}

filterAge(actors, age) {
    // unique range: above 80
    if (age=='>80'){
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.age <= 80) {
                actors.splice(i, 1);
            }
        }
    }
    // normal range
    else if (age.includes('-')){
        let lowerBound = age.split('-')[0]
        let upperBound = age.split('-')[1]
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.age > upperBound || actors[i].tag.age < lowerBound) {
                actors.splice(i, 1);
            }
        }
    }
    // custom filter: exact age
    else{
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.age != age) {
                actors.splice(i, 1);
            }
        }
    }
    return actors;
}

filterHeight(actors, height) {
    // unqiue range: above 80
    if (height=='>199'){
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.height <= 199) {
                actors.splice(i, 1);
            }
        }
    }
    // normal range
    else if (height.includes('-')){
        let lowerBound = height.split('-')[0]
        let upperBound = height.split('-')[1]
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.height > upperBound || actors[i].tag.height < lowerBound) {
                actors.splice(i, 1);
            }
        }
    }
    // custom filter: exact age
    else{
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.height != height) {
                actors.splice(i, 1);
            }
        }
    }
    return actors;
}

filterWeight(actors, weight) {
    // unqiue range: above 80
    if (weight=='>99'){
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.weight <= 99) {
                actors.splice(i, 1);
            }
        }
    }
    // normal range
    else if (weight.includes('-')){
        let lowerBound = weight.split('-')[0]
        let upperBound = weight.split('-')[1]
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.weight > upperBound || actors[i].tag.weight < lowerBound) {
                actors.splice(i, 1);
            }
        }
    }
    // custom filter: exact age
    else{
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.weight != weight) {
                actors.splice(i, 1);
            }
        }
    }
    return actors;
}

componentDidUpdate(prevProps) {
    if (this.props.numActor !== prevProps.numActor) {
        if (prevProps.numActor < this.state.actors.length) {
            if (this.props.numActor < this.state.actors.length) {
                this.setState({ records: this.state.actors.slice(0, this.props.numActor) });
            }
            else {
                this.setState({ records: this.state.actors.slice(0, this.state.actors.length) });
            }
        }
    }
}

componentWillUnmount() {
    this.profileRef.off();
}

  render() {
    const menu = (
      <div>
        <ScrollMenu
          arrowLeft={<div style={{ fontSize: '70px' }}>{' < '}</div>}
          arrowRight={<div style={{ fontSize: '70px' }}>{' > '}</div>}
          data={this.state.records.map((records) => (
            <Button id={'explore-block'} key={records.name} onClick={() => this.props.history.push('/actor', ['null', records, 'null', 'null', 'null'])}>
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
          ))}
          wheel={false}
          dragging={false}
          hideSingleArrow={true}
        />
      </div>
    );

    return <div>{menu}</div>;
  }
}

export default withRouter(ExploreActor);
