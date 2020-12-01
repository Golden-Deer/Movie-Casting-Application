import {React, Component} from 'react';
import db from '../../base';
import firebase from 'firebase';
import Button from 'react-bootstrap/Button';

class EditRolePopup extends Component{
    constructor(props){
        super(props)

        this.saveChanges = this.saveChanges.bind(this);
    }

    saveChanges(){
        // save changes to the role
        if (this.props.project != null) {
            var user = firebase.auth().currentUser;
            let ref = db.database().ref('USER/' + user.uid + '/projects/' + this.props.projectKey + '/roles/' + this.props.index);
            let updates = {};
            updates['name'] = this.props.newRoleName;
            updates['description'] = this.props.newRoleDescription;
            ref.update(updates)
            // reset states
            this.props.setNewRoleName('');
            this.props.setNewRoleDescription('');
            this.props.closePopup('editRolePopup')
        }
    }

    render(){
        return(
            <table id='editRolePopup' class='popup' style={{ opacity: 0 + '%', visibility: 'hidden' }}>
                    <tr>
                        <p class='closeButton' onClick={() => this.props.closePopup('editRolePopup')}>
                            x
                        </p>
                    </tr>
                    <tr class='center'>
                        <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                            <b>Edit Role</b>
                        </p>
                    </tr>
                    <tr class='center' style={{ marginTop: 15 + 'px' }}>
                        <input
                            class='projectInputField'
                            placeholder='Role Name *'
                            value={this.props.newRoleName}
                            onChange={(e) => this.props.setNewRoleName(e.target.value)}
                        />
                    </tr>
                    <tr class='center' style={{ marginTop: 15 + 'px' }}>
                        <textarea
                            class='projectInputField'
                            placeholder='Description'
                            value={this.props.newRoleDescription}
                            onChange={(e) => this.props.setNewRoleDescription(e.target.value)}
                        />
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
                            onClick={this.saveChanges}
                            disabled={this.props.roleName == this.props.newRoleName && this.props.roleDescription == this.props.newRoleDescription}
                            >
                            Save
                        </Button>
                    </tr>
                </table>
        )
    }
}

export default EditRolePopup