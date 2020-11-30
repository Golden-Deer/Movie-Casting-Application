import React, {Component } from 'react';
import db from '../../base';
import firebase from 'firebase';
import { withRouter } from "react-router-dom";
import RolePopup from './RolePopup';
import EditProjectPopup from './EditProjectPopup';
import DeleteProjectPopup from './DeleteProjectPopup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class ProjectDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null,
            projectKey: '',
            roleName: '',
            roleDescription: '',
            field: '',
            originalValue: '',
            newValue: '',
            disableSave: true,
            index: props.location.state[1],
        };
        var user = firebase.auth().currentUser;
        if (user != null)
            this.projectRef = db.database().ref('USER').child(user.uid).child('projects');

        // bind functions
        this.updateProject = this.updateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.setNewValue = this.setNewValue.bind(this);
        this.setRoleName = this.setRoleName.bind(this);
        this.setRoleDescription = this.setRoleDescription.bind(this);
        this.setProject = this.setProject.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null){
                this.projectRef = db.database().ref('USER').child(user.uid).child('projects');
                this.projectRef.orderByChild('name').equalTo(this.props.projectName).on('value', dataSnapshot => {
                    dataSnapshot.forEach(childSnapshot => {
                        this.setState({ project: childSnapshot.val(), projectKey: childSnapshot.key });
                    })  
                });
            }
        });
    }

    componentWillUnmount() {
        this.projectRef.off();
    }

    editProject(field){
        document.getElementById('editProjectPopup').style.visibility = 'visible';
        document.getElementById('editProjectPopup').style.opacity = 100 + '%';
        this.setState({field: field, originalValue: this.state.project[field.toLowerCase().replace(' ', '_')], newValue: this.state.project[field.toLowerCase().replace(' ', '_')], disableSave: true});
    }

    updateProject(){
        let reference = firebase.database().ref('USER/' + firebase.auth().currentUser.uid + '/projects').child(this.state.index);
        let updates = {}
        updates[this.state.field.toLowerCase().replace(' ', '_')] = this.state.newValue
        reference.update(updates);
        this.closePopup('editProjectPopup');
    }

    deleteConfirmation(){
        document.getElementById('deleteProjectPopup').style.visibility = 'visible';
        document.getElementById('deleteProjectPopup').style.opacity = 100 + '%';
    }

    deleteProject(){
        let reference = firebase.database().ref('USER/' + firebase.auth().currentUser.uid +'/projects/' + (this.state.index));
        reference.remove();
        this.closePopup('deleteProjectPopup');
        this.closePopup('editProjectPopup');
        reference.off();
        this.props.history.push('/');
    }

    rolePopup() {
        if (document.getElementById('rolePopup') != null) {
        document.getElementById('rolePopup').style.opacity = 100 + '%'; // show project popup
        document.getElementById('rolePopup').style.visibility = 'visible'; // show project popup
        }
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

    setRoleName(e){
        this.setState({ roleName: e });
    }

    setRoleDescription(e){
        this.setState({ roleDescription: e });
    }

    setProject(e){
        this.setState({project: e});
    }

    render() {
        var display = null;
        var roles = null;
        if (this.state.project != null) {
            display = <div>
                <p>
                    <p className='project-attribute-title'><b>Release Date</b></p>
                    <Button variant='info' onClick={()=>this.editProject('Release Date')} style={{marginLeft: 1 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                    <p className='project-attribute-description'>{this.state.project.release_date}</p>
                </p>
                <p>
                    <label className='project-attribute-title'><b>Genre</b></label>
                    <Button variant='info' onClick={()=>this.editProject('Genre')} style={{marginLeft: 1 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                    <p className='project-attribute-description'>{this.state.project.genre}</p>
                </p>
                <p>
                    <p className='project-attribute-title'><b>Description</b></p>
                    <Button variant='info' onClick={()=>this.editProject('Description')} style={{marginLeft: 1 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                    <p className='project-attribute-description'>{this.state.project.description}</p>
                </p>
                <p>
                    <p className='project-attribute-title'><b>Director</b></p>
                    <Button variant='info' onClick={()=>this.editProject('Director')} style={{marginLeft: 1 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                    <p className='project-attribute-description'>{this.state.project.director}</p>
                </p>
                <p>
                    <p className='project-attribute-title'><b>Producer</b></p>
                    <Button variant='info' onClick={()=>this.editProject('Producer')} style={{marginLeft: 1 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                    <p className='project-attribute-description'>{this.state.project.producer}</p>
                </p>
                <Button
                    variant='danger'
                    style={{
                        fontSize: 1.25 + 'rem',
                        margin: 2 + '% ' + 2 + '% ' +2 + '% ' + 2 + '%',
                    }}
                    onClick={this.deleteConfirmation}
                    >
                    Delete Project
                </Button>
            </div>;

            if (this.state.project.roles == null) {
                roles =<table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%' }}>
                <tr>
                    <h2 style={{ marginLeft: 30 + 'px', display: 'inline-block' }}>
                        <b>My Roles&nbsp;&nbsp;</b>
                    </h2>
                    <label class='invisibleButton' onClick={() => this.rolePopup()} style={{ fontSize: 40 + 'px' }}>
                        <b>+</b>
                    </label>
                </tr>
                <tr class='banner'>You don't have any roles :(</tr>
                </table>
            }
            else {
                var role = [];
                for (var i=0; i<this.state.project.roles.length; i++){
                    if (i % 3 == 0){
                        console.log("newline")
                        role.push(<tr></tr>)
                    }
                    role.push(<td><Card className='roleCard'>
                    <Card.Body>
                    <Card.Title><b>{this.state.project.roles[i].name}</b></Card.Title>
                    <Card.Subtitle>{this.state.project.roles[i].description}</Card.Subtitle>
                    </Card.Body>
                    </Card>
                    </td>);
                }
                console.log("HERE")
                roles =<table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%' }}>
                <tr>
                    <h2 style={{ marginLeft: 30 + 'px', display: 'inline-block' }}>
                        <b>My Roles&nbsp;&nbsp;</b>
                    </h2>
                    <label class='invisibleButton' onClick={() => this.rolePopup()} style={{ fontSize: 40 + 'px' }}>
                        <b>+</b>
                    </label>
                </tr>
                {role}
                </table>
            }
        }

        return (
            <div>
                <RolePopup roleName={this.state.roleName} roleDescription={this.state.roleDescription} project={this.state.project} projectRef={this.projectRef} projectKey={this.state.projectKey} setRoleName={this.setRoleName} setRoleDescription={this.setRoleDescription} setProject={this.setProject} closePopup={this.closePopup}/>
                {display}
                {roles}
                <EditProjectPopup field={this.state.field} originalValue={this.state.originalValue} newValue={this.state.newValue} setNewValue={this.setNewValue} disableSave={this.state.disableSave} updateProject={this.updateProject} closePopup={this.closePopup}/>
                <DeleteProjectPopup deleteProject={this.deleteProject} projectName={this.state.projectName} closePopup={this.closePopup}/>
            </div>
        );
    }
}



export default withRouter(ProjectDetail);