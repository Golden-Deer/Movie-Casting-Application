import React, {Component} from 'react';
import {Card, CardDeck} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import Profile from "../../controller/Profile";
import Picture from "../../controller/Picture";

class DisplayActors extends Component {
    constructor(props) {
        console.log(props.location.state);
        super(props);

        this.state = {
            actors: [],
            records: []
        };

        var newactors = [];
        Profile.readAll().then(dataSnapshot => {
            dataSnapshot.forEach(childSnapshot => {
                let actor = childSnapshot.val();
                Picture.read(actor.profilepic).getDownloadURL().then((url) => {
                    actor.profilepic = url;
                    newactors.push(actor);
                    for (const tag in this.props.tags) {
                        if (tag === "age" && this.props.tags[tag] !== 'unspecified') {
                            newactors = this.filterAge(newactors, this.props.tags[tag]);
                        }
                        if (tag === "gender" && this.props.tags[tag] !== 'unspecified') {
                            newactors = this.filterGender(newactors, this.props.tags[tag]);
                        }
                        if (tag === "height" && this.props.tags[tag] !== 'unspecified') {
                            newactors = this.filterHeight(newactors, this.props.tags[tag]);
                        }
                        if (tag === "weight" && this.props.tags[tag] !== 'unspecified') {
                            newactors = this.filterWeight(newactors, this.props.tags[tag]);
                        }
                    }
                    this.setState({actors: newactors});
                    this.setState({records: this.state.actors.slice(0, this.props.numActor)});
                }).catch(function (error) {
                    alert(error);
                });
            })
        })
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
        if (age == '>80') {
            for (var i = actors.length - 1; i >= 0; i--) {
                if (actors[i].tag.age <= 80) {
                    actors.splice(i, 1);
                }
            }
        }
        // normal range
        else if (age.includes('-')) {
            let lowerBound = age.split('-')[0]
            let upperBound = age.split('-')[1]
            for (var i = actors.length - 1; i >= 0; i--) {
                if (actors[i].tag.age > upperBound || actors[i].tag.age < lowerBound) {
                    actors.splice(i, 1);
                }
            }
        }
        // custom filter: exact age
        else {
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
        if (height == '>199') {
            for (var i = actors.length - 1; i >= 0; i--) {
                if (actors[i].tag.height <= 199) {
                    actors.splice(i, 1);
                }
            }
        }
        // normal range
        else if (height.includes('-')) {
            let lowerBound = height.split('-')[0]
            let upperBound = height.split('-')[1]
            for (var i = actors.length - 1; i >= 0; i--) {
                if (actors[i].tag.height > upperBound || actors[i].tag.height < lowerBound) {
                    actors.splice(i, 1);
                }
            }
        }
        // custom filter: exact age
        else {
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
        if (weight == '>99') {
            for (var i = actors.length - 1; i >= 0; i--) {
                if (actors[i].tag.weight <= 99) {
                    actors.splice(i, 1);
                }
            }
        }
        // normal range
        else if (weight.includes('-')) {
            let lowerBound = weight.split('-')[0]
            let upperBound = weight.split('-')[1]
            for (var i = actors.length - 1; i >= 0; i--) {
                if (actors[i].tag.weight > upperBound || actors[i].tag.weight < lowerBound) {
                    actors.splice(i, 1);
                }
            }
        }
        // custom filter: exact age
        else {
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
                    this.setState({records: this.state.actors.slice(0, this.props.numActor)});
                } else {
                    this.setState({records: this.state.actors.slice(0, this.state.actors.length)});
                }
            }
        }
    }

    render() {
        if (this.state.records.length == 0)
            var display = <p class='banner'>No actors found that meet your criteria</p>
        else {
            var display = this.state.records.map(records =>
                <Card style={{minWidth: '400px', maxWidth: '420px', marginBottom: '20px', cursor: 'pointer'}}
                      key={records.name} onClick={() => this.props.history.push('/actor', [this.props.role, records])}>
                    <Card.Img variant="top" src={records.profilepic} alt={records.profilepic}/>
                    <Card.Body>
                        <Card.Title>{records.name}</Card.Title>
                        <Card.Subtitle>Age: {records.tag.age}&nbsp;&nbsp;&nbsp;Gender: {records.tag.gender.charAt(0).toUpperCase() + records.tag.gender.slice(1)}&nbsp;&nbsp;&nbsp;Height: {records.tag.height}&nbsp;&nbsp;&nbsp;Weight: {records.tag.weight}</Card.Subtitle>
                        <Card.Text style={{marginTop: 10 + 'px'}}>
                            {records.introduction.length < 100 ?
                                records.introduction
                                :
                                records.introduction.substring(0, 99) + '...'
                            }
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        }


        return (
            <CardDeck>{display}</CardDeck>
        );
    }
}


export default withRouter(DisplayActors);