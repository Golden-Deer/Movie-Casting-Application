import db from "../../base";
import "../../App.js";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
import Picture from "../../model/Picture";

class ActorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: this.props.actor.profilepic,
            pictures: [],
            added: false
        }

        this.user = db.auth().currentUser;
        this.candidateRef = null;
        for (var picture of this.props.actor.pictures) {
            var pictures = this.state.pictures;
            Picture.read(picture).getDownloadURL().then((url) => {
                pictures.push(url);
                this.setState({ pictures: pictures });
            }).catch(function (error) {
                alert(error);
            });
        }
        if (this.user != null) this.candidateRef = db.database().ref('USER/' + this.user.uid + '/projects/' + this.props.projectKey + '/roles/' + this.props.role.key + '/candidates/');
        if (this.props.projectKey == 'null') {
            
        }
    }

    addCandidate() {
        this.candidateRef.child(this.props.actor.key).set({
            name: this.props.actor.name,
            key: this.props.actor.key,
            profilePic: this.state.profilePic
        });
        // navigate back to rolepage
        this.props.history.push('/rolepage', [this.props.roleName, this.props.project, this.props.projectKey, this.props.roleKey])
    }

    removeCandidate() {
        this.candidateRef.child(this.props.actor.key).remove();
        // navigate back to rolepage
        this.props.history.push('/rolepage', [this.props.roleName, this.props.project, this.props.projectKey, this.props.roleKey])
    }

    displayPicture(picture){
        window.open(picture);
    }

    componentDidMount() {
        db.auth().onAuthStateChanged((user) => {
            if (user != null && this.props.projectKey != 'null') {
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
    }

    render() {
        var images = [];
        for (var picture of this.state.pictures) {
            images.push(<tr><Card onClick={this.displayPicture.bind(this, picture)}>
            <Card.Img variant="top" src={picture} alt={picture} />
            </Card></tr>);
        }
        var display = null;
        display = 
        <div>
            <div style={{display: 'inline-block', float: 'left', width: 40 + '%'}}>
                <p>
                    <p className='project-attribute-title'><b>Name</b></p>
                    <p className='project-attribute-description'>{this.props.actor.name}</p>
                </p>
                <p>
                    <label className='project-attribute-title'><b>Age</b></label>
                    <p className='project-attribute-description'>{this.props.actor.tag.age}</p>
                </p>
                <p>
                    <label className='project-attribute-title'><b>Gender</b></label>
                    <p className='project-attribute-description'>{this.props.actor.tag.gender.charAt(0).toUpperCase() + this.props.actor.tag.gender.slice(1)}</p>
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
                
                {(this.props.projectKey == 'null') ? null : (this.state.added ? 
                <Button
                    variant='danger'
                    size='lg'
                    id='deleteCandidateButton'
                    onClick={() => this.removeCandidate()}
                    style={{
                        fontSize: 1.25 + 'rem',
                        margin: 8 + '% ' + 2 + '% ' + 2 + '% ' + 2 + '%',
                    }} block>
                    Remove Candidate
                </Button>
                : 
                <Button
                    variant='primary'
                    size='lg'
                    id='addCandidateButton'
                    onClick={() => this.addCandidate()}
                    style={{
                        fontSize: 1.25 + 'rem',
                        margin: 8 + '% ' + 3 + '% ' + 2 + '% ' + 2 + '%',
                    }} block>
                    Add Candidate
                </Button>            
                )}
            </div>
            <div style={{display: 'inline-block', float: 'left', width: 45 + '%', marginLeft: 50 + 'px'}}>
                <img className='project-attribute-title' src={this.state.profilePic} alt={this.props.actor.profilepic} style={{cursor: 'pointer', maxWidth: '700px', maxHeight: '700px'}} onClick={()=>this.displayPicture(this.state.profilePic)}/>
            </div>
            <div class='candidateImages'>
                {images}
            </div>
        </div>;


        return (
            <>
            <div class='movieDetail'>
                {display}
            </div>
            </>
            
        );
    }
}

export default withRouter(ActorDetail);