import React, {Component } from 'react';
import db from '../../base';
import firebase from 'firebase';
import { withRouter } from "react-router-dom";
import RoleList from './RoleList';
import { Redirect } from "react-router-dom";


class ProjectDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null,
            roleName: ''
        };

        var user = firebase.auth().currentUser;
        if (user != null)
            this.projectRef = db.database().ref('USER').child(user.uid).child('projects');
        // console.log(user);
        // 

        


        
    }
    
    

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user == null) {
                <Redirect to='/'/>
            }
            else{
                console.log("NOPE")
                console.log(user)
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
                <div className='project-attributes'>Project Name: {this.state.project.name}</div>
                <div className='project-attributes'>Description: {this.state.project.description}</div>
            </div>;

            if (this.state.project.roles == null) {
                roles = <p class='banner'>You don't have any roles :(</p>
            }
            else {
                roles = this.state.project.roles.map(roles =>
                    <button id={"block"} key={roles.name}>
                        <h5 style={{ width: '80%', textAlign: 'center' }}>Name: {roles.name}</h5>
                    </button>
                );
            }
        }

        return (
            <div>
                <table id='rolePopup' class='largePopup' style={{ opacity: 0 + '%', visibility: 'hidden' }}>
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
                        <button
                            class='btn btn-primary'
                            style={{
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: 20 + 'px',
                            }}
                            onClick={() => this.createRole()}
                            disabled={this.state.roleName.length < 1}>
                            Create Role
                    </button>
                    </tr>
                </table>
                {display}
                <table id='roleDisplay' style={{ width: 100 + '%' }}>
                    <tr>
                        <h2 style={{ marginLeft: 30 + 'px', display: 'inline-block' }}>
                            <b>My Roles&nbsp;&nbsp;</b>
                        </h2>
                        <button class='invisibleButton' onClick={() => this.rolePopup()} style={{ fontSize: 40 + 'px' }}>
                            <b>+</b>
                        </button>
                    </tr>
                </table>
                {roles}
            </div>
        );
    }
}



export default withRouter(ProjectDetail);