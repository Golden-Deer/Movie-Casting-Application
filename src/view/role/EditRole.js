import {React, Component} from 'react';
import Button from 'react-bootstrap/Button';

class EditRole extends Component{
    constructor(props){
        super(props);

        this.editField = this.editField.bind(this);
    }

    editField(e, field, original) {
            if (original == e.target.value )
                this.props.setNewValue(e, true)
            else
                this.props.setNewValue(e, false)
    }

    render(){
        return(
            <table id='editRole' class='popup' style={{opacity: 0 + '%', visibility: 'hidden'}}>
                <tr>
                    <p class='closeButton' onClick={() => this.props.closePopup('editRole')}>
                        x
                    </p>
                </tr>
                <tr class='center'>
                    <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                        <b>Edit Role {this.props.field}</b>
                    </p>
                </tr>
                {this.props.field == 'Description' ?
                    <tr class='center'>
                        <textarea value={this.props.newValue} cols='41' rows='4' onChange={(e) =>
                            this.editField(e, this.props.field, this.props.originalValue)} style={{marginTop: 40 + 'px'}}></textarea>
                    </tr>
                    :
                    <tr class='center'>
                        <input value={this.props.newValue} onChange={(e)=>
                            this.editField(e, this.props.field, this.props.originalValue)} style={{marginTop: 50 + 'px'}}></input>
                    </tr>
                }
                <tr class='center'>
                    <td style={{display: 'inline-block', marginLeft: 10 + 'px', marginRight: 20 + 'px'}}>
                        <Button
                            variant='primary'
                            style={{
                                textAlign: 'center',
                                marginTop: 20 + 'px',
                                marginBottom: 20 + 'px',
                            }}
                            onClick={this.props.updateRole}
                            disabled={this.props.disableSave}
                        >
                            Save
                        </Button>
                    </td>
                    <td style={{display: 'inline-block', marginLeft: 20 + 'px', marginRight: 10 + 'px'}}>
                        <Button
                            variant='danger'
                            style={{
                                textAlign: 'center',
                                marginTop: 20 + 'px',
                                marginBottom: 20 + 'px',
                            }}
                            onClick={()=> this.props.closePopup('editRole')}>
                            Cancel
                        </Button>
                    </td>
                </tr>
            </table>
        )
    }}

export default EditRole;