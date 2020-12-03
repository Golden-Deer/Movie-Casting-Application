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
        var options = null;
        if (this.props.field == 'Age') {
            options = [
                <option selected disabled>Choose here</option>,
                <option value='unspecified'>Unspecified</option>,
                <option value="18">18-25</option>,
                <option value="26">26-35</option>,
                <option value="36">36-45</option>,
                <option value="46">46-60</option>,
                <option value="61">61-80</option>]
        }
        if (this.props.field == 'Gender') {
            options = [
                <option selected disabled>Choose here</option>,
                <option value='unspecified'>Unspecified</option>,
                <option value="femle">Female</option>,
                <option value="male">Male</option>
            ]
        }
        if (this.props.field == 'Height') {
            options = [
                <option selected disabled>Choose here</option>,
                <option value='unspecified'>Unspecified</option>,
                <option value="140">140cm-149cm</option>,
                <option value="150">150cm-159cm</option>,
                <option value="160">160cm-169cm</option>,
                <option value="170">170cm-179cm</option>,
                <option value="180">180cm-189cm</option>,
                <option value="190">190cm-199cm</option>,
                <option value="200">200cm and above</option>]
        }
        if (this.props.field == 'Weight') {
            options = [
                <option selected disabled>Choose here</option>,
                <option value='unspecified'>Unspecified</option>,
                <option value="40">40kg-49kg</option>,
                <option value="50">50kg-59kg</option>,
                <option value="60">60kg-69kg</option>,
                <option value="70">70kg-79kg</option>,
                <option value="80">80kg-89kg</option>,
                <option value="90">90kg-99kg</option>,
                <option value="100">100kg and above</option>
            ]
        }

        return(
            <table id='editRoleTag' class='popup' style={{opacity: 0 + '%', visibility: 'hidden'}}>
                <tr>
                    <p class='closeButton' onClick={() => this.props.closePopup('editRoleTag')}>
                        x
                    </p>
                </tr>
                <tr class='center'>
                    <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                        <b>Update {this.props.field}</b>
                    </p>
                </tr>
                <tr class='center'>
                    <select value={this.props.newValue} style={{marginTop: 40 + 'px'}} onChange={(e)=>
                        this.editField(e, this.props.field, this.props.originalValue)}>
                        {options}
                    </select>
                </tr>
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
                            onClick={()=> this.props.closePopup('editRoleTag')}>
                            Cancel
                        </Button>
                    </td>
                </tr>
            </table>
        )
    }}

export default EditRole;