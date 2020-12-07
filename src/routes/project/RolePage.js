import db from "../../base";
import "../../App.js";
import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { Card, CardDeck } from "react-bootstrap";
import firebase from "firebase";
import DeleteRole from './DeleteRole';
import EditRole from "./EditRole";
import EditRoleTag from "./EditRoleTag";

class RolePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: null,
            roleName: this.props.roleName,
            roleKey: '',
            candidates: null,
            candidateCards: null,
            roleDescription: '',
            roleImage: '',
            field: '',
            originalValue: '',
            newValue: '',
            disableSave: true
        }

        var user = db.auth().currentUser;
        if (user != null) {
            this.roleRef = db.database().ref('USER/' + user.uid + '/projects/' + this.props.projectKey + '/roles/');
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
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null){
                this.profileRef = db.database().ref("PROFILE");
                this.roleRef = db.database().ref('USER/' + user.uid + '/projects/' + this.props.projectKey + '/roles/' + this.props.roleKey);
                console.log(this.props.roleKey);
                this.roleRef.on('value', dataSnapshot => {
                    if (dataSnapshot.val()!=null){
                        var newRole = dataSnapshot.val();
                        newRole.key = dataSnapshot.key;
                        this.setState({role: newRole, roleKey: dataSnapshot.key, candidates: dataSnapshot.val()['candidates']});
                        var candidate = [];
                        var index = 0;
                        this.candidateRef = db.database().ref('USER/' + user.uid + '/projects/' + this.props.projectKey + '/roles/').child(dataSnapshot.key).child('candidates');
                        this.candidateRef.on('value', data => {
                            data.forEach(childData =>{
                                if (newRole.candidates!= null && newRole.candidates[childData.key] != null) {
                                    var actorProfile = null;
                                    firebase.database().ref(this.profileRef.child(newRole.candidates[childData.key].key))
                                        .on('value', snapshot => {
                                            actorProfile = snapshot.val();
                                            actorProfile.key = snapshot.key;
                                            actorProfile.profilepic = newRole.candidates[childData.key].profilePic;
                                        });
                                    // pass rolename as props as well
                                    candidate.push(<td><Card className='candidateCard' onClick={() => this.props.history.push('/actor',
                                        [dataSnapshot.val().name, actorProfile, this.props.projectKey, newRole, this.props.project, this.props.roleKey])}>
                                        <Card.Img variant="top" src={newRole.candidates[childData.key].profilePic}/>
                                        <Card.Body>
                                            <Card.Title><b>{newRole.candidates[childData.key].name}</b></Card.Title>
                                        </Card.Body>
                                    </Card>
                                    </td>);
                                    index+=1;
                                    if (index % 3 == 0){
                                        candidate.push(<tr></tr>)
                                    }
                                }
                            })
                        })
                        this.setState({candidateCards: candidate});
                    }
                });
            }
        });
    }

    componentWillUnmount() {
        this.roleRef.off();
    }

    editRole(field){
        document.getElementById('editRole').style.visibility = 'visible';
        document.getElementById('editRole').style.opacity = 100 + '%';
        this.setState({field: field, originalValue: this.state.role[field.toLowerCase()],
            newValue: this.state.role[field.toLowerCase()], disableSave: true});
    }

    editRoleTag(field){
        document.getElementById('editRoleTag').style.visibility = 'visible';
        document.getElementById('editRoleTag').style.opacity = 100 + '%';
        this.setState({field: field, originalValue: this.state.role[field.toLowerCase()],
            newValue: this.state.role[field.toLowerCase()], disableSave: true});
    }

    updateRole(){
        let reference = this.roleRef;
        let updates = {}
        updates[this.state.field.toLowerCase()] = this.state.newValue;
        reference.update(updates);
        this.closePopup('editRole');
        this.closePopup('editRoleTag');
        this.setState({originalValue: '', newValue:''});
        if (this.state.field == 'Name')
            this.props.resetRoleName(this.state.newValue);
    }

    deleteRole(){
        let reference = this.roleRef;
        reference.remove();
        this.closePopup('deleteRole');
        reference.off();
        this.props.history.push('/project', [this.props.project, this.props.projectKey]);
    }

    deleteConfirmation(){
        document.getElementById('deleteRole').style.visibility = 'visible';
        document.getElementById('deleteRole').style.opacity = 100 + '%';
    }

    closePopup(type) {
        if (document.getElementById(type) != null) {
            document.getElementById(type).style.opacity = 0 + '%';
            document.getElementById(type).style.visibility = 'hidden';
        }
    }

    setNewValue(e, bool){
        this.setState({newValue: e.target.value, disableSave: bool})
    }

    render() {
    var display = null;
    var candidates = null;
    if (this.state.role != null) {
        display = <div>
            <div>
                <h2 style={{display: 'inline-block' }}>
                        <b>Role Detail</b>
                </h2>

                <Button variant='danger'
                    style={{
                       float: 'right'
                    }}
                    onClick={()=>{<DeleteRole deleteRole={this.deleteRole()} roleName={this.roleRef.name} closePopup={this.closePopup}/>}}>
                    Delete Role
                </Button>

            </div>
            <br />
            <Card>
                <Card.Header style={{fontSize: 22+'px'}}><b>Role Name</b>
                    <Button variant='outline-info' style={{float: 'right'}}
                        onClick={()=>this.editRole('Name')} >
                            <span class='glyphicon glyphicon-pencil'></span>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{this.state.role.name}</Card.Title>
                </Card.Body>
            </Card>
            <br/>
            <Card>
            <Card.Header style={{fontSize: 22+'px'}}><b>Tags</b></Card.Header>
                 <br/>
                 <Card.Body>
                 <p className='project-attribute-tags'>
                    <Button variant="outline-info" onClick={()=>this.editRoleTag('Age')}>Age: {this.state.role.age.charAt(0).toUpperCase() + this.state.role.age.slice(1)}</Button>
                    <Button variant="outline-info" onClick={()=>this.editRoleTag('Gender')} style={{marginLeft: 30 + 'px'}}>Gender: {this.state.role.gender.charAt(0).toUpperCase() + this.state.role.gender.slice(1)}</Button>
                    <Button variant="outline-info" onClick={()=>this.editRoleTag('Height')} style={{marginLeft: 30 + 'px'}}>Height (cm): {this.state.role.height.charAt(0).toUpperCase() + this.state.role.height.slice(1)}</Button>
                    <Button variant="outline-info" onClick={()=>this.editRoleTag('Weight')} style={{marginLeft: 30 + 'px'}}>Weight (kg): {this.state.role.weight.charAt(0).toUpperCase() + this.state.role.weight.slice(1)}</Button>
                </p>
                 </Card.Body>
                
            </Card>
            <br />
            <Card>
                <Card.Header style={{fontSize: 22+'px'}}><b>Description</b>
                    <Button variant='outline-info' style={{float: 'right'}}
                        onClick={()=>this.editRole('Description')} >
                            <span class='glyphicon glyphicon-pencil'></span>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{this.state.role.description}</Card.Title>
                </Card.Body>
            </Card>
        </div>;

        if (this.state.role.candidates == null) {
            candidates =<table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%' }}>
                <tr>
                    <h2 style={{ display: 'inline-block' }}>
                        <b>Casting Candidates&nbsp;&nbsp;</b>
                    </h2>
                    <label class='invisibleButton' onClick={()=> this.props.history.push('/search', [this.props.project, this.props.projectKey, this.state.role, this.props.roleKey])} style={{ fontSize: 40 + 'px' }}>
                        <b>+</b>
                    </label>
                </tr>
                <tr class='banner'>You don't have any casting candidates :(</tr>
            </table>
        }
        else {
            candidates =<table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%' }}>
                <tr>
                    <h2 style={{ display: 'inline-block' }}>
                        <b>Casting Candidates&nbsp;&nbsp;</b>
                    </h2>
                    <label class='invisibleButton' onClick={()=> this.props.history.push('/search', [this.props.project, this.props.projectKey, this.state.role, this.props.roleKey])} style={{ fontSize: 40 + 'px' }}>
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
            <EditRole field={this.state.field} originalValue={this.state.originalValue} newValue={this.state.newValue}
                      setNewValue={this.setNewValue} disableSave={this.state.disableSave} updateRole={this.updateRole}
                      closePopup={this.closePopup}/>
            <EditRoleTag field={this.state.field} originalValue={this.state.originalValue} newValue={this.state.newValue}
                      setNewValue={this.setNewValue} disableSave={this.state.disableSave} updateRole={this.updateRole}
                      closePopup={this.closePopup}/>
        </div>
    );
}
}

export default withRouter(RolePage);