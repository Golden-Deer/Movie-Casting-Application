import firebase from 'firebase';
import {React, Component} from 'react';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Display all of the user's projects
class ProjectList extends Component{
    constructor(props){
        super(props);

        this.state = {
            test: [],
            projects: [],
            icons: [],
            projectName: '',
            projectReleaseDate: '',
            projectGenre: '',
            projectDescription: '',
            projectDirector: '',
            projectProducer: '',
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
                temp.push(<td>
                    <Card className='movieCard' onClick={() => this.props.history.push('/project', [childSnapshot.val(), childSnapshot.key])}>
                        <Card.Body>
                        <Card.Title style={{fontSize: 1.8 + 'rem', marginBottom: 1.0 + 'rem'}}><b>{childSnapshot.val()['name']}</b></Card.Title>
                        <Card.Subtitle style={{fontSize: 0.5 + 'rem', marginBottom: 1.0 + 'rem', userSelect: 'none'}}>──────────────────────────</Card.Subtitle>
                        <Card.Subtitle style={{fontSize: 1.1 + 'rem', marginBottom: 0.6 + 'rem'}}>{childSnapshot.val()['release_date']}</Card.Subtitle>
                        <Card.Subtitle style={{fontSize: 1.1 + 'rem', marginBottom: 0.6 + 'rem'}}>{childSnapshot.val()['genre']}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                    </td>)
                projects.push(childSnapshot.val());
                index+=1;
                if (index % 5 == 0){
                    temp.push(<tr></tr>)
                }
            })
            this.setState({projects: projects, test: temp});
        })
    }

    componentWillUnmount() {
        this.projectRef.off();
        this.mounted = false;
        document.body.removeEventListener('click', this.deleteProject);
    }

    render(){
        var buttons = this.state.test;
        if (buttons.length == 0)
            buttons = <p class='banner'>You don't have any projects :(</p>
        else
            buttons = <table>{buttons}</table>
            
        return(
            <>
            {buttons}
            </>
        )
    }
}

export default withRouter(ProjectList);