import React, { Component } from 'react';
import db from '../../base'

class DisplayActor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actors: []
        };

        this.profileRef = db.database().ref("PROFILE");

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

    componentDidUpdate(prevProps) {
        if (this.props.numActor != prevProps.numActor) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
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
                <div style={{ width: '80%', textAlign: 'center' }}><img src={actors.profilepic} style={{ width: '300px' }} /></div>
                <h7 style={{ width: '80%', textAlign: 'center' }}>{actors.name}</h7>
            </button>
        );

        return (
            <div>{records}</div>
        );
    }
}



export default DisplayActor;