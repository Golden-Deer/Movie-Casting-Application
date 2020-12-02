import db from "../../base";
import "../../App.js";
import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
import firebase from "firebase";

class RolePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: null,
            tags: null,
            candidates: null,
            roleDescription: '',
            roleImage: ''
        }

        var user = db.auth().currentUser;
        if (user != null) {
            this.roleRef = db.database().ref('USER/' + user.uid + '/projects/' + this.props.projectKey + '/roles/');
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null){
                this.roleRef.orderByChild('name').equalTo(this.props.roleName).on('value', dataSnapshot => {
                    dataSnapshot.forEach(childSnapshot => {
                        this.setState({role: dataSnapshot.val()});
                        this.setState({tags: childSnapshot.val()['tags']});
                        this.setState({candidates: childSnapshot.val()['candidates']});
                    })
                    console.log(this.state.role);

                });
            }
        });
    }

    componentWillUnmount() {
        // this.roleRef.off();
    }


    render() {
    var display = null;
    var candidates = null;
    console.log(this.state.role);
    if (this.state.role != null) {
        console.log(this.state.role.name);
        display = <div>
            <p>
                <p className='project-attribute-title'><b>Role Name</b></p>
                <Button variant='info'  style={{marginLeft: 1 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                <p className='project-attribute-description'>{this.state.role.name}</p>
            </p>
            <p>
                <label className='project-attribute-title'><b>Tags</b></label>
                <Button variant='info'  style={{marginLeft: 1 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                <p className='project-attribute-description'>{this.state.role.tags}</p>
            </p>
            <p>
                <p className='project-attribute-title'><b>Description</b></p>
                <Button variant='info'  style={{marginLeft: 1 + '%'}}><span class='glyphicon glyphicon-pencil'></span></Button>
                <p className='project-attribute-description'>{this.state.role.description}</p>
            </p>
            <Button
                variant='danger'
                style={{
                    fontSize: 1.25 + 'rem',
                    margin: 2 + '% ' + 2 + '% ' +2 + '% ' + 2 + '%',
                }}
            >
                Delete Role
            </Button>
        </div>;

        if (this.state.role.candidates == null) {
            candidates =<table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%' }}>
                <tr>
                    <h2 style={{ marginLeft: 30 + 'px', display: 'inline-block' }}>
                        <b>Casting Candidates&nbsp;&nbsp;</b>
                    </h2>
                    <label class='invisibleButton'  style={{ fontSize: 40 + 'px' }}>
                        <b>+</b>
                    </label>
                </tr>
                <tr class='banner'>You don't have any casting candidates :(</tr>
            </table>
        }
        else {
            var candidate = [];
            for (var i=0; i<this.state.role.candidates.length; i++){
                if (i % 3 == 0){
                    candidate.push(<tr></tr>)
                }
                candidate.push(<td><Card className='roleCard' >
                    <Card.Body>
                        <Card.Title><b>{this.state.role.candidates[i].name}</b></Card.Title>
                        <Card.Subtitle>{this.state.role.candidates[i].description}</Card.Subtitle>
                    </Card.Body>
                </Card>
                </td>);
            }
            candidates =<table id='roleDisplay' style={{marginTop: 50 + 'px', width: 100 + '%' }}>
                <tr>
                    <h2 style={{ marginLeft: 30 + 'px', display: 'inline-block' }}>
                        <b>My Roles&nbsp;&nbsp;</b>
                    </h2>
                    <label class='invisibleButton'  style={{ fontSize: 40 + 'px' }}>
                        <b>+</b>
                    </label>
                </tr>
                {candidate}
            </table>
        }
    }

    return (
        <div>

            {display}
            {candidates}

        </div>
    );
}
}

export default withRouter(RolePage);