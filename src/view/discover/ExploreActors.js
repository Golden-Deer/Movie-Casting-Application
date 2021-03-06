import '../../App.js';
import React, {Component} from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {withRouter} from 'react-router-dom';
import {Card, CardDeck} from 'react-bootstrap';
import Profile from "../../controller/Profile";
import Picture from "../../controller/Picture";

class ExploreActors extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actors: [],
            records: [],
        };

        var newactors = [];
        Profile.readAll().then(dataSnapshot => {
            dataSnapshot.forEach(childSnapshot => {
                console.log(childSnapshot.val());
                let actor = childSnapshot.val();
                Picture.read(actor.profilepic).getDownloadURL().then((url) => {
                    actor.profilepic = url;
                    newactors.push(actor);
                    for (const tag in props.tags) {
                        if (tag === 'age' && props.tags[tag] !== 'unspecified') {
                            newactors = this.filterAge(newactors, props.tags[tag]);
                        }
                        if (tag === 'gender' && props.tags[tag] !== 'unspecified') {
                            newactors = this.filterGender(newactors, props.tags[tag]);
                        }
                        if (tag === 'height' && props.tags[tag] !== 'unspecified') {
                            newactors = this.filterHeight(newactors, props.tags[tag]);
                        }
                        if (tag === 'weight' && props.tags[tag] !== 'unspecified') {
                            newactors = this.filterWeight(newactors, props.tags[tag]);
                        }
                    }
                    this.setState({actors: newactors});
                    this.setState({
                        records: this.state.actors.slice(0, this.props.numActor),
                    });
                })
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
            let lowerBound = age.split('-')[0];
            let upperBound = age.split('-')[1];
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
            let lowerBound = height.split('-')[0];
            let upperBound = height.split('-')[1];
            for (var i = actors.length - 1; i >= 0; i--) {
                if (
                    actors[i].tag.height > upperBound ||
                    actors[i].tag.height < lowerBound
                ) {
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
            let lowerBound = weight.split('-')[0];
            let upperBound = weight.split('-')[1];
            for (var i = actors.length - 1; i >= 0; i--) {
                if (
                    actors[i].tag.weight > upperBound ||
                    actors[i].tag.weight < lowerBound
                ) {
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
                    this.setState({
                        records: this.state.actors.slice(0, this.props.numActor),
                    });
                } else {
                    this.setState({
                        records: this.state.actors.slice(0, this.state.actors.length),
                    });
                }
            }
        }
    }

    // componentWillUnmount() {
    // }

    render() {
        const menu = (
            <div>
                <ScrollMenu
                    arrowLeft={<div style={{fontSize: '70px'}}>{' < '}</div>}
                    arrowRight={<div style={{fontSize: '70px'}}>{' > '}</div>}
                    data={this.state.records.map((records) => (
                        <Card
                            className='candidateCard'
                            onClick={() =>
                                this.props.history.push('/actor', [
                                    'null',
                                    records,
                                    'null',
                                    'null',
                                    'null',
                                ])
                            }>
                            <Card.Img variant='top' src={records.profilepic}/>
                            <Card.Body>
                                <Card.Title>
                                    <b>{records.name}</b>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                    wheel={false}
                    dragging={false}
                    scrollBy={2}
                    alignCenter={false}
                    alignOnResize={false}
                />
            </div>
        );

        return <div>{menu}</div>;
    }
}

export default withRouter(ExploreActors);
