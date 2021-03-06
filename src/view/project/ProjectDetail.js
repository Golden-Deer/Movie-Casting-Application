import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import CreateRolePopup from './CreateRolePopup';
import EditProjectPopup from './EditProjectPopup';
import DeleteProjectPopup from './DeleteProjectPopup';
import Button from 'react-bootstrap/Button';
import {Card, CardDeck} from 'react-bootstrap';
import Project from '../../controller/Project';
import Role from '../../controller/Role'


class ProjectDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: this.props.project,
            projectKey: this.props.project.key,
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
        };

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
        var temp = [];
        Role.getAll(this.state.projectKey).then((datas) => {
            datas.forEach(data => data.then(role => {
                console.log(role)
                temp.push(<Card
                    className='roleCard'
                    onClick={() =>
                        this.props.history.push('/rolepage', [role, this.state.project])
                    }>
                    <Card.Body>
                        <Card.Title>
                            <b>{role.name}</b>
                        </Card.Title>
                        <Card.Subtitle
                            style={{
                                fontSize: 0.5 + 'rem',
                                marginBottom: 1.0 + 'rem',
                                userSelect: 'none',
                            }}>
                            ──────────────────────────
                        </Card.Subtitle>
                        <Card.Subtitle>
                            {role.description}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>);
                this.setState({roles: temp});
            }).catch((error) => console.log(error)))
        });
    }

    editProject(field) {
        document.getElementById('editProjectPopup').style.visibility = 'visible';
        document.getElementById('editProjectPopup').style.opacity = 100 + '%';
        this.setState({
            field: field,
            originalValue: this.state.project[field.toLowerCase().replace(' ', '_')],
            newValue: this.state.project[field.toLowerCase().replace(' ', '_')],
            disableSave: true,
        });
    }

    updateProject() {
        let updates = {};
        updates[
            this.state.field.toLowerCase().replace(' ', '_')
            ] = this.state.newValue;
        var data = this.state.project;
        data[this.state.field.toLocaleLowerCase().replace(' ', '_')] = this.state.newValue
        console.log(data)
        Project.update(this.state.projectKey, data);
        this.setState({project: data});
        if (this.state.field == 'Name')
            this.props.resetProjectName(this.state.newValue);
        this.closePopup('editProjectPopup');
    }

    deleteConfirmation() {
        document.getElementById('deleteProjectPopup').style.visibility = 'visible';
        document.getElementById('deleteProjectPopup').style.opacity = 100 + '%';
    }

    deleteProject() {
        Project.delete(this.state.projectKey)
        this.closePopup('deleteProjectPopup');
        this.closePopup('editProjectPopup');
        this.props.history.push('/');
    }

    rolePopup() {
        if (document.getElementById('rolePopup') != null) {
            document.getElementById('rolePopup').style.opacity = 100 + '%'; // show project popup
            document.getElementById('rolePopup').style.visibility = 'visible'; // show project popup
        }
    }

    editRolePopup(e) {
        if (document.getElementById('editRolePopup') != null) {
            document.getElementById('editRolePopup').style.opacity = 100 + '%'; // show project popup
            document.getElementById('editRolePopup').style.visibility = 'visible'; // show project popup\
            this.setState({
                roleKey: e,
                roleName: this.state.project['roles'][e]['name'],
                newRoleName: this.state.project['roles'][e]['name'],
                roleDescription: this.state.project['roles'][e]['description'],
                newRoleDescription: this.state.project['roles'][e]['description'],
            });
        }
    }

    closePopup(type) {
        if (document.getElementById(type) != null) {
            document.getElementById(type).style.opacity = 0 + '%';
            document.getElementById(type).style.visibility = 'hidden';
        }
    }

    setNewValue(e, bool) {
        this.setState({newValue: e.target.value, disableSave: bool});
    }

    setRoleName(e) {
        this.setState({roleName: e});
    }

    setRoleAge(e) {
        this.setState({roleAge: e});
    }

    setRoleGender(e) {
        this.setState({roleGender: e});
    }

    setRoleHeight(e) {
        this.setState({roleHeight: e});
    }

    // setNew... functions are not being used
    setRoleWeight(e) {
        this.setState({roleWeight: e});
    }

    setNewRoleName(e) {
        this.setState({newRoleName: e});
    }

    setRoleDescription(e) {
        this.setState({roleDescription: e});
    }

    setNewRoleDescription(e) {
        this.setState({newRoleDescription: e});
    }

    setRoleImage(e) {
        this.setState({});
    }

    setProject(e) {
        this.setState({project: e});
    }

    render() {
        var display = null;
        var roles = null;
        if (this.state.project != null) {
            display = (
                <div>
                    <div>
                        <h2 style={{display: 'inline-block'}}>
                            <b>Project Detail</b>
                        </h2>

                        <Button
                            variant='danger'
                            style={{
                                float: 'right',
                            }}
                            onClick={this.deleteConfirmation}>
                            Delete Project
                        </Button>
                    </div>
                    <br/>
                    <Card>
                        <Card.Header style={{fontSize: 22 + 'px'}}>
                            <b>Project Name</b>
                            <Button
                                variant='outline-info'
                                style={{float: 'right'}}
                                onClick={() => this.editProject('Name')}>
                                <span class='glyphicon glyphicon-pencil'></span>
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{this.state.project.name}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card>
                        <Card.Header style={{fontSize: 22 + 'px'}}>
                            <b>Release Date</b>
                            <Button
                                variant='outline-info'
                                style={{float: 'right'}}
                                onClick={() => this.editProject('Release Date')}>
                                <span class='glyphicon glyphicon-pencil'></span>
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{this.state.project.release_date}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card>
                        <Card.Header style={{fontSize: 22 + 'px'}}>
                            <b>Genre</b>
                            <Button
                                variant='outline-info'
                                style={{float: 'right'}}
                                onClick={() => this.editProject('Genre')}>
                                <span class='glyphicon glyphicon-pencil'></span>
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{this.state.project.genre}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card>
                        <Card.Header style={{fontSize: 22 + 'px'}}>
                            <b>Description</b>
                            <Button
                                variant='outline-info'
                                style={{float: 'right'}}
                                onClick={() => this.editProject('Description')}>
                                <span class='glyphicon glyphicon-pencil'></span>
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{this.state.project.description}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card>
                        <Card.Header style={{fontSize: 22 + 'px'}}>
                            <b>Director</b>
                            <Button
                                variant='outline-info'
                                style={{float: 'right'}}
                                onClick={() => this.editProject('Director')}>
                                <span class='glyphicon glyphicon-pencil'></span>
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{this.state.project.director}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card>
                        <Card.Header style={{fontSize: 22 + 'px'}}>
                            <b>Producer</b>
                            <Button
                                variant='outline-info'
                                style={{float: 'right'}}
                                onClick={() => this.editProject('Producer')}>
                                <span class='glyphicon glyphicon-pencil'></span>
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{this.state.project.producer}</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            );

            if (this.state.roles.length == 0) {
                roles = (
                    <table
                        id='roleDisplay'
                        style={{marginTop: 50 + 'px', width: 100 + '%'}}>
                        <tr>
                            <h2 style={{marginLeft: 30 + 'px', display: 'inline-block'}}>
                                <b>My Roles&nbsp;&nbsp;</b>
                            </h2>
                            <label
                                class='invisibleButton'
                                onClick={() => this.rolePopup()}
                                style={{fontSize: 40 + 'px'}}>
                                <b>+</b>
                            </label>
                        </tr>
                        <tr class='banner'>You don't have any roles :(</tr>
                    </table>
                );
            } else {
                roles = (
                    <table
                        id='roleDisplay'
                        style={{marginTop: 50 + 'px', width: 100 + '%'}}>
                        <tr>
                            <h2 style={{display: 'inline-block'}}>
                                <b>My Roles&nbsp;&nbsp;</b>
                            </h2>
                            <label
                                class='invisibleButton'
                                onClick={() => this.rolePopup()}
                                style={{fontSize: 40 + 'px'}}>
                                <b>+</b>
                            </label>
                        </tr>
                        <CardDeck>{this.state.roles}</CardDeck>
                    </table>
                );
            }
        }

        return (
            <div class='movieDetail App Fade'>
                <CreateRolePopup
                    roleName={this.state.roleName}
                    roleDescription={this.state.roleDescription}
                    roleWeight={this.state.roleWeight}
                    roleAge={this.state.roleAge}
                    roleGender={this.state.roleGender}
                    roleHeight={this.state.roleHeight}
                    project={this.state.project}
                    projectRef={this.projectRef}
                    projectKey={this.state.projectKey}
                    setRoleName={this.setRoleName}
                    setRoleAge={this.setRoleAge}
                    setRoleGender={this.setRoleGender}
                    setRoleHeight={this.setRoleHeight}
                    setRoleWeight={this.setRoleWeight}
                    setRoleDescription={this.setRoleDescription}
                    setRoleImage={this.roleImage}
                    setProject={this.setProject}
                    closePopup={this.closePopup}
                />
                {display}
                {roles}
                <br/>

                <EditProjectPopup
                    field={this.state.field}
                    originalValue={this.state.originalValue}
                    newValue={this.state.newValue}
                    setNewValue={this.setNewValue}
                    disableSave={this.state.disableSave}
                    updateProject={this.updateProject}
                    closePopup={this.closePopup}
                />
                <DeleteProjectPopup
                    deleteProject={this.deleteProject}
                    projectName={this.props.projectName}
                    closePopup={this.closePopup}
                />
            </div>
        );
    }
}

export default withRouter(ProjectDetail);
