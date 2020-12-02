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
            pictures: [],
            added: false
        }

        this.user = db.auth().currentUser;
        this.pictureRef = db.storage().ref("Actor Pictures");
        this.candidateRef = null;
        if (this.user != null) this.candidateRef = db.database().ref('USER/' + this.user.uid + '/projects/' + this.props.projectKey + '/roles/' + this.props.role.key + '/candidates/');
    }

    addCandidate() {
        console.log(this.props.projectKey);
        this.candidateRef.child(this.props.actor.key).set({
            name: this.props.actor.name,
            key: this.props.actor.key,
            profilePic: this.state.profilePic
        });
    }

    removeCandidate() {
        this.candidateRef.child(this.props.actor.key).remove();
        window.location.reload();
    }

    componentDidMount() {
        
        db.auth().onAuthStateChanged((user) => {
            if (user != null){
                this.user = user;
                this.candidateRef = db.database().ref('USER/' + this.user.uid + '/projects/' + this.props.projectKey + '/roles/' + this.props.role.key + '/candidates/');
                this.candidateRef.on('value', dataSnapshot => {
                    var added = false;
                    dataSnapshot.forEach(childSnapshot => {
                        if (childSnapshot.val().key === this.props.actor.key) {
                            added = true;
                        }
                    })
                    this.setState({ added: added });
                });
            }
        });
        console.log(this.state.added);
        if (this.state.added) {
            document.getElementById('addCandidateButton').style.visibility = 'hidden';
            document.getElementById('deleteCandidateButton').style.visibility = 'visible';
        }
    }

    componentWillUnmount() {
        this.candidateRef.off();
    }

    render() {
        
        if (this.state.added) {
            document.getElementById('addCandidateButton').style.visibility = 'hidden';
            document.getElementById('deleteCandidateButton').style.visibility = 'visible';
        }
    var display = null;
        display = <div>
            <p>
                <p className='project-attribute-title'><b>Name</b></p>
                <p className='project-attribute-description'>{this.props.actor.name} added:{this.state.added.toString()}</p>
                <img className='project-attribute-title' src={this.state.profilePic} width='400px' alt={this.props.actor.profilepic}/>
            </p>
            <p>
                <label className='project-attribute-title'><b>Age</b></label>
                <p className='project-attribute-description'>{this.props.actor.tag.age}</p>
            </p>
            <p>
                <label className='project-attribute-title'><b>Gender</b></label>
                <p className='project-attribute-description'>{this.props.actor.tag.gender}</p>
            </p>
            <p>
                <label className='project-attribute-title'><b>Height</b></label>
                <p className='project-attribute-description'>{this.props.actor.tag.height} cm</p>
            </p>
            <p>
                <label className='project-attribute-title'><b>Weight</b></label>
                <p className='project-attribute-description'>{this.props.actor.tag.weight} kg</p>
            </p>
            <p>
                <p className='project-attribute-title'><b>Description</b></p>
                <p className='project-attribute-description'>{this.props.actor.introduction}</p>
            </p>
            <Button
                variant='primary'
                id='addCandidateButton'
                onClick={() => this.addCandidate()}
                style={{
                    fontSize: 1.25 + 'rem',
                    margin: 2 + '% ' + 2 + '% ' +2 + '% ' + 2 + '%',
                    visibility: 'visible'
                }}
            >
                Add Candidate
            </Button>
            
            <Button
                variant='danger'
                id='deleteCandidateButton'
                onClick={() => this.removeCandidate()}
                style={{
                    fontSize: 1.25 + 'rem',
                    margin: 2 + '% ' + 2 + '% ' +2 + '% ' + 2 + '%',
                    visibility: 'hidden'
                }}
            >
                Remove Candidate
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