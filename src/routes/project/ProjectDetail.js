import React, {Component } from 'react';
import db from '../../base';
import firebase from 'firebase';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button';

class ProjectDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null,
            roleName: '',
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
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null){
                this.projectRef = db.database().ref('USER').child(user.uid).child('projects');
                this.projectRef.orderByChild('name').equalTo(this.props.projectName).on('value', dataSnapshot => {
                    dataSnapshot.forEach(childSnapshot => {
                        this.setState({ project: childSnapshot.val() });
                    })  
                });
            }
        });
    }

    componentWillUnmount() {
        this.projectRef.off();
    }

    createRole() {
        // add this project to the project list of this user
        if (this.state.project != null) {
            var updateProject = this.state.project;
            alert(updateProject.name)
            if (updateProject.roles == null) {
                updateProject.roles = [];
            }
            this.setState({ project: updateProject.roles.push({ name: this.state.roleName }) });
            this.projectRef.child(this.state.project.name).set(this.state.project);
            // reset states
            this.setState({ roleName: '' });
        }
    }

    editProject(field){
        document.getElementById('editProjectPopup').style.visibility = 'visible';
        document.getElementById('editProjectPopup').style.opacity = 100 + '%';
        this.setState({field: field, originalValue: this.state.project[field.toLowerCase().replace(' ', '_')], newValue: this.state.project[field.toLowerCase().replace(' ', '_')], disableSave: true});
    }

    editField(e) {
        const re = /^[0-9\b]+$/;
        if (!(this.state.field == 'Release Date' && (e.target.value.length > 4 || !re.test(e.target.value)))){
        if (this.state.originalValue == e.target.value || (this.state.field == 'Release Date' && e.target.value.length != 4))
            this.setState({newValue: e.target.value, disableSave: true})
        else
            this.setState({newValue: e.target.value, disableSave: false})
        }
        
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

    render() {
        var display = null;
        var roles = null;
        if (this.state.project != null) {
            display = <div>
                <p>
                    <Button variant='info' onClick={()=>this.editProject('Release Date')} style={{margin: 0 + '% ' +  -1 + '% ' + 0 + '% ' + 2 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                    <p className='project-attribute-title'><b>Release Date</b></p>
                    <p className='project-attribute-description'>{this.state.project.release_date}</p>
                </p>
                <p>
                    <Button variant='info' onClick={()=>this.editProject('Genre')} style={{margin: 0 + '% ' +  -1 + '% ' + 0 + '% ' + 2 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                    <label className='project-attribute-title'><b>Genre</b></label>
                    <p className='project-attribute-description'>{this.state.project.genre}</p>
                </p>
                <p>
                    <Button variant='info' onClick={()=>this.editProject('Description')} style={{margin: 0 + '% ' +  -1 + '% ' + 0 + '% ' + 2 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                    <p className='project-attribute-title'><b>Description</b></p>
                    <p className='project-attribute-description'>{this.state.project.description}</p>
                </p>
                <p>
                    <Button variant='info' onClick={()=>this.editProject('Director')} style={{margin: 0 + '% ' +  -1 + '% ' + 0 + '% ' + 2 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                    <p className='project-attribute-title'><b>Director</b></p>
                    <p className='project-attribute-description'>{this.state.project.director}</p>
                </p>
                <p>
                    <Button variant='info' onClick={()=>this.editProject('Producer')} style={{margin: 0 + '% ' +  -1 + '% ' + 0 + '% ' + 2 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                    <p className='project-attribute-title'><b>Producer</b></p>
                    <p className='project-attribute-description'>{this.state.project.producer}</p>
                </p>
            </div>;

            if (this.state.project.roles == null) {
                roles = <p class='banner'>You don't have any roles :(</p>
            }
            else {
                roles = this.state.project.roles.map(roles =>
                    <Button variant='primary' id={"block"} key={roles.name}>
                        <h5 style={{ width: '80%', textAlign: 'center' }}>Name: {roles.name}</h5>
                    </Button>
                );
            }
        }

        return (
            <div>
                <table id='rolePopup' class='popup' style={{ opacity: 0 + '%', visibility: 'hidden' }}>
                    <tr>
                        <p class='closeButton' onClick={() => this.closePopup('rolePopup')}>
                            x
                        </p>
                    </tr>
                    <tr class='center'>
                        <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                            <b>Create New Role</b>
                        </p>
                    </tr>
                    <tr class='center' style={{ marginTop: 15 + 'px' }}>
                        <input
                            class='projectInputField'
                            placeholder='Role Name *'
                            form='project_creation_form'
                            onChange={(e) => this.setState({ roleName: e.target.value })}
                        />
                    </tr>
                    <tr class='center'>
                        <Button
                            variant='primary'
                            style={{
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: 20 + 'px',
                            }}
                            onClick={() => this.createRole()}
                            disabled={this.state.roleName.length < 1}>
                            Create Role
                        </Button>
                    </tr>
                </table>
                {display}
                <Button
                    variant='danger'
                    style={{
                        margin: 2 + '% ' + 2 + '% ' +2 + '% ' + 2 + '%',
                    }}
                    onClick={this.deleteConfirmation}
                    >
                    Delete Project
                </Button>

                <table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%' }}>
                    <tr>
                        <h2 style={{ marginLeft: 30 + 'px', display: 'inline-block' }}>
                            <b>My Roles&nbsp;&nbsp;</b>
                        </h2>
                        <label class='invisibleButton' onClick={() => this.rolePopup()} style={{ fontSize: 40 + 'px' }}>
                            <b>+</b>
                        </label>
                    </tr>
                </table>
                {roles}

                <table id='editProjectPopup' class='popup' style={{opacity: 0 + '%', visibility: 'hidden'}}>
                    <tr>
                        <p class='closeButton' onClick={() => this.closePopup('editProjectPopup')}>
                            x
                        </p>
                    </tr>
                    <tr class='center'>
                        <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                            <b>Edit Project {this.state.field}</b>
                        </p>
                    </tr>
                    {this.state.field == 'Description' ? 
                        <tr class='center'>
                            <textarea value={this.state.newValue} cols='41' rows='4' onChange={(e)=>this.editField(e)} style={{marginTop: 40 + 'px'}}></textarea>
                        </tr>
                        :
                        <tr class='center'>
                            <input value={this.state.newValue} onChange={(e)=>this.editField(e)} style={{marginTop: 50 + 'px'}}></input>
                        </tr>
                    }
                    <tr class='center'>
                        <td style={{display: 'inline-block', marginLeft: 10 + 'px', marginRight: 20 + 'px'}}>
                            <Button
                                variant='primary'
                                style={{
                                    textAlign: 'center',
                                    marginTop: 20 + 'px',
                                    marginBottom: 20 + 'px',
                                }}
                                onClick={this.updateProject}
                                disabled={this.state.disableSave}
                                >
                                Save
                            </Button>
                        </td>
                        <td style={{display: 'inline-block', marginLeft: 20 + 'px', marginRight: 10 + 'px'}}> 
                            <Button
                                variant='danger'
                                style={{
                                    textAlign: 'center',
                                    marginTop: 20 + 'px',
                                    marginBottom: 20 + 'px',
                                }}
                                onClick={()=> this.closePopup('editProjectPopup')}>
                                Cancel
                            </Button>
                        </td>
                    </tr>
                </table>

                <table id='deleteProjectPopup' class='popup' style={{opacity: 0 + '%', visibility: 'hidden'}}>
                    <tr>
                        <p class='closeButton' onClick={() => this.closePopup('deleteProjectPopup')}>
                            x
                        </p>
                    </tr>
                    <tr class='center'>
                        <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                            <b>Delete Project Confirmation</b>
                        </p>
                    </tr>
                    <tr class='center' style={{ marginTop: 15 + 'px', padding: 25 + 'px' }}>
                        <label>Are you sure you want to delete <b>{this.state.projectName}</b>? This operation cannot be undone.</label>
                    </tr>
                    <tr class='center'>
                        <td style={{display: 'inline-block', marginLeft: 10 + 'px', marginRight: 20 + 'px'}}>
                            <Button
                                variant='danger'
                                style={{
                                    textAlign: 'center',
                                    marginTop: 20 + 'px',
                                    marginBottom: 20 + 'px',
                                }}
                                onClick={this.deleteProject}
                                >
                                Delete
                            </Button>
                        </td>
                        <td style={{display: 'inline-block', marginLeft: 20 + 'px', marginRight: 10 + 'px'}}> 
                            <Button
                                variant='primary'
                                style={{
                                    textAlign: 'center',
                                    marginTop: 20 + 'px',
                                    marginBottom: 20 + 'px',
                                }}
                                onClick={()=> this.closePopup('deleteProjectPopup')}>
                                Cancel
                            </Button>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}



export default withRouter(ProjectDetail);