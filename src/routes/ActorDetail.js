import db from "../base";
import "../App.js";
import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
import firebase from "firebase";

class ActorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: this.props.actor.profilepic,
            pictures: []
        }

        this.user = db.auth().currentUser;
        this.pictureRef = db.storage().ref("Actor Pictures");
    }

    addCandidate() {
        alert(this.props.actor.key);
        db.database().ref('USER/' + this.user.uid + '/projects/' + this.props.project.key + '/roles/' + this.props.role.key + '/candidates/').push({
            name: this.props.actor.name,
            profilePic: this.state.profilePic
        });
    }


    render() {
    var display = null;
    var candidates = null;
        display = <div>
            <p>
                <p className='project-attribute-title'><b>Name</b></p>
                <p className='project-attribute-description'>{this.props.actor.name}</p>
                <img src={this.state.profilePic} alt={this.props.actor.profilepic}/>
            </p>
            <p>
                <label className='project-attribute-title'><b>Tags</b></label>
                <p className='project-attribute-description'>{this.props.actor.tags}</p>
            </p>
            <p>
                <p className='project-attribute-title'><b>Description</b></p>
                <p className='project-attribute-description'>{this.props.actor.introduction}</p>
            </p>
            <Button
                variant='danger'
                onClick={() => this.addCandidate()}
                style={{
                    fontSize: 1.25 + 'rem',
                    margin: 2 + '% ' + 2 + '% ' +2 + '% ' + 2 + '%',
                }}
            >
                Add Candidate
            </Button>
        </div>;

        
    return (
        <div>

            {display}

        </div>
    );
}
}

export default withRouter(ActorDetail);