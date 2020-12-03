import db from "../../base";
import "../../App.js";
import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
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
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null){
                this.profileRef = db.database().ref("PROFILE");
                this.roleRef = db.database().ref('USER/' + user.uid + '/projects/' + this.props.projectKey + '/roles/');
                this.roleRef.orderByChild('name').equalTo(this.props.roleName).on('value', dataSnapshot => {
                    dataSnapshot.forEach(childSnapshot => {

                        var newRole = childSnapshot.val();
                        newRole.key = childSnapshot.key;
                        this.setState({role: newRole, roleKey: childSnapshot.key});
                        this.setState({candidates: childSnapshot.val()['candidates']});

                        var candidate = [];
                        var index = 0;
                        this.candidateRef = db.database().ref('USER/' + user.uid + '/projects/' +
                            this.props.projectKey + '/roles/').child(childSnapshot.key).child('candidates');
                        this.candidateRef.on('value', data => {
                            data.forEach(childData =>{
                                if (newRole.candidates[childData.key] != null) {
                                    var actorProfile = null;
                                    firebase.database().ref(this.profileRef.child(newRole.candidates[childData.key].key))
                                        .on('value', snapshot => {
                                            console.log(snapshot.val());
                                            actorProfile = snapshot.val();
                                            actorProfile.key = snapshot.key;
                                            actorProfile.profilepic = newRole.candidates[childData.key].profilePic;
                                        });

                                    candidate.push(<td><Card onClick={() => this.props.history.push('/actor',
                                        [actorProfile, this.props.projectKey, newRole])}>
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
                    })
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
        let reference = this.roleRef.child(this.state.roleKey);
        let updates = {}
        updates[this.state.field.toLowerCase()] = this.state.newValue;
        reference.update(updates);
        this.closePopup('editRole');
        this.closePopup('editRoleTag');
        this.setState({originalValue: '', newValue:''});
    }

    deleteRole(){
        let reference = this.roleRef.child(this.state.roleKey);
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
            <p>
                <p className='project-attribute-title'><b>Role Name</b></p>
                <Button variant='info' onClick={()=>this.editRole('name')} style={{marginLeft: 1 + '%'}}>
                    <span class='glyphicon glyphicon-pencil'></span></Button>
                <p className='project-attribute-description'>{this.state.role.name}</p>
            </p>
            <p>
                <label className='project-attribute-title'><b>Tags</b></label>
                <p className='project-attribute-description'>
                    <Button variant="outline-info" onClick={()=>this.editRoleTag('Age')}>Age: {this.state.role.age}</Button>{' '}
                    <Button variant="outline-info" onClick={()=>this.editRoleTag('Gender')}>Gender: {this.state.role.gender}</Button>{' '}
                    {this.state.role.height == 'unspecified' ?
                        <Button variant="outline-info" onClick={()=>this.editRoleTag('Height')}>
                            Height(cm): {this.state.role.height}</Button>
                            :
                        <Button variant="outline-info" onClick={()=>this.editRoleTag('Height')}>
                        Height(cm): {this.state.role.height}-{Number(this.state.role.height)+9}</Button>
                    }{' '}
                    {this.state.role.height == 'unspecified' ?
                        <Button variant="outline-info" onClick={()=>this.editRoleTag('Weight')}>
                            Weight(kg): {this.state.role.weight}</Button>
                            :
                        <Button variant="outline-info" onClick={()=>this.editRoleTag('Weight')}>
                        Weight(kg): {this.state.role.weight}-{Number(this.state.role.weight)+9}</Button>
                    }
                </p>
            </p>
            <p>
                <p className='project-attribute-title'><b>Description</b></p>
                <Button variant='info' onClick={()=>this.editRole('description')} style={{marginLeft: 1 + '%'}}>
                    <span class='glyphicon glyphicon-pencil'></span></Button>
                <p className='project-attribute-description'>{this.state.role.description}</p>
            </p>
            <Button variant='danger'
                style={{
                    fontSize: 1.25 + 'rem',
                    margin: 2 + '% ' + 2 + '% ' +2 + '% ' + 2 + '%',
                }}
                onClick={()=>{<DeleteRole deleteRole={this.deleteRole()} roleName={this.roleRef.name} closePopup={this.closePopup}/>}}>
                Delete Role
            </Button>
        </div>;

        if (this.state.role.candidates == null) {
            candidates =<table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%' }}>
                <tr>
                    <h2 style={{ marginLeft: 30 + 'px', display: 'inline-block' }}>
                        <b>Casting Candidates&nbsp;&nbsp;</b>
                    </h2>
                    <label class='invisibleButton' onClick={()=> this.props.history.push('/search', [this.props.project, this.props.projectKey, this.state.role])} style={{ fontSize: 40 + 'px' }}>
                        <b>+</b>
                    </label>
                </tr>
                <tr class='banner'>You don't have any casting candidates :(</tr>
            </table>
        }
        else {
           
            candidates =<table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%' }}>
                <tr>
                    <h2 style={{ marginLeft: 30 + 'px', display: 'inline-block' }}>
                        <b>Casting Candidates&nbsp;&nbsp;</b>
                    </h2>
                    <label class='invisibleButton' onClick={()=> this.props.history.push('/search', [this.props.project, this.props.projectKey, this.state.role])} style={{ fontSize: 40 + 'px' }}>
                        <b>+</b>
                    </label>
                </tr>
                {this.state.candidateCards}
            </table>
        }
    }

    return (
        <div>
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