// This file not being used

import React, { Component } from 'react';
import db from '../../base';
import { withRouter } from "react-router-dom";

class RoleList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null
        };

        this.user = db.auth().currentUser;

        this.projectRef = db.database().ref('USER').child(this.user.uid).child('projects');
    }

    componentDidMount() {
        this.projectRef.orderByChild('name').limitToFirst(1).on('value', dataSnapshot => {
            this.setState({ project: dataSnapshot.val()[1] });
        });
        if (this.state.project != null) {
            alert(this.state.project.name);}

    }

    componentWillUnmount() {
        this.projectRef.off();
    }

    render() {
        var display = null;
        if (this.state.project != null) {
            display = <div>
                <div className='project-attributes'>Project Name: {this.state.project.name}</div>
                <div className='project-attributes'>Description: {this.state.project.description}</div>
                <div className='project-attributes'>Role</div>
            </div>;
        }
        else{
            console.log("HERE")
        }

        return (
            <div>{display}</div>
        );
    }
}



export default withRouter(RoleList);