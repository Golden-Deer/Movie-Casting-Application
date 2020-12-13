import '../../App.js';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Picture from '../../controller/Picture';
import Role from '../../controller/Role';

class ActorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: this.props.actor.profilepic,
            pictures: [],
            added: false,
        };
        for (var picture of this.props.actor.pictures) {
            var pictures = this.state.pictures;
            Picture.read(picture)
                .getDownloadURL()
                .then((url) => {
                    pictures.push(url);
                    this.setState({pictures: pictures});
                })
                .catch(function (error) {
                    alert(error);
                });
        }
    }

    addCandidate() {
        var candidate = {
            name: this.props.actor.name,
            profilePic: this.props.actor.profilepic,
            key: this.props.actor.id,
        };
        Role.addCandidate(this.props.role.key, candidate).then(() =>
            window.location.reload()
        );
        // navigate back to rolepage
    }

    removeCandidate() {
        var candidate = {
            name: this.props.actor.name,
            profilePic: this.props.actor.profilepic,
            key: this.props.actor.id,
        };
        Role.deleteCandidate(this.props.role.key, candidate).then(() =>
            window.location.reload()
        );
        // navigate back to rolepage
    }

    displayPicture(picture) {
        window.open(picture);
    }

    componentDidMount() {
        var candidate = {
            name: this.props.actor.name,
            profilePic: this.props.actor.profilepic,
            key: this.props.actor.id,
        };
        if (this.props.role !== 'null') {
            Role.inCandidate(this.props.role.key, candidate).then((yesno) =>
                this.setState({added: yesno})
            );
        }
    }

    render() {
        var images = [];
        for (var picture of this.state.pictures) {
            images.push(
                <td>
                    <Card onClick={this.displayPicture.bind(this, picture)}>
                        <Card.Img variant='top' src={picture} alt={picture}/>
                    </Card>
                </td>
            );
        }
        var display = null;
        display = (
            <div>
                <div
                    style={{display: 'inline-block', float: 'left', width: 40 + '%'}}>
                    <p>
                        <p className='project-attribute-title'>
                            <b>Name</b>
                        </p>
                        <p className='project-attribute-description'>
                            {this.props.actor.name}
                        </p>
                    </p>
                    <p>
                        <label className='project-attribute-title'>
                            <b>Age</b>
                        </label>
                        <p className='project-attribute-description'>
                            {this.props.actor.tag.age}
                        </p>
                    </p>
                    <p>
                        <label className='project-attribute-title'>
                            <b>Gender</b>
                        </label>
                        <p className='project-attribute-description'>
                            {this.props.actor.tag.gender.charAt(0).toUpperCase() +
                            this.props.actor.tag.gender.slice(1)}
                        </p>
                    </p>
                    <p>
                        <label className='project-attribute-title'>
                            <b>Height</b>
                        </label>
                        <p className='project-attribute-description'>
                            {this.props.actor.tag.height} cm
                        </p>
                    </p>
                    <p>
                        <label className='project-attribute-title'>
                            <b>Weight</b>
                        </label>
                        <p className='project-attribute-description'>
                            {this.props.actor.tag.weight} kg
                        </p>
                    </p>
                    <p>
                        <p className='project-attribute-title'>
                            <b>Description</b>
                        </p>
                        <p className='project-attribute-description'>
                            {this.props.actor.introduction}
                        </p>
                    </p>

                    {this.props.role == 'null' ? null : this.state.added ? (
                        <Button
                            variant='danger'
                            size='lg'
                            id='deleteCandidateButton'
                            onClick={() => this.removeCandidate()}
                            style={{
                                fontSize: 1.25 + 'rem',
                                margin: 8 + '% ' + 2 + '% ' + 2 + '% ' + 2 + '%',
                            }}
                            block>
                            Remove Candidate
                        </Button>
                    ) : (
                        <Button
                            variant='primary'
                            size='lg'
                            id='addCandidateButton'
                            onClick={() => this.addCandidate()}
                            style={{
                                fontSize: 1.25 + 'rem',
                                margin: 8 + '% ' + 3 + '% ' + 2 + '% ' + 2 + '%',
                            }}
                            block>
                            Add Candidate
                        </Button>
                    )}
                </div>
                <div
                    style={{
                        display: 'inline-block',
                        float: 'left',
                        width: 45 + '%',
                        marginLeft: 50 + 'px',
                    }}>
                    <img
                        className='project-attribute-title'
                        src={this.state.profilePic}
                        alt={this.props.actor.profilepic}
                        style={{cursor: 'pointer', maxWidth: '700px', maxHeight: '700px'}}
                        onClick={() => this.displayPicture(this.state.profilePic)}
                    />
                </div>
                <div class='candidateImages'><b>More Images</b>{images}</div>
            </div>
        );

        return (
            <>
                <div class='movieDetail'>{display}</div>
            </>
        );
    }
}

export default withRouter(ActorDetail);
