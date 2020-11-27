import React, { Component } from 'react';
import db from '../../base'
import Button from 'react-bootstrap/Button'

class DisplayActor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actors: [],
            records: []
        };

        this.profileRef = db.database().ref("PROFILE");

        this.profileRef.orderByChild('name').on('value', dataSnapshot => {
            let newactors = [];
            dataSnapshot.forEach(childSnapshot => {
                let actor = childSnapshot.val();
                actor['.key'] = childSnapshot.key;
                newactors.push(actor);
            });
            for (const tag in props.tags) {
                if (tag === "age") {
                    newactors = this.filterAge(newactors, props.tags[tag])
                }
                if (tag === "gender") {
                    newactors = this.filterGender(newactors, props.tags[tag])
                }
                if (tag === "height") {
                    console.log(newactors.length);
                    newactors = this.filterHeight(newactors, props.tags[tag])
                    console.log(newactors.length);
                }
                if (tag === "weight") {
                    newactors = this.filterWeight(newactors, props.tags[tag])
                }
            }
            this.setState({ actors: newactors });
            this.setState({ records: this.state.actors.slice(0, this.props.numActor) });
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
        console.log(actors.length);
        for (var i = actors.length - 1; i >= 0; i--) {
            if (actors[i].tag.height > height + 5 || actors[i].tag.height < height - 5) {
                console.log("removed height ", actors[i].tag.height);
                actors.splice(i, 1);
            }
        }
        console.log(actors.length);
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
            <Button id={"block"} key={records.name}>
                <div style={{ width: '80%', textAlign: 'center' }}><img src={records.profilepic} style={{ width: '300px' }} alt="The Rock" /></div>
                <h5 style={{ width: '80%', textAlign: 'center' }}>Name: {records.name}</h5>
                <h5 style={{ width: '80%', textAlign: 'center' }}>Age: {records.tag.age} Gender: {records.tag.gender}</h5>
                <h5 style={{ width: '80%', textAlign: 'center' }}>Height: {records.tag.height} Weight: {records.tag.weight}</h5>
            </Button>
        );

        return (
            <div>{display}</div>
        );
    }
}



export default DisplayActor;