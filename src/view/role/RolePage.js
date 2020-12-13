import "../../App.js";
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Button from 'react-bootstrap/Button'
import {Card, CardDeck} from "react-bootstrap";
import DeleteRole from './DeleteRole';
import EditRole from "./EditRole";
import EditRoleTag from "./EditRoleTag";
import Role from '../../controller/Role';
import Profile from "../../controller/Profile";

class RolePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: this.props.role,
            roleName: this.props.role.name,
            roleKey: this.props.role.key,
            candidates: [],
            candidateCards: [],
            roleDescription: this.props.role.description,
            field: '',
            originalValue: '',
            newValue: '',
            disableSave: true
        }

        this.editRole = this.editRole.bind(this);
        this.editRoleTag = this.editRoleTag.bind(this);
        this.updateRole = this.updateRole.bind(this);
        this.deleteRole = this.deleteRole.bind(this);
        this.setNewValue = this.setNewValue.bind(this);
    }

    componentDidMount() {
        // start at top of the page
        window.scrollTo(0, 0)
        Role.get(this.props.role.key).then((role) => {
            this.setState({role: role.val(), roleName: role.val().name, rolekey: role.val().key});
        })
        Role.getCandidates(this.state.roleKey).then((candidates) => {
            var cards = [];
            console.log(candidates)
            if (candidates == undefined)
                candidates = []
            candidates.forEach(candidate => {
                Profile.read(candidate.key).then((data) => {
                    var actor = data.val()
                    actor.profilepic = candidate.profilePic;
                    console.log(actor.profilepic)
                    cards.push(<td><Card className='candidateCard' onClick={() => this.props.history.push('/actor',
                        [this.state.role, actor])}>
                        <Card.Img variant="top" src={candidate.profilePic}/>
                        <Card.Body>
                            <Card.Title><b>{candidate.name}</b></Card.Title>
                        </Card.Body>
                    </Card>
                    </td>)
                    console.log(actor)
                }).then(() =>
                    this.setState({candidateCards: cards}))
            })
        })
    }

    editRole(field) {
        document.getElementById('editRole').style.visibility = 'visible';
        document.getElementById('editRole').style.opacity = 100 + '%';
        this.setState({
            field: field, originalValue: this.state.role[field.toLowerCase()],
            newValue: this.state.role[field.toLowerCase()], disableSave: true
        });
    }

    editRoleTag(field) {
        document.getElementById('editRoleTag').style.visibility = 'visible';
        document.getElementById('editRoleTag').style.opacity = 100 + '%';
        this.setState({
            field: field, originalValue: this.state.role[field.toLowerCase()],
            newValue: this.state.role[field.toLowerCase()], disableSave: true
        });
    }

    updateRole() {
        var newRole = this.state.role;
        newRole[this.state.field.toLowerCase()] = this.state.newValue;
        console.log(newRole)
        Role.update(this.state.roleKey, newRole);
        this.closePopup('editRole');
        this.closePopup('editRoleTag');
        this.setState({originalValue: '', newValue: ''});
        if (this.state.field == 'Name')
            this.props.resetRoleName(this.state.newValue);
    }

    deleteRole() {
        Role.delete(this.props.project.key, this.state.roleKey)
        this.closePopup('deleteRole');
        this.props.history.push('/project', [this.props.project]);
    }

    deleteConfirmation() {
        document.getElementById('deleteRole').style.visibility = 'visible';
        document.getElementById('deleteRole').style.opacity = 100 + '%';
    }

    closePopup(type) {
        if (document.getElementById(type) != null) {
            document.getElementById(type).style.opacity = 0 + '%';
            document.getElementById(type).style.visibility = 'hidden';
        }
    }

    setNewValue(e, bool) {
        this.setState({newValue: e.target.value, disableSave: bool})
    }

    render() {
        var display = null;
        var candidates = null;
        if (this.state.role != null) {
            display = <div>
                <div>
                    <h2 style={{display: 'inline-block'}}>
                        <b>Role Detail</b>
                    </h2>

                    <Button variant='danger'
                            style={{
                                float: 'right'
                            }}
                            onClick={() => {
                                <DeleteRole deleteRole={this.deleteRole()} roleName={this.state.role.name}
                                            closePopup={this.closePopup}/>
                            }}>
                        Delete Role
                    </Button>

                </div>
                <br/>
                <Card>
                    <Card.Header style={{fontSize: 22 + 'px'}}><b>Role Name</b>
                        <Button variant='outline-info' style={{float: 'right'}}
                                onClick={() => this.editRole('Name')}>
                            <span class='glyphicon glyphicon-pencil'></span>
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.role.name}</Card.Title>
                    </Card.Body>
                </Card>
                <br/>
                <Card>
                    <Card.Header style={{fontSize: 22 + 'px'}}><b>Tags</b></Card.Header>
                    <br/>
                    <Card.Body>
                        <p className='project-attribute-tags'>
                            <Button variant="outline-info" onClick={() => this.editRoleTag('Age')}>
                                Age: {this.state.role.age.charAt(0).toUpperCase() + this.state.role.age.slice(1)}
                            </Button>
                            <Button variant="outline-info" onClick={() => this.editRoleTag('Gender')}
                                    style={{marginLeft: 30 + 'px'}}>
                                Gender: {this.state.role.gender.charAt(0).toUpperCase() + this.state.role.gender.slice(1)}
                            </Button>
                            <Button variant="outline-info" onClick={() => this.editRoleTag('Height')}
                                    style={{marginLeft: 30 + 'px'}}>
                                Height
                                (cm): {this.state.role.height.charAt(0).toUpperCase() + this.state.role.height.slice(1)}
                            </Button>
                            <Button variant="outline-info" onClick={() => this.editRoleTag('Weight')}
                                    style={{marginLeft: 30 + 'px'}}>
                                Weight
                                (kg): {this.state.role.weight.charAt(0).toUpperCase() + this.state.role.weight.slice(1)}
                            </Button>
                        </p>
                    </Card.Body>

                </Card>
                <br/>
                <Card>
                    <Card.Header style={{fontSize: 22 + 'px'}}><b>Description</b>
                        <Button variant='outline-info' style={{float: 'right'}}
                                onClick={() => this.editRole('Description')}>
                            <span class='glyphicon glyphicon-pencil'></span>
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.role.description}</Card.Title>
                    </Card.Body>
                </Card>
            </div>;

            if (this.state.role.candidates == null) {
                candidates = <table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%'}}>
                    <tr>
                        <h2 style={{display: 'inline-block'}}>
                            <b>Casting Candidates&nbsp;&nbsp;</b>
                        </h2>
                        <label class='invisibleButton'
                               onClick={() => this.props.history.push('/search', [this.state.role])}
                               style={{fontSize: 40 + 'px'}}>
                            <b>+</b>
                        </label>
                    </tr>
                    <tr class='banner'>You don't have any casting candidates :(</tr>
                </table>
            } else {
                candidates = <table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%'}}>
                    <tr>
                        <h2 style={{display: 'inline-block'}}>
                            <b>Casting Candidates&nbsp;&nbsp;</b>
                        </h2>
                        <label class='invisibleButton'
                               onClick={() => this.props.history.push('/search', [this.state.role])}
                               style={{fontSize: 40 + 'px'}}>
                            <b>+</b>
                        </label>
                    </tr>
                    <CardDeck>
                        {this.state.candidateCards}
                    </CardDeck>
                </table>
            }
        }

        return (
            <div class="movieDetail">
                {display}
                {candidates}
                <EditRole field={this.state.field} originalValue={this.state.originalValue}
                          newValue={this.state.newValue}
                          setNewValue={this.setNewValue} disableSave={this.state.disableSave}
                          updateRole={this.updateRole}
                          closePopup={this.closePopup}/>
                <EditRoleTag field={this.state.field} originalValue={this.state.originalValue}
                             newValue={this.state.newValue}
                             setNewValue={this.setNewValue} disableSave={this.state.disableSave}
                             updateRole={this.updateRole}
                             closePopup={this.closePopup}/>
            </div>
        );
    }
}

export default withRouter(RolePage);