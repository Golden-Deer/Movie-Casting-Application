import { React, Component } from 'react';
import Button from 'react-bootstrap/Button';
import ImageUploader from 'react-images-upload'

class CreateRolePopup extends Component {
    constructor(props) {
        super(props)

        this.createRole = this.createRole.bind(this);

        this.state = {
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    createRole() {
        // add this role to the project list of this user
        if (this.props.project != null) {
            var updateProject = this.props.project;
            if (updateProject.roles == null) {
                updateProject.roles = [];
            }
            this.props.setProject(updateProject.roles.push({ name: this.props.roleName, 
                description: this.props.roleDescription,
                roleAge: this.props.roleAge,
                roleGender: this.props.roleGender,
                roleHeight: this.props.roleHeight,
                roleWeight: this.props.roleWeight }));
            this.props.projectRef.child(this.props.projectKey).set(this.props.project);
            // reset states
            this.props.setRoleName('');
            this.props.setRoleDescription('');
            this.props.setRoleAge('unspecified');
            this.props.setRoleGender('unspecified');
            this.props.setRoleHeight('unspecified');
            this.props.setRoleWeight('unspecified');
            this.props.closePopup('rolePopup')
        }
    }

    render() {
        return (

            <table id='rolePopup' class='popup' style={{ opacity: 0 + '%', visibility: 'hidden' }}>
                <tr>
                    <p class='closeButton' onClick={() => this.props.closePopup('rolePopup')}>
                        x
                        </p>
                </tr>
                <tr class='center'>
                    <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                        <b>Create New Role</b>
                        <div>
                            <input type="file" onChange={this.handleChange} />
                            <img className="photo" src={this.state.file} />
                        </div>
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
                    <textarea
                        class='projectInputField'
                        placeholder='Description'
                        form='project_creation_form'
                        onChange={(e) => this.props.setRoleDescription(e.target.value)}
                    />
                </tr>
                <tr class='center' style={{ marginTop: 15 + 'px' }}>
                    <td><label for="age-select">Age Group:</label></td>
                    <td><select style={{ width: 100 + 'px' }} id='age-select' class='projectInputField' 
                        form='project_creation_form'
                        onChange={(e) => this.props.setRoleAge(e.target.value)}>
                        <option value='unspecified'>Unspecified</option>
                        <option value="18">18-25</option>
                        <option value="26">26-35</option>
                        <option value="36">36-45</option>
                        <option value="46">46-60</option>
                        <option value="61">61-80</option>
                    </select></td>
                    <td><label for="gender-select">Gender:</label></td>
                    <td><select style={{ width: 100 + 'px' }} id='gender-select' class='projectInputField'
                        form='project_creation_form'
                        onChange={(e) => this.props.setRoleGender(e.target.value)}>
                        <option value='unspecified'>Unspecified</option>
                        <option value="femle">Female</option>
                        <option value="male">Male</option>
                    </select></td>
                </tr>
                <tr class='center' style={{ marginTop: 15 + 'px' }}>
                    <td><label for="height-select">Height Group (cm):</label></td>
                    <td><select style={{ width: 180 + 'px' }} id='height-select' class='projectInputField'
                        form='project_creation_form'
                        onChange={(e) => this.props.setRoleHeight(e.target.value)}>
                        <option value='unspecified'>Unspecified</option>
                        <option value="140">140-149</option>
                        <option value="150">150-159</option>
                        <option value="160">160-169</option>
                        <option value="170">170-179</option>
                        <option value="180">180-189</option>
                        <option value="190">190-199</option>
                        <option value="200">200+</option>
                    </select></td>
                </tr>
                <tr class='center' style={{ marginTop: 15 + 'px' }}>
                    <td><label for="weight-select">Weight Group (kg):</label></td>
                    <td><select style={{ width: 180 + 'px' }} id='weight-select' class='projectInputField'
                        form='project_creation_form'
                        onChange={(e) => this.props.setRoleWeight(e.target.value)}>
                        <option value='unspecified'>Unspecified</option>
                        <option value="40">40-49</option>
                        <option value="50">50-59</option>
                        <option value="60">60-69</option>
                        <option value="70">70-79</option>
                        <option value="80">80-89</option>
                        <option value="90">90-99</option>
                        <option value="100">100+</option>
                    </select></td>
                </tr>
                <tr class='center'>
                    <label class='center' style={{ fontSize: 12 + 'px' }}>
                        Fields with an asterisk are mandatory
                        </label>
                </tr>
                <tr class='center'>
                    <Button
                        variant='primary'
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 30 + 'px',
                        }}
                        onClick={this.createRole}
                        disabled={this.props.roleName.length < 1}>
                        Create Role
                        </Button>
                </tr>

            </table>
        );
    }
}

export default CreateRolePopup