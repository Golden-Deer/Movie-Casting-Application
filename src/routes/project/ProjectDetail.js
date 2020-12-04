import React, {Component } from 'react';
import db from '../../base';
import firebase from 'firebase';
import { withRouter } from "react-router-dom";
import CreateRolePopup from './CreateRolePopup';
import EditRolePopup from './EditRolePopup';
import EditProjectPopup from './EditProjectPopup';
import DeleteProjectPopup from './DeleteProjectPopup';
import Button from 'react-bootstrap/Button';
import {Card, CardDeck} from 'react-bootstrap';
import RolePage from "./RolePage";

class ProjectDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null,
            projectKey: '',
            role: null,
            roles: [],
            roleKey: '',
            roleName: '',
            roleDescription: '',
            roleAge: 'unspecified',
            roleGender: 'unspecified',
            roleHeight: 'unspecified',
            roleWeight: 'unspecified',
            roleImage: null,
            newRoleName: '',
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
        this.setRoleAge = this.setRoleAge.bind(this);
        this.setRoleGender = this.setRoleGender.bind(this);
        this.setRoleHeight = this.setRoleHeight.bind(this);
        this.setRoleWeight = this.setRoleWeight.bind(this);
        this.setNewRoleName = this.setNewRoleName.bind(this);
        this.setNewRoleDescription = this.setNewRoleDescription.bind(this);
        this.setRoleDescription = this.setRoleDescription.bind(this);
        this.setProject = this.setProject.bind(this);
        this.editRolePopup = this.editRolePopup.bind(this);
        this.setRoleImage = this.setRoleImage.bind(this);
        // this.setNewRoleImage = this.setNewRoleImage.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null){
                this.projectRef = db.database().ref('USER').child(user.uid).child('projects');
                this.projectRef.orderByChild('name').equalTo(this.props.projectName).on('value', dataSnapshot => {
                    dataSnapshot.forEach(childSnapshot => {
                        var newProject = childSnapshot.val();
                        newProject.key = childSnapshot.key;
                        this.setState({ project: newProject, projectKey: childSnapshot.key });
                        // save roles
                        this.setState({role: childSnapshot.val()['roles']});
                        var role = [];
                        this.roleRef = db.database().ref('USER').child(user.uid).child('projects').child(childSnapshot.key).child('roles');
                        this.roleRef.on('value', data => {
                            data.forEach(childData =>{
                                role.push(<Card className='roleCard' onClick={() => this.props.history.push('/rolepage', [newProject.roles[childData.key].name, newProject, childSnapshot.key])}>
                                <Card.Body>
                                <Card.Title><b>{newProject.roles[childData.key].name}</b></Card.Title>
                                <Card.Subtitle>{newProject.roles[childData.key].description}</Card.Subtitle>
                                </Card.Body>
                                </Card>
                                );
                                })
                        })
                        this.setState({roles: role});
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
        this.setState({field: field, originalValue: this.state.project[field.toLowerCase().replace(' ', '_')],
            newValue: this.state.project[field.toLowerCase().replace(' ', '_')], disableSave: true});
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

    editRolePopup(e){
        if (document.getElementById('editRolePopup') != null){
            document.getElementById('editRolePopup').style.opacity = 100 + '%'; // show project popup
            document.getElementById('editRolePopup').style.visibility = 'visible'; // show project popup\
            this.setState({roleKey: e, roleName: this.state.project['roles'][e]['name'], newRoleName: this.state.project['roles'][e]['name'],
                roleDescription: this.state.project['roles'][e]['description'], newRoleDescription: this.state.project['roles'][e]['description']})
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
        this.setState({roleName: e});
    }

    setRoleAge(e){
        this.setState({roleAge: e});
    }

    setRoleGender(e){
        this.setState({roleGender: e});
    }

    setRoleHeight(e){
        this.setState({roleHeight: e});
    }

    // The following functions are not being used
    setRoleWeight(e){
        this.setState({roleWeight: e});
    }
    
    setNewRoleName(e){
        this.setState({newRoleName: e});
    }
    
    setRoleDescription(e){
        this.setState({roleDescription: e});
    }
    
    setNewRoleDescription(e){
        this.setState({newRoleDescription: e});
    }
    
    setRoleImage(e){
        this.setState({})
    }
    
    setProject(e){
        this.setState({project: e});
    }

    render() {
        var display = null;
        var roles = null;
        if (this.state.project != null) {
            display = <div>
                <div>
                <h2 style={{display: 'inline-block' }}>
                        <b>Project Detail</b>
                </h2>

                <Button
                    variant='danger'
                    style={{
                        float:"right"
                    }}
                    onClick={this.deleteConfirmation}
                    >
                    Delete Project
                </Button>
                </div>
                <br />
                <Card>
                    <Card.Header><b>Release Date</b>
                        <Button variant='outline-info' style={{float: 'right'}}
                            onClick={()=>this.editProject('Release Date')} >
                                <span class='glyphicon glyphicon-pencil'></span>
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.project.release_date}</Card.Title>
                    </Card.Body>
                </Card>
                <br />
                <Card>
                    <Card.Header><b>Genere</b>
                        <Button variant='outline-info' style={{float: 'right'}}
                             onClick={()=>this.editProject('Genre')}>
                                <span class='glyphicon glyphicon-pencil'></span>
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.project.genre}</Card.Title>
                    </Card.Body>
                </Card>
                <br />
                <Card>
                    <Card.Header><b>Description</b>
                        <Button variant='outline-info' style={{float: 'right'}}
                             onClick={()=>this.editProject('Description')}>
                                <span class='glyphicon glyphicon-pencil'></span>
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.project.description}</Card.Title>
                    </Card.Body>
                </Card>
                <br />
                <Card>
                    <Card.Header><b>Director</b>
                        <Button variant='outline-info' style={{float: 'right'}}
                             onClick={()=>this.editProject('Director')}>
                                <span class='glyphicon glyphicon-pencil'></span>
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.project.director}</Card.Title>
                    </Card.Body>
                </Card>
                <br />
                <Card>
                    <Card.Header><b>Producer</b>
                        <Button variant='outline-info' style={{float: 'right'}}
                             onClick={()=>this.editProject('Producer')} >
                                <span class='glyphicon glyphicon-pencil'></span>
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.project.producer}</Card.Title>
                    </Card.Body>
                </Card>
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
                roles =<table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%' }}>
                <tr>
                    <h2 style={{display: 'inline-block' }}>
                        <b>My Roles&nbsp;&nbsp;</b>
                    </h2>
                    <label class='invisibleButton' onClick={() => this.rolePopup()} style={{ fontSize: 40 + 'px' }}>
                        <b>+</b>
                    </label>
                </tr>
                <CardDeck>
                    {this.state.roles}
                </CardDeck>
                </table>
            }
        }

        return (
            <div class="body">
                <CreateRolePopup roleName={this.state.roleName} roleDescription={this.state.roleDescription} roleWeight={this.state.roleWeight} roleAge={this.state.roleAge} roleGender={this.state.roleGender} roleHeight={this.state.roleHeight} project={this.state.project}
                                 projectRef={this.projectRef} projectKey={this.state.projectKey} setRoleName={this.setRoleName} setRoleAge={this.setRoleAge} setRoleGender={this.setRoleGender} setRoleHeight={this.setRoleHeight} setRoleWeight={this.setRoleWeight}
                                 setRoleDescription={this.setRoleDescription} setRoleImage={this.roleImage} setProject={this.setProject}
                                 closePopup={this.closePopup}/>
                {/*      Use EditRole from RolePage instead           */}
                {/*<EditRolePopup index={this.state.roleKey} project={this.state.project} projectKey={this.state.projectKey}*/}
                {/*               roleName={this.state.roleName} newRoleName={this.state.newRoleName} roleDescription={this.state.roleDescription}*/}
                {/*               newRoleDescription={this.state.newRoleDescription} setNewRoleName={this.setNewRoleName} setNewRoleDescription={this.setNewRoleDescription}*/}
                {/*               setProject={this.setProject} closePopup={this.closePopup}/>*/}
                {display}
                {roles}
                <br />
                
                <EditProjectPopup field={this.state.field} originalValue={this.state.originalValue} newValue={this.state.newValue}
                                  setNewValue={this.setNewValue} disableSave={this.state.disableSave} updateProject={this.updateProject}
                                  closePopup={this.closePopup}/>
                <DeleteProjectPopup deleteProject={this.deleteProject} projectName={this.state.projectName} closePopup={this.closePopup}/>
            </div>
        );
    }
}



export default withRouter(ProjectDetail);