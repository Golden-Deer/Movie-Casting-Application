import firebase from 'firebase';
import React, {useState, useEffect, Component} from 'react';

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
        }

    firebase.database().ref('USER/' + firebase.auth().currentUser.uid).child('projects').on('value', dataSnapshot => {
        var projects = [];
        var icons = [];
        var index = 0;
        dataSnapshot.forEach(childSnapshot => {
            icons.push(<tr><button onClick={this.viewProject.bind(this, index)}>{childSnapshot.val()['name']}</button></tr>);
            projects.push(childSnapshot.val());
            index+=1;
        })
        this.setState({projects: projects, icons: icons})
    })
    }

    viewProject(index) {
        console.log(index);
        this.setState({projectName: this.state.projects[index]['name']})
        this.setState({projectReleaseDate: this.state.projects[index]['release_date']})
        this.setState({projectGenre: this.state.projects[index]['genre']})
        this.setState({projectDescription: this.state.projects[index]['producer']})
        this.setState({projectDirector: this.state.projects[index]['director']})
        document.getElementById('editProjectPopup').style = ''; // show project popup
    }
    
    closePopup(type) {
        document.getElementById(type).style = 'display: none';
    }

    render(){
        var buttons = this.state.icons;
        return(
            <>
            <table>
            {buttons}
            </table>
            <table id='editProjectPopup' class='largePopup' style={{ display: 'none' }}>
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
                    <label class='center' style={{ fontSize: 12 + 'px' }}>
                        Fields with an asterisk are mandatory
                    </label>
                </tr>
                {/* <tr class='center'>
                    <button
                        class='btn btn-primary'
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 20 + 'px',
                        }}
                        // onClick={createProject}
                        disabled={this.state.projectName.length < 1 || this.state.projectReleaseDate.length != 4}>
                        Save
                    </button>
                </tr> */}
            </table>
            </>
        )
    }
}
// const ProjectList = () => {
//     const [projects, setProjects] = useState([]);
//     const buttons = React.createContext();

//     useEffect(() => {    
         
//     });

//     firebase.database().ref('USER/' + firebase.auth().currentUser.uid).child('projects').on('value', dataSnapshot => {
//         dataSnapshot.forEach(childSnapshot => {
//             console.log(childSnapshot.val()['name']);
//             buttons.push(<tr><button onClick={viewProject}>{childSnapshot.val()['name']}</button></tr>);
//         })
//     })
    
//     function viewProject(){
//         console.log("test")
//     }

//     return(
        
//         <table>
        
//         {buttons}
//         </table>
//     )
// }



export default ProjectList