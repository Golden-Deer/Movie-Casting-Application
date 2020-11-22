import React, { Component } from 'react';
import db from '../../base'

class DisplayActor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actors: []
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
        if (this.props.numActor !== prevProps.numActor) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
            this.updateNumActor();
        }
    }

    updateNumActor() {
        this.profileRef.orderByChild('name').limitToFirst(this.props.numActor).on('value', dataSnapshot => {
            let newactors = [];
            dataSnapshot.forEach(childSnapshot => {
                let actor = childSnapshot.val();
                actor['.key'] = childSnapshot.key;
                newactors.push(actor);
            });
            this.setState({ actors: newactors });
        });
    }
    componentWillUnmount() {
        this.profileRef.off();
    }

    render() {
        const records = this.state.actors.map(actors =>
            <button id={"block"} key={actors.name}>
                <div style={{ width: '80%', textAlign: 'center' }}><img src={actors.profilepic} style={{ width: '300px' }} alt="The Rock" /></div>
                <h5 style={{ width: '80%', textAlign: 'center' }}>Name: {actors.name}</h5>
                <h5 style={{ width: '80%', textAlign: 'center' }}>Age: {actors.tag.age} Gender: {actors.tag.gender}</h5>
                <h5 style={{ width: '80%', textAlign: 'center' }}>Height: {actors.tag.height} Weight: {actors.tag.weight}</h5>
            </button>
        );

        return (
            <div>{records}</div>
        );
    }
}



export default DisplayActor;