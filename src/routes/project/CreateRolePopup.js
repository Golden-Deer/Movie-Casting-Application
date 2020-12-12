import { React, Component } from 'react';
import Button from 'react-bootstrap/Button';
import Role from '../../controller/Role'

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
        var data = {
            name: this.props.roleName,
            description: this.props.roleDescription,
            age: this.props.roleAge,
            gender: this.props.roleGender,
            height: this.props.roleHeight,
            weight: this.props.roleWeight
        };
        console.log(data);
        var updateProject = this.props.project;
        if (updateProject.roles == null) {
            updateProject.roles = [];
        }
        Role.create(this.props.project.key, data).then((roleKey) => this.props.setProject(updateProject.roles.push(roleKey))).then(() => window.location.reload())
        // reset states
        this.props.setRoleName('');
        this.props.setRoleDescription('');
        this.props.setRoleAge('unspecified');
        this.props.setRoleGender('unspecified');
        this.props.setRoleHeight('unspecified');
        this.props.setRoleWeight('unspecified');
        this.props.closePopup('rolePopup')
    }

    render() {
        return (
            <table id='rolePopup' class='largePopup' style={{ opacity: 0 + '%', visibility: 'hidden' }}>
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
                <tr class='center' style={{ marginTop: 30 + 'px' }}>
                    <input
                        class='projectInputField'
                        placeholder='Role Name *'
                        form='project_creation_form'
                        value={this.props.roleName}
                        onChange={(e) => this.props.setRoleName(e.target.value)}
                    />
                </tr>
                <tr class='center' style={{ marginTop: 15 + 'px' }}>
                    <textarea
                        class='projectInputField'
                        placeholder='Description'
                        form='project_creation_form'
                        value={this.props.roleDescription}
                        onChange={(e) => this.props.setRoleDescription(e.target.value)}
                    />
                </tr>
                <tr class='center' style={{ marginTop: 15 + 'px' }}>
                    <td><label for="age-select">Age Group:</label></td>
                    <td><select style={{ width: 100 + 'px' }} id='age-select' class='projectInputField'
                        form='project_creation_form'
                        onChange={(e) => this.props.setRoleAge(e.target.value)}>
                        <option selected disabled>Choose here</option>,
                        <option value='0-10'>Under 10</option>,
                        <option value='10-17'>10-17</option>,
                        <option value="18-25">18-25</option>,
                        <option value="26-35">26-35</option>,
                        <option value="36-45">36-45</option>,
                        <option value="46-60">46-60</option>,
                        <option value="61-80">61-80</option>,
                        <option value=">80">Over 80</option>,
                        <option value="unspecified">Unspecified</option>
                    </select></td>
                    <td><label for="gender-select">Gender:</label></td>
                    <td><select style={{ width: 100 + 'px' }} id='gender-select' class='projectInputField'
                        form='project_creation_form'
                        onChange={(e) => this.props.setRoleGender(e.target.value)}>
                        <option selected disabled>Choose here</option>,
                        <option value="female">Female</option>,
                        <option value="male">Male</option>,
                        <option value="unspecified">Unspecified</option>
                    </select></td>
                </tr>
                <tr class='center' style={{ marginTop: 15 + 'px' }}>
                    <td><label for="height-select">Height Group (cm):</label></td>
                    <td><select style={{ width: 180 + 'px' }} id='height-select' class='projectInputField'
                        form='project_creation_form'
                        onChange={(e) => this.props.setRoleHeight(e.target.value)}>
                        <option selected disabled>Choose here</option>,
                        <option value="0-140">Below 140cm</option>,
                        <option value="140-149">140cm-149cm</option>,
                        <option value="150-159">150cm-159cm</option>,
                        <option value="160-169">160cm-169cm</option>,
                        <option value="170-179">170cm-179cm</option>,
                        <option value="180-189">180cm-189cm</option>,
                        <option value="190-199">190cm-199cm</option>,
                        <option value=">199">Over 199cm</option>,
                        <option value="unspecified">Unspecified</option>
                    </select></td>
                </tr>
                <tr class='center' style={{ marginTop: 15 + 'px' }}>
                    <td><label for="weight-select">Weight Group (kg):</label></td>
                    <td><select style={{ width: 180 + 'px' }} id='weight-select' class='projectInputField'
                        form='project_creation_form'
                        onChange={(e) => this.props.setRoleWeight(e.target.value)}>
                        <option selected disabled>Choose here</option>,
                        <option value="<40">Below 40kg</option>,
                        <option value="40-49">40kg-49kg</option>,
                        <option value="50-59">50kg-59kg</option>,
                        <option value="60-69">60kg-69kg</option>,
                        <option value="70-79">70kg-79kg</option>,
                        <option value="80-89">80kg-89kg</option>,
                        <option value="90-99">90kg-99kg</option>,
                        <option value=">99">Over 100kg</option>,
                        <option value="unspecified">Unspecified</option>
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