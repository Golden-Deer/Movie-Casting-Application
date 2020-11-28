import firebase from 'firebase';
import {React, Component} from 'react';
import { withRouter } from "react-router-dom";

// Display all of the user's projects
class ProjectList extends Component{
    constructor(props){
        super(props);

        this.state = {
            projects: [],
            icons: [],
            projectName: '',
            projectReleaseDate: '',
            projectGenre: '',
            projectDescription: '',
            projectDirector: '',
            projectProducer: '',
            selection: '',
        }

        this.projectRef = firebase.database().ref('USER/' + firebase.auth().currentUser.uid);
        this.mounted = false;
    }
    viewProject(index) {
        this.setState({projectName: this.state.projects[index]['name']})
        this.setState({projectReleaseDate: this.state.projects[index]['release_date']})
        this.setState({projectGenre: this.state.projects[index]['genre']})
        this.setState({projectDescription: this.state.projects[index]['description']})
        this.setState({projectProducer: this.state.projects[index]['producer']})
        this.setState({projectDirector: this.state.projects[index]['director']})
        this.setState({selection: index});    
        document.getElementById('editProjectPopup').style.opacity = 100 + '%';
        document.getElementById('editProjectPopup').style.visibility = 'visible'; // show project popup
        
    }
    
    closePopup(type) { 
        document.getElementById(type).style.opacity = 0 + '%';
        document.getElementById(type).style.visibility = 'hidden';
    }

    componentDidMount(){
        this.mounted = true;
        this.projectRef.child('projects').on('value', dataSnapshot => {
            var projects = [];
            var index = 0;
            var temp = [];
            dataSnapshot.forEach(childSnapshot => {
                temp.push(<td><button class='movieButton' onClick={ () => 
                    this.props.history.push('/project', [childSnapshot.val(), childSnapshot.key])
                }><b>{childSnapshot.val()['name']}</b></button></td>)
                projects.push(childSnapshot.val());
                index+=1;
                if (index % 5 == 0){
                    temp.push(<tr></tr>)
                }
            })
            if (this.mounted) {
                this.setState({projects: projects, icons: temp});
            }
        })
    }

    componentWillUnmount() {
        this.projectRef.off();
        this.mounted = false;
        document.body.removeEventListener('click', this.deleteProject);
    }

    render(){
        var buttons = this.state.icons;
        if (buttons.length == 0)
            buttons = <p class='banner'>You don't have any projects :(</p>
        else
            buttons = <table>{buttons}</table>
            
        return(
            <>
            {buttons}
            <table id='editProjectPopup' class='largePopup' style={{opacity: 0 + '%', visibility: 'hidden'}}>
                <tr>
                    <p class='closeButton' onClick={() => this.closePopup('editProjectPopup')}>
                        x
                    </p>
                </tr>
                <tr class='center'>
                    <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                        <b>Edit Project</b>
                    </p>
                </tr>
                <div class='scrollable'>
                    <tr class='center' style={{ marginTop: 15 + 'px' }}>
                        <input
                            class='projectInputField'
                            value={this.state.projectName}
                            placeholder='Project Name *'
                            form='project_creation_form'
                            onChange={(e) => this.setState({projectName: e.target.value})}
                        />
                    </tr>
                    <tr class='center' style={{ marginTop: 15 + 'px' }}>
                        <input
                            class='projectInputField'
                            value={this.state.projectReleaseDate}
                            placeholder='Projected Release Year *'
                            form='project_creation_form'
                            onChange={(e) => this.setState({projectReleaseDate: e.target.value})}
                        />
                    </tr>
                    <tr class='center' style={{ marginTop: 15 + 'px' }}>
                        <input
                            class='projectInputField'
                            value={this.state.projectGenre}
                            placeholder='Genre(s)'
                            form='project_creation_form'
                            onChange={(e) => this.setState({projectGenre: e.target.value})}
                        />
                    </tr>
                    <tr class='center' style={{ marginTop: 15 + 'px' }}>
                        <textarea
                            class='center'
                            cols='41'
                            rows='3'
                            value={this.state.projectDescription}
                            placeholder='Brief Description'
                            form='project_creation_form'
                            onChange={(e) => this.setState({projectDescription: e.target.value})}
                        />
                    </tr>
                    <tr class='center' style={{ marginTop: 15 + 'px' }}>
                        <input
                            class='projectInputField'
                            name='director'
                            value={this.state.projectDirector}
                            placeholder='Director(s)'
                            form='project_creation_form'
                            onChange={(e) => this.setState({projectDirector: e.target.value})}
                        />
                    </tr>
                    <tr class='center' style={{ marginTop: 15 + 'px' }}>
                        <input
                            class='projectInputField'
                            name='producer'
                            value={this.state.projectProducer}
                            placeholder='Producer(s)'
                            form='project_creation_form'
                            onChange={(e) => this.setState({projectProducer: e.target.value})}
                        />
                    </tr>
                    <tr class='center'>
                    </tr>
                </div>
                <tr class='center'>
                    <label class='center' style={{ fontSize: 12 + 'px' }}>
                        Fields with an asterisk are mandatory
                    </label>
                </tr>
                <tr class='center'>
                    <td style={{display: 'inline-block', marginLeft: 10 + 'px', marginRight: 20 + 'px'}}>
                        <button
                            class='btn btn-primary'
                            style={{
                                textAlign: 'center',
                                marginTop: 20 + 'px',
                                marginBottom: 20 + 'px',
                            }}
                            // onClick={createProject}
                            disabled={this.state.projectName.length < 1 || this.state.projectReleaseDate.length != 4}>
                            Save Changes
                        </button>
                    </td>
                </tr>
            </table>
            </>
        )
    }
}

export default withRouter(ProjectList);