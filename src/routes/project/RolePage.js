import db from "../../base";
import "../../App.js";
import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
import firebase from "firebase";
import DeleteRole from './DeleteRole';
import EditRole from "./EditRole";
import EditProjectPopup from "./EditProjectPopup";

class RolePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: null,
            roleName: this.props.roleName,
            roleKey: '',
            tags: null,
            candidates: null,
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
        this.updateRole = this.updateRole.bind(this);
        this.deleteRole = this.deleteRole.bind(this);
        this.setNewValue = this.setNewValue.bind(this);

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null){
                this.roleRef.orderByChild('name').equalTo(this.props.roleName).on('value', dataSnapshot => {
                    dataSnapshot.forEach(childSnapshot => {
                        var newRole = childSnapshot.val();
                        newRole.key = childSnapshot.key;
                        this.setState({role: newRole, roleKey: childSnapshot.key});
                        this.setState({tags: childSnapshot.val()['tags']});
                        this.setState({candidates: childSnapshot.val()['candidates']});
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

    updateRole(){
        let reference = this.roleRef.child(this.state.roleKey);
        let updates = {}
        updates[this.state.field.toLowerCase()] = this.state.newValue;
        reference.update(updates);
        this.closePopup('editRole');
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
                <Button variant='info' onClick={()=>this.editRole('Name')} style={{marginLeft: 1 + '%'}}>
                    <span class='glyphicon glyphicon-pencil'></span></Button>
                <p className='project-attribute-description'>{this.state.role.name}</p>
            </p>
            <p>
                <label className='project-attribute-title'><b>Tags</b></label>
                <Button variant='info'  style={{marginLeft: 1 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                <p className='project-attribute-description'>{this.state.role.tags}</p>
            </p>
            <p>
                <p className='project-attribute-title'><b>Description</b></p>
                <Button variant='info' onClick={()=>this.editRole('Description')} style={{marginLeft: 1 + '%'}}>
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
            var candidate = [];
            for (var i=0; i<this.state.role.candidates.length; i++){
                if (i % 3 == 0){
                    candidate.push(<tr></tr>)
                }
                candidate.push(<td><Card className='roleCard' >
                    <Card.Body>
                        <Card.Title><b>{this.state.role.candidates[i].name}</b></Card.Title>
                        <Card.Subtitle>{this.state.role.candidates[i].description}</Card.Subtitle>
                    </Card.Body>
                </Card>
                </td>);
            }
            candidates =<table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%' }}>
                <tr>
                    <h2 style={{ marginLeft: 30 + 'px', display: 'inline-block' }}>
                        <b>My Roles&nbsp;&nbsp;</b>
                    </h2>
                    <label class='invisibleButton' onClick={()=> this.props.history.push('/search', [this.props.project, this.props.projectKey, this.state.role])} style={{ fontSize: 40 + 'px' }}>
                        <b>+</b>
                    </label>
                </tr>
                {candidate}
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
        </div>
    );
}
}

export default withRouter(RolePage);