import {React, Component} from 'react';
import Button from 'react-bootstrap/Button';

class RolePopup extends Component{
    constructor(props){
        super(props)

        this.createRole = this.createRole.bind(this);
    }

    createRole() {
        // add this project to the project list of this user
        if (this.props.project != null) {
            var updateProject = this.props.project;
            if (updateProject.roles == null) {
                updateProject.roles = [];
            }
            this.props.setProject(updateProject.roles.push({ name: this.props.roleName, description: this.props.roleDescription}))
            this.props.projectRef.child(this.props.projectKey).set(this.props.project);
            // reset states
            this.props.setRoleName('');
            this.props.setRoleDescription('');
            this.props.closePopup('rolePopup')
        }
    }

    render(){
        return(
            <table id='rolePopup' class='popup' style={{ opacity: 0 + '%', visibility: 'hidden' }}>
                    <tr>
                        <p class='closeButton' onClick={() => this.props.closePopup('rolePopup')}>
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
                            onChange={(e) => this.props.setRoleName(e.target.value)}
                        />
                    </tr>
                    <tr class='center' style={{ marginTop: 15 + 'px' }}>
                        <input
                            class='projectInputField'
                            placeholder='Description'
                            form='project_creation_form'
                            onChange={(e) => this.props.setRoleDescription(e.target.value)}
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
                            onClick={this.createRole}
                            disabled={this.props.roleName.length < 1}>
                            Create Role
                        </Button>
                    </tr>
                </table>
        )
    }
}

export default RolePopup