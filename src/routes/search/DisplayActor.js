import React, { Component } from 'react';
import db from '../../base';
import Card from 'react-bootstrap/Card';
import { withRouter } from "react-router-dom";

class DisplayActor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actors: [],
            records: []
        };

        this.profileRef = db.database().ref("PROFILE");
        this.pictureRef = db.storage().ref("Actor Pictures");

        this.profileRef.orderByChild('name').on('value', dataSnapshot => {
            let newactors = [];
            dataSnapshot.forEach(childSnapshot => {
                let actor = childSnapshot.val();
                actor.key = childSnapshot.key;
                this.pictureRef.child(actor.profilepic).getDownloadURL().then((url) => {
                    actor.profilepic = url;
                    newactors.push(actor);
                    console.log(props.tags);
                    for (const tag in props.tags) {
                        if (tag === "age" && props.tags[tag] !== 'unspecified') {
                            newactors = this.filterAge(newactors, parseInt(props.tags[tag]));
                        }
                        if (tag === "gender" && props.tags[tag] !== 'unspecified') {
                            newactors = this.filterGender(newactors, props.tags[tag]);
                        }
                        if (tag === "height" && props.tags[tag] !== 'unspecified') {
                            newactors = this.filterHeight(newactors, parseInt(props.tags[tag]));
                        }
                        if (tag === "weight" && props.tags[tag] !== 'unspecified') {
                            newactors = this.filterWeight(newactors, parseInt(props.tags[tag]));
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
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.age > age + 5 || actors[i].tag.age < age - 5) {
                actors.splice(i, 1);
            }
        }
        return actors;
    }

    filterHeight(actors, height) {
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.height > height + 5 || actors[i].tag.height < height - 5) {
                console.log("removed height ", actors[i].tag.height);
                actors.splice(i, 1);
            }
        }
        return actors;
    }

    filterWeight(actors, weight) {
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.weight > weight + 5 || actors[i].tag.weight < weight - 5) {
                actors.splice(i, 1);
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
        const display = this.state.records.map(records =>
            <Card style={{ width: '90%' }} key={records.name} onClick={() => this.props.history.push('/actor', [records, this.props.projectKey, this.props.role])}>
            <Card.Img variant="top" src= {records.profilepic} alt={records.profilepic} />
            <Card.Body>
            <Card.Title>{records.name}</Card.Title>
            <Card.Subtitle>Age: {records.tag.age}, Height: {records.tag.height} </Card.Subtitle>
            <Card.Text>
            Some brief introduction of the actor
            </Card.Text>
            </Card.Body>
            </Card>
        );

        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 28%)'}}>{display}</div>
        );
    }
}



export default withRouter(DisplayActor);